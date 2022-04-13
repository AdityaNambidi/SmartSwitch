import React from "react";
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './components/styles/style.css'
import UnderConstruction from "./components/UnderConstruction";
import { Home, About } from "./components/Home";
import NavBar from "./components/NavBar";
import { Login, CreateAccount, Otp, Logout } from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {


    return (
        <Router>
            
            <NavBar />

            <Routes>

                <Route path="/" element= {<UnderConstruction />} />

                <Route path="/home" element= { <Home /> } />

                <Route path="/about" element= { <About /> } />

                <Route path="/login" element= { <Login /> } />

                <Route path="/create-account" element= { <CreateAccount /> } />

                <Route path="/otp" element= { <Otp /> } />

                <Route path= "/dashboard" element= { <Dashboard /> } />

                <Route path= "/logout" element= { <Logout /> } />

            </Routes>


        </Router>

    );

}


export default App;