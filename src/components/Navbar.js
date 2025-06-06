import { Link, useLocation, useNavigate } from "react-router-dom"
import React, { useContext, useEffect} from 'react'

import NoteContext from '../context/notes/noteContext'
import Profile from "./Profile";

const Navbar = () => {
    const context = useContext(NoteContext);
    const { setUser, user} = context;

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
        setUser(null);
    }

    let location = useLocation()

    return (
        <nav className="navbar  sticky-top navbar-expand-lg navbar-dark bg-dark " >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item" >
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex">
                    {user && (
                        <div className="me-3">
                            <Profile />
                        </div>
                    )}
                </div>

                {!user ? <form className="d-flex  ">
                    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                </form> : <button onClick={handleLogout} className="btn btn-primary "> Logout</button>}

            </div>
        </nav>

    )
}

export default Navbar
