import React, { useEffect, useRef } from 'react'
import './styles/Login.css'
import InputField from './InputField';

export default function Login() {

    const emailInp = useRef();

    function keyPressed(e) {

        console.log(e);

    }

    return (

        <div className='login'>
            
            <h1>Login</h1>

            <form action="#">

                <InputField label="Email" name="email" ref= {emailInp} />

                <InputField label= "Password" name="password" style={ {marginTop: '50px'} } />

            </form>

        </div>
    
    )
}
