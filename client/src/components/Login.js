import React, {  useRef, useState } from 'react'
import './styles/Login.css'
import InputField from './Elements';
import { Link } from 'react-router-dom'


function Login() {

    const emailInp = useRef();
    const pwdInp = useRef();

    function submit() {

        const data = {
            email: emailInp.current.value,
            password: pwdInp.current.value
        }

        console.log(data)

    }

    return (

        <div className='login'>
            
            <h1>Login</h1>


            <InputField label= "Email"    name="email"    selfRef= {emailInp} nxtRef= {pwdInp} />

            <InputField label= "Password" name="password" selfRef= {pwdInp} style={ {marginTop: '50px'} } enterPressed= {submit} />


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

    function validate() {

        let hasSpecialChar = false
        const speacialChars = "~!@#$%^&*()_+-={}|[]\:;',./<>?"
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

            fetch("http://192.168.0.191:5000/createAccount", {
                
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
                .then( data => console.log(data) )

        }

    }

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

}


export {
    Login,
    CreateAccount
}