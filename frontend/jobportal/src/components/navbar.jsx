import {Link} from "react-router-dom"
import "../styles/navbar.css"
import { useEffect, useState } from "react";


function Navbar(){
    const[role,setRole] =useState(localStorage.getItem("role"));
    console.log(role);
    useEffect
    return(
        <nav className="navbar">
            <h2 className="logo">JOB FINDER</h2>

            <div className="nav-links">
                
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Rigister</Link>
                <Link to="/myapplication">My Application</Link>
                <Link to="/post-job">Post a Job</Link>
            </div>
        </nav>

    )
}

export default Navbar;