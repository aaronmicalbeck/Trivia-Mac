import React from "react"
import { Link } from 'react-router-dom'
import './navbar.css'

function NavBarComponent({ loggedIn, _logout }) {
    return (
        <nav className="navbar navbar-light bg-dark">
            {loggedIn ?
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link" onClick={_logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
                :
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
						</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Sign Up
						</Link>
                    </li>
                </ul>
            }
        </nav>
    )
}

export const NavBar = React.memo(NavBarComponent);