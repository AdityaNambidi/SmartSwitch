import React, {  useEffect, useRef, useState } from 'react'
import './styles/Login.css'
import InputField from './Elements';
import { Link, useNavigate } from 'react-router-dom'


function Login() {

    const emailInp = useRef();
    const pwdInp = useRef();

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const [error, showErr] = useState()

    useEffect(() => {
        checkLoggedIn()
            .then( res => {
                if (res) {
                    navigate("/dashboard")
                }
            })
    })

    function submit() {

        const data = {
            email: emailInp.current.value,
            password: pwdInp.current.value
        }

        fetch("/Login", {
                
            method: "POST",
            
            headers: {
                'Accept': 'application/json',
                'Content-Type':  'application/json',
            },

            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data)
        
        })
            .then(res => res.json())                
            .then( function(res) {

                console.log(res.res)

                if (res.res === "Signed in") {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("email", data.email)
                    navigate("/dashboard")
                }

                if (res.type === "error") {

                    showErr(res.res)

                }

            })

    }

    return (

        <div className='login'>
            
            <h1>Login</h1>


            <InputField label= "Email"    name="email"    selfRef= {emailInp} nxtRef= {pwdInp} />

            <InputField label= "Password" name="password" selfRef= {pwdInp} style={ {marginTop: '50px'} } enterPressed= {submit} />

            <p className='error' > {error} </p>

            <button className='btn login-btn' onClick={ submit } >Sign in</button>

            <div className='or' ></div>

            <p
                style={{
                    fontSize: '20px',
                    marginTop: "60px"
                }}
            >
                Login with Google
            
            </p>
            
            <div className="google-login">
            
                <i className='fab fa-google'></i>

            </div>

            <div className='or' ></div>

            <Link style={ {textDecoration: 'none'} }  to= "/create-account" >
                <p className='create-acc-btn' >Create account </p>
            </Link>


        </div>
    
    )
}


function CreateAccount() {

    const emailInp = useRef("")
    const pwdInp = useRef("")
    const confirmPwdInp = useRef("")
    

    const [pwdSame, setPS] = useState("")
    const [pwdWar, setPW] = useState("")
    const [emailWar, setEW] = useState("")

    const [page, setPage] = useState("ca")

    const [error, showErr] = useState("");

    const token = localStorage.getItem("token")
    const navigate = useNavigate()


    useEffect(() => {
        checkLoggedIn()
            .then( res => {
                if (res) {
                    navigate("/dashboard")
                }
            })
    })


    function validate() {

        let hasSpecialChar = false
        const speacialChars = "~!@#$%^&*()_+-={}|[]:;',./<>?"
        let valid = true

        for (let i = 0; i < speacialChars.length; i++) {

            if (pwdInp.current.value.includes(speacialChars[i])) {
                hasSpecialChar = true

                break
            }
        }


        if (pwdInp.current.value !== confirmPwdInp.current.value) {
            setPS("Passwords must be same")
            valid = false
        } else {
            setPS("")

            
        }

        
        if (pwdInp.current.value.length < 8) {
            setPW("Password must be more than 8 characters")
            valid = false
            
        } else if (!hasSpecialChar) {

            setPW("Password must contain special character")
            valid = false

        } else {
            setPW("")
            
        }

        if (emailInp.current.value === "") {
            setEW("Email required")
            valid = false

        } else if (!(/\S+@\S+\.\S+/.test(emailInp.current.value))) {

            setEW("Invalid email")

        } 
        else {
            setEW("")
        }

        return valid
    }


    function submit() {

        const data = {
            email: emailInp.current.value,
            password: pwdInp.current.value
        }


        if (validate()) {

            fetch("/createAccount", {
                
                method: "POST",
                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':  'application/json',
                },

                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            
            })
                .then(res => res.json())                
                .then( function(data) {

                    console.log(data.res === "OTP sent")

                    if (data.res === "OTP sent") {
                        setPage("otp")
                        
                    }

                    if (data.type === "error") {

                        showErr(data.res)

                    }

                })

        }

    }

    if (page === "ca")
    return (

        <div className='login'>

            <Link to="/login" className="back">
                <span className="material-icons">
                    arrow_back_ios
                </span>
                Login
            </Link>

            <h1>Create Account</h1>

            <InputField onChange= {validate} name="email" label="Email" selfRef= {emailInp} nxtRef= {pwdInp} warning= {emailWar} />
            
            <InputField onChange= {validate} name="password" label="Password" selfRef= {pwdInp} nxtRef= {confirmPwdInp} warning= { pwdWar } />

            <InputField onChange= {validate} name="password" label="Confirm Password" selfRef= {confirmPwdInp} warning = { pwdSame } enterPressed= {submit} />

            <p
                className='error'
            > { error } </p>

            <button className='btn login-btn' onClick={ submit } >Create Account</button>


            <div className='or' ></div>

            <p
                style={{
                    fontSize: '20px',
                    marginTop: "60px"
                }}
            >
                Login with Google

            </p>

            <div className="google-login">

                <i className='fab fa-google'></i>

            </div>

        </div>

    )

    else if (page === "otp")
        return <Otp email= { emailInp.current.value } password= { pwdInp.current.value } />

}



