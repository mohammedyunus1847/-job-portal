import {Link} from "react-router-dom"
import "../styles/navbar.css"
import { useEffect, useState } from "react";


function Navbar(){
    const[role,setRole] =useState(localStorage.getItem("role"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    useEffect(()=>{
        const updateRole = ()=>{
                console.log("Updated role:", localStorage.getItem("role"));
                console.log("Updated token:", localStorage.getItem("token"));

            setRole(localStorage.getItem("role"));
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("authChange",updateRole);

        return ()=>{
            window.removeEventListener("authChange",updateRole)
        }
    },[])

    function HandleLogout(){
        localStorage.removeItem("token");
        localStorage.removeItem("role")
        window.dispatchEvent(new Event("authChange"))
    }
    return(
        <nav className="navbar">
            <h2 className="logo">JOB FINDER</h2>

            <div className="nav-links">
                
                <Link to="/">Home</Link>
                {token && (
                    <button onClick={HandleLogout}>
                        Logout
                    </button>
                )}

            {!token && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Rigister</Link>
                </>
            )}
                

            {token && role?.toLowerCase() ==="jobseeker" && (
                <>
                    <Link to="/myapplication">My Application</Link>
                </>
            )}
                

            {token && role?.toLowerCase() === "recruiter" && (
                <>
                    <Link to="/post-job">Post a Job</Link>
                    <Link to="/my-jobs" >My Posted Jobs</Link>
                    <Link to="/applicants">Applicants Dashboard</Link>

                </>

            )}
               

            </div>
        </nav>

    )
}

export default Navbar;