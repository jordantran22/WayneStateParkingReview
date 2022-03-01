import React from 'react';
// import wsu_logo from '../images/wsuLogo.png';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router'
import { useState } from 'react';

const NavBar = () => {
    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/');
    }

    const [signInClicked, setSignInClicked] = useState(false);

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

                    <li className="nav-item ff-condensed fw-bold" onClick={() => setSignInClicked(true)}>
                        Sign In
                    </li>
                </ul>
            </div>

            {
                signInClicked &&
                <div className="loginPopupContainer">
                    <div className="loginPopupForm">
                            <div className="closeX" onClick={() => setSignInClicked(false)}>
                                X
                            </div>
                            <div>
                                <img className="wsulogo" src="https://media2.metrotimes.com/metrotimes/imager/u/original/6344372/x4pckygq_400x400.jpg" />
                            </div>
                            <div>
                                <h2>WSU Parking Review!</h2>
                                <div>Enter Email Address</div>
                                <div>
                                    <input className="inputForLogin" type="text" placeholder='Enter Email Address'></input>
                                </div>
                         
                                <div>Enter Password</div>
                                <div>
                                    <input className="inputForLogin" type="password" placeholder='Enter Password'></input>
                                </div>

                                <button className="loginButton">Login</button>

                                <div>Don't have an account? </div>
                                <button className="signupButton">Sign Up!</button>
                            </div>
                    </div>  
                </div>
            }


        </div>
    )
};

export default NavBar;
