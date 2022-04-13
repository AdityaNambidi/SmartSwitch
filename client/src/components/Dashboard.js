import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Dashboard.css'
import { checkLoggedIn } from './Login'
import SwitchList from './DashboardStuff/SwitchList'
import AddSwitch from './DashboardStuff/AddSwitch'

export default function Dashboard() {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {

        checkLoggedIn().then( function(res) {
            
            if (!res) {
                console.log(res)
                navigate("/login")
                return
            }
            
        } )

    }, [])


    return (

        <div className="dashboard">

            <h1 className='title' >Dashboard</h1>   

            <SwitchList /> 

            <AddSwitch />
            
        </div>
        
    )

}
