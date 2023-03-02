import React from "react";
import '../styles/Styles.css'

let dateComplete = new Date();
let date = dateComplete.toLocaleDateString('es-MX', {year:"numeric", month:"short", day:"numeric", hour12: true})
let hour = dateComplete.toLocaleString('es-MX', { hour: 'numeric', minute: 'numeric', hour12: true })
const Navbar = () => {
    console.log(dateComplete, 'date')
    return(
<nav className="navbar navbar-expand-lg  navbar-color">
    <div className="container-fluid">
        <span className="navbar-brand span-nav span-text-color">Grand Oasis Cancun</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <span className="nav-link span-text-color">{hour}</span>
            </li>
            <li className="nav-item">
                <span className="nav-link span-text-color">{date}</span>
            </li>
            </ul>
            <span className="navbar-text span-text-color">
            Navbar text with an inline element
            </span>
        </div>
    </div>
</nav>
    )
}

export default Navbar