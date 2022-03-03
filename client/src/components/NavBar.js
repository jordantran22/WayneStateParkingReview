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
    const [signUpClicked, setSignUpClicked] = useState(false);

    const activateSignUpModal = () => {
        setSignInClicked(false);
        setSignUpClicked(true);
    }

    const activateSignInModal = () => {
        setSignUpClicked(false);
        setSignInClicked(true);
    }

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

                        <div>Don't have an account? <a onClick={() => activateSignUpModal()}>Sign Up</a></div>
                    </div>
                </div>
            }

{
                signUpClicked &&
                <div className="login-modal-overlay">
                    <div className="login-modal">
                        <button className="close-modal-btn" onClick={() => setSignUpClicked(false)}>
                            X
                        </button>
                        <div>
                            <img src={wsu_logo} alt='wsu logo' />
                        </div>

                        <h2>Sign Up!</h2>
                        <ModalTextInput text="Enter Email" name="username" />
                        <ModalTextInput text="Enter Password" name="password" />
                        <ModalTextInput text="Confirm Password" name="password" />
                        <PrimaryButton text={"Sign Up"} func={() => { }} />

                        <div>Already have an account? </div> <a onClick={() => activateSignInModal()}>Sign In!</a>
                    </div>
                </div>
            }
            {/* <div className='navbar__spacer'></div> */}
        </div>
    )
};

export default NavBar;
