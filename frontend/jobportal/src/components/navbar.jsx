import {Link} from "react-router-dom"
import "../styles/navbar.css"


function Navbar(){
    return(
        <nav className="navbar">
            <h2 className="logo">JOB FINDER</h2>

            <div className="nav-links">
                
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Rigister</Link>
            </div>
        </nav>

    )
}

export default Navbar;