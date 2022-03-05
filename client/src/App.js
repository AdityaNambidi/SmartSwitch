import React from "react";
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './components/styles/style.css'
import UnderConstruction from "./components/UnderConstruction";
import { Home, About } from "./components/Home";
import NavBar from "./components/NavBar";

function App() {


    return (
        <Router>
            
            <NavBar />

            {/* <h1>{loc}</h1> */}

            <Routes>

                <Route path="/" element= {<UnderConstruction />} />

                <Route path="/home" element= { <Home /> } />

                <Route path="/about" element= { <About /> } />

            </Routes>


        </Router>

    );

}

export default App;