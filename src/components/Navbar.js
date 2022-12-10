import { Link } from 'react-router-dom'
import React from "react";
import { useLocation } from 'react-router';

function Navbar() {
    const location = useLocation()
    const id = location.pathname.replace("/details/","")
    console.log(id);
    
    return (
            <nav>
                <ul>
                    <li>
                        <Link className={location.pathname === "/" ? "ml-3 font-semibold text-orange-600" : "ml-3 font-semibold "} to="/">Home</Link>
                        <Link className={location.pathname === "/news" ? "ml-3 font-semibold text-orange-600" : "ml-3 font-semibold "} to="/news">News</Link>
                        <Link className={location.pathname === `/details/${id}` ? "ml-3 font-semibold text-orange-600" : "ml-3 font-semibold "} to="/details">Details</Link>
                        <Link className={location.pathname === `/swap` ? "ml-3 font-semibold text-orange-600" : "ml-3 font-semibold "} to="/swap">Swap</Link>
                    </li>
                </ul>
            </nav>
        
    );
}

export default Navbar