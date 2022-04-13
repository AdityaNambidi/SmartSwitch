import React, { useEffect, useState } from 'react'
import './styles/Elements.css'

export default function InputField( props ) {

    const [showTxt, toggleShow] = useState(false)
    const [type, changeType] = useState(props.name)

    function onPressEnter(e) {
        
        if (e.key === "Enter") {
            
            if (props.nxtRef) {
                props.nxtRef.current.focus()
                return
            }

            props.enterPressed()

        }

    }

    return (

        <div className="input-field" style={ props.style }>

            <input 
                type={ type } 
                ref= {props.selfRef} 
                name= {props.name  } 
                className= {props.name  }  
                placeholder=" " 
                autoComplete= { props.name } 
                onKeyPress= { onPressEnter }
                onChange= { props.onChange }
            />
            <label htmlFor={props.name  }> {props.label}</label>

            <button className= { (props.name === "password" ? "eye" : "hide") } 
                onClick= { () => { 
                    toggleShow( !showTxt ) 
                    
                    if (showTxt) 
                        changeType("password")
                    else 
                        changeType("text")

                } }
            >
            
                <span class="material-icons">
                    { showTxt ? "visibility" : "visibility_off" }
                </span>

            </button>

            <p className='warning' > { (props.warning ? "*" + props.warning : "") } </p>

        </div>

    )

}
