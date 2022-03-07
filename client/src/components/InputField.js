import React from 'react'

export default function InputField( props ) {



    return (

        <div className="input-field" style={ props.style }>

            <input ref={ props.ref } type={ props.name } name= {props.name  } className= {props.name  }  placeholder=" " onKeyPress= { null } />
            <label htmlFor={props.name  }> {props.label}</label>

        </div>

    )

}