function Otp( props ) {

    const otpInps = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
    const inpRef = useRef()
    let prevInp = ""
    const cursor = useRef()
    let cursorPos = -425
    const token = localStorage.getItem("token")


    const navigate = useNavigate()

    useEffect(() => {
        checkLoggedIn()
            .then( res => {
                if (res) {
                    navigate("/dashboard")
                }
            })
    })


    let _i = 0

    function keyPressed() {

        const str = inpRef.current.value;


        if (str.length > prevInp.length) {
            otpInps[_i].current.innerHTML = str[str.length-1]
            cursorPos += 170
            _i++
        } else {
            otpInps[_i-1].current.innerHTML = ""
            cursorPos -= 170

            _i--
        }

        prevInp = str    

        if (_i < 5){
            cursor.current.style.marginLeft = cursorPos + "px"
        }
        else {
            cursor.current.style.marginLeft = 425 + "px"
            if (str.length === 6) 
                cursor.current.style.marginLeft = 10000 + "px"
            
        }            

    }


    function submit() {

        const data = {
            ...props,
            otp: inpRef.current.value
        }
 
        fetch("/confirm-otp", {
                
                method: "POST",
                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':  'application/json',
                },

                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            
            })
                .then(res => res.json())                
                .then( function(data) {

                    console.log(data.res)

                    if (data.res === "Account Created") {
                        console.log("logged in")

                        const token = data.token

                        localStorage.setItem("token", token)
                        localStorage.setItem("email", props.email)

                        navigate("/dashboard")
                    }

                })
                .catch(err => {
                    console.error("EROORRR", err)
                })
       }

    return (

        <div className='login' >

            <h1>Enter OTP</h1>

            <p
                style={{

                    marginTop: '30px',
                    maxWidth: "550px",
                    marginLeft: 'auto',
                    marginRight: 'auto',

                }}
            >To confirm your identity, an OTP was sent to your email. Enter the OTP here within like 1 minute or smtin</p>

            <div className="otp-inp">

                <input autoFocus type="digit" maxLength={6} ref= {inpRef} onChange= {keyPressed} />
                
                <h1 className='cursor'
                    style={{
                        position: 'absolute',
                        marginLeft: "-425px"
                    }}
                    ref= {cursor}
                >|</h1>

                <p ref={ otpInps[0] } ></p>
                <p ref={ otpInps[1] } ></p>
                <p ref={ otpInps[2] } ></p>
                <p ref={ otpInps[3] } ></p>
                <p ref={ otpInps[4] } ></p>
                <p ref={ otpInps[5] } ></p>

            </div>

            <button onClick={submit} className="btn submit-otp">Submit</button>

        </div>
    )

}


function Logout() {

    const navigate = useNavigate()

    useEffect(() => {

        fetch("/logout", {
                
            method: "POST",
            
            headers: {
                'Accept': 'application/json',
                'Content-Type':  'application/json',
            },

            mode: 'cors',
            cache: 'default',
            body: null
        
        })
            .then( res => {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                navigate("/login")
            } )

    })

    return (

        null

    )

}


async function checkLoggedIn() {

    const token = localStorage.getItem("token")


    const res = await fetch("/is-logged-in", {
                
        method: "POST",
        
        headers: {
            'Accept': 'application/json',
            'Content-Type':  'application/json',
            "Authorization": "Bearer " + token
        },

        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({1:2})
    
    })
        .then(res => res.json())
        .then( function(data) {
            
            if (data.msg === "yes") {
                return true
            } else {
                return false
            }

        } )

    return res

}

export {
    Login,
    CreateAccount,
    Otp,
    checkLoggedIn,
    Logout
}