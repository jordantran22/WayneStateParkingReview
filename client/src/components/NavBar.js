import React from 'react';
// import wsu_logo from '../images/wsuLogo.png';
import SearchBar from './SearchBar';

const NavBar = () => {
    return (
        <div>

            <div>

                <ul className="navbar">
                    <li className="nav-item ff-condensed fw-bold">
                        <a href="index" class="site-logo">WSU Parking</a>
                    </li>

                    <li className="nav-item">
                        <SearchBar />
                    </li>

                    <li className="nav-item ff-condensed fw-bold">
                        Sign In
                    </li>
                </ul>
            </div>


        </div>
    )
};

export default NavBar;
