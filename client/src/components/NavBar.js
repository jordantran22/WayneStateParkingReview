import React from 'react';
// import wsu_logo from '../images/wsuLogo.png';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router'
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';

const NavBar = () => {
    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/');
    }

    const [signInClicked, setSignInClicked] = useState(false);

    return (
        <div className='navbar__spacer'>
            <ul className="navbar">

                <li className="navbar__item ff-condensed fw-bold">
                    <a href="javascript:void(0);" onClick={() => navigateToHomePage()} class="site-logo">WSU Parking</a>
                </li>

                <li className="navbar__item">
                    <SearchBar />
                </li>

                <li className="navbar__item ff-condensed fw-bold" onClick={() => setSignInClicked(true)}>
                    Sign In
                </li>
            </ul>

            {
                signInClicked &&
                <div className="login-modal-overlay">
                    <div className="login-modal">
                        <div className="close-modal-btn" onClick={() => setSignInClicked(false)}>
                            X
                        </div>
                        <div>
                            <img className="wsulogo" src="https://media2.metrotimes.com/metrotimes/imager/u/original/6344372/x4pckygq_400x400.jpg" />
                        </div>
                        <div>
                            <h2>WSU Parking Review!</h2>
                            <div>Enter Email Address</div>
                            <div>
                                <input className="modal-text-input" type="text" placeholder='Enter Email Address'></input>
                            </div>

                            <div>Enter Password</div>
                            <div>
                                <input className="modal-text-input" type="password" placeholder='Enter Password'></input>
                            </div>

                            <PrimaryButton text={"Login"} func={() => { }} />

                            <div>Don't have an account? </div>
                            <PrimaryButton text={"Sign Up"} func={() => { }} />
                        </div>
                    </div>
                </div>
            }
            {/* <div className='navbar__spacer'></div> */}
        </div>
    )
};

export default NavBar;
