import React, { useRef, useState } from 'react'

export default function AddSwitch() {

    const [showPanel, toggleShowPanel] = useState(false)
    const token = localStorage.getItem("token")
    const sID = useRef()    

    function addSwitch() {

        const data = {

            email: localStorage.getItem("email"),
            "switch-id": sID.current.value
        }

        fetch("/add-switch", {
                
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

                console.log(data)

            } )
    }


    return (
    
        <div>


            <div className='add-switch' >
            
                <p> Add Switch </p>
        
                <button
                className='btn-anim'
                    onClick={() => {

                        toggleShowPanel(true)

                    }}
                >+</button>


            </div>

        

            <div 
                style={{
                    display: (showPanel ? "block" : "none")
                }}           
            >
                <div className="add-switch-panel-bg"

                onClick= {() => {
                    toggleShowPanel(false)
                    
                }}

                >

                </div>


                <div className='add-switch-panel'>

                    <button
                        className='close-btn btn-anim'    
                        onClick={() => {

                            toggleShowPanel(false)

                        }}
                    >x</button>

                    <input ref= {sID} type="numeric" placeholder='Enter Switch ID' />


                    <button 
                        className="add-switch-btn btn-anim"
                        onClick={() => {
                            addSwitch()
                        }}
                    >

                        Add

                    </button>

                </div>



            </div>

        </div>

    )

}