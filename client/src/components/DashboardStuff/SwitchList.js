import React, { useEffect, useState } from 'react'
import Switch from './Switch'

export default function SwitchList(  ) {
    
    const token = localStorage.getItem("token")
    const [switches, addSwitch] = useState([])

    function getSwitches() {

        const data = {
            email: localStorage.getItem("email")
        }

        fetch("/get-switches", {
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
            

            const switchList = data["switches"]

            addSwitch(switchList)

        } )
    }

    
    useEffect(() => {

        getSwitches()

    }, [])


    return (
    
        <div className='switch-list' >

            {

                switches.map(

                    function(s, i) {
                    
                        return <Switch key= {i} name= {s}  />
                    
                    }
                
                )

            }

        </div>
    
    )
}
