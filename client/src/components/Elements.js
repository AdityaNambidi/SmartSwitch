import React from 'react'
import './styles/Elements.css'

export default function InputField( props ) {

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
                type={ props.name } 
                ref= {props.selfRef} 
                name= {props.name  } 
                className= {props.name  }  
                placeholder=" " 
                autoComplete= { props.name } 
                onKeyPress= { onPressEnter }
                onChange= { props.onChange }
            />
            <label htmlFor={props.name  }> {props.label}</label>

            <p className='warning' > { (props.warning ? "*" + props.warning : "") } </p>

        </div>

    )

}
