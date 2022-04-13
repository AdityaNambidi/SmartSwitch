import React, { useEffect, useState } from 'react'

export default function Switch( props ) {
    
    const [state, toggleState] = useState(true)
    const token = localStorage.getItem("token")

    function togleSwitch() {

        let data = {
            email: localStorage.getItem("email"),
            switch: props.name,
            state: 1
        }

        if (state)
            data.state = 0

        console.log(data)

        fetch("/toggle-switch", {
                
            method: "POST",
            
            headers: {
                'Accept': 'application/json',
                'Content-Type':  'application/json',
                "Authorization": "Bearer " + token
            },

            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data)
        
        })
            .then(res => res.json())
            .then( function(data) {

                if (data.type === "error") {

                    

                }
 
            } )
    }

    useEffect(() => {

        const data = {

            email: localStorage.getItem("email"),
            switch: props.name

        }

        fetch("/check-switch", {
                
            method: "POST",
            
            headers: {
                'Accept': 'application/json',
                'Content-Type':  'application/json',
                "Authorization": "Bearer " + token
            },

            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data)
        
        })
            .then(res => res.json())
            .then( function(data) {

                if (data.res === 0) 
                    toggleState(false)

            } )

    }, [])


    return (

        <div className="switch">

            <div className="bg"></div>

            <h1> ID: &nbsp; {props.name}</h1>

            <button onClick={ () => {

                togleSwitch()
                toggleState( !state )

            } }> { state ? "On" : "Off" } </button>

        </div>
 
    )
}
