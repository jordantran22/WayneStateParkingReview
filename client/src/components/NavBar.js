import React from 'react';
import wsu_logo from '../images/wsu_logo.png';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router'
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import ModalTextInput from './ModalTextInput';

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

                <li className="navbar__item ff-condensed fw-bold">
                    <button onClick={() => setSignInClicked(true)}>Sign In</button>
                </li>
            </ul>

            {
                signInClicked &&
                <div className="login-modal-overlay">
                    <div className="login-modal">
                        <button className="close-modal-btn" onClick={() => setSignInClicked(false)}>
                            X
                        </button>
                        <div>
                            <img src={wsu_logo} alt='wsu logo' />
                        </div>
                        <ModalTextInput text="Username or email" name="username" />
                        <ModalTextInput text="Password" name="password" />
                        <PrimaryButton text={"Login"} func={() => { }} />

                        <div>Don't have an account? <a href="#">Sign Up</a></div>
                    </div>
                </div>
            }
            {/* <div className='navbar__spacer'></div> */}
        </div>
    )
};

export default NavBar;
