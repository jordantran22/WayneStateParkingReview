import React from 'react';
// import wsu_logo from '../images/wsuLogo.png';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router'

const NavBar = () => {
    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/');
    }

    return (
        <div>
            <div className='navbar-spacer'></div>
            <div>
                <ul className="navbar">

                    <li className="nav-item ff-condensed fw-bold">
                        <a href="javascript:void(0);" onClick={() => navigateToHomePage()} class="site-logo">WSU Parking</a>
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
