import React, { useRef } from 'react'
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

    function submit() {

        const data = {
            email: emailInp.current.value,
            password: pwdInp.current.value
        }

    }

    return (

        <div className='login'>

            <Link to="/login" className="back">
                <span class="material-icons">
                    arrow_back_ios
                </span>
                Login
            </Link>

            <h1>Create Account</h1>

            <InputField name="email" label="Email" selfRef= {emailInp} nxtRef= {pwdInp} />
            
            <InputField name="password" label="Password" selfRef= {pwdInp} nxtRef= {confirmPwdInp} />

            <InputField name="password" label="Confirm Password" selfRef= {confirmPwdInp} />


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