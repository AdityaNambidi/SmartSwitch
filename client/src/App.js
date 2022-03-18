import React from "react";
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './components/styles/style.css'
import UnderConstruction from "./components/UnderConstruction";
import { Home, About } from "./components/Home";
import NavBar from "./components/NavBar";
import { Login, CreateAccount, Otp } from "./components/Login";

function App() {


    return (
        <Router>
            
            <NavBar />

            {/* <h1>{loc}</h1> */}

            <Routes>

                <Route path="/" element= {<UnderConstruction />} />

                <Route path="/home" element= { <Home /> } />

                <Route path="/about" element= { <About /> } />

                <Route path="/login" element= { <Login /> } />

                <Route path="/create-account" element= { <CreateAccount /> } />

                <Route path="/otp" element= { <Otp /> } />

            </Routes>


        </Router>

    );

}

export default App;