import React from 'react';
import wsu_logo from '../images/wsu_logo.png';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import ModalTextInput from './ModalTextInput';
import Axios from 'axios';

const NavBar = ({loggedInStatus}) => {
    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/');
    }

    const [signInClicked, setSignInClicked] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

     const [loggedIn, setLoggedIn] = useState(false);
    Axios.defaults.withCredentials = true;

    const activateSignUpModal = () => {
        setSignInClicked(false);
        setSignUpClicked(true);
    }

    const activateSignInModal = () => {
        setSignUpClicked(false);
        setSignInClicked(true);
    }

    const onSignUpButtonClicked = () => {
        console.log(email);
        console.log(firstName);
        console.log(lastName);
        console.log(password);
        console.log(confirmPassword);

        signUpInputValidation();
    }

    const signUpInputValidation = () => {
        if (email === "" || firstName  === "" || lastName  === ""  || password  === "" || confirmPassword === "" ) {
            setError(true);
        } else {
            setError(false);
            signUpApiRequest();
        }
    }

    const signUpApiRequest = async () => {
        const userInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            })
           }

        const res = await fetch('http://localhost:5000/register', userInformation);
        const data = await res.json();
        console.log(data);
        if(data.status === true) {
            setSignUpClicked(false);
            setSignInClicked(true);
        }
    }

    const signIn = async () => {
        const userInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            }),
            credentials : "include"
        }

        const res = await fetch('http://localhost:5000/login', userInformation);
        const data = await res.json();
        console.log(data);
        if(data.loggedIn === true) {
            setLoggedIn(true);
        }
    }

    const getSessionLoginStatus = async () => {
        const userInformation = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            credentials : "include"
        }

        const res = await fetch('http://localhost:5000/login', userInformation);
        const data = await res.json();
        console.log(data);
        if(data.loggedIn === true) {
           // setLoggedInStatus(true);
        }
    }

    useEffect(()=> {
       // getSessionLoginStatus();

        // Axios.get("http://localhost:5000/login").then((response) => {
        //     console.log(response);
        // })
    },[])



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
                   {!loggedInStatus ? <button onClick={() => setSignInClicked(true)}>Sign In</button> : <button>Log out</button>} 
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

                        <div className='modal-text-input'>
                            <input type="text" id="email" name="email" value={loginEmail} onChange={((e) => setLoginEmail(e.target.value))} required />
                            <label for="username">Enter Email</label>
                        </div>

                        <div className='modal-text-input'>
                            <input type="password" id="password" name="password" value={loginPassword} onChange={((e) => setLoginPassword(e.target.value))} required />
                            <label for="password">Enter Password</label>
                        </div>

                        <button className='primary-btn' onClick={() => signIn()}>
                            Sign In
                        </button>

                        {/* <ModalTextInput text="Username or email" name="username" />
                        <ModalTextInput text="Password" name="password" />
                        <PrimaryButton text={"Login"} func={() => { }} /> */}

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

                        {error && <div><strong>Something is missing!</strong></div>}
                        <div className='modal-text-input'>
                            <input type="text" id="email" name="email" value={email} onChange={((e) => setEmail(e.target.value))} required />
                            <label for="username">Enter Email</label>
                        </div>

                        <div className='modal-text-input'>
                            <input type="text" id="firstname" name="firstname" value={firstName} onChange={((e) => setFirstName(e.target.value))} required />
                            <label for="firstname">Enter First Name</label>
                        </div>

                        <div className='modal-text-input'>
                            <input type="text" id="lastname" name="lastname" value={lastName} onChange={((e) => setLastName(e.target.value))} required />
                            <label for="lastname">Enter Last Name</label>
                        </div>

                        <div className='modal-text-input'>
                            <input type="text" id="password" name="password" value={password} onChange={((e) => setPassword(e.target.value))} required />
                            <label for="password">Enter Password</label>
                        </div>

                        <div className='modal-text-input'>
                            <input type="text" id="confirmpassword" name="confirmpassword" value={confirmPassword} onChange={((e) => setConfirmPassword(e.target.value))} required />
                            <label for="confirmpassword">Re-enter Password</label>
                        </div>



                        {/* <ModalTextInput text="Enter Email" name="username" />
                        <ModalTextInput text="Enter First Name" name="firstname" />
                        <ModalTextInput text="Enter Last Name" name="lastname" />
                        <ModalTextInput text="Enter Password" name="password" />
                        <ModalTextInput text="Confirm Password" name="confirmpassword" /> */}
                        <PrimaryButton text={"Sign Up"} onSignUpButtonClicked={onSignUpButtonClicked} />

                        <div>Already have an account? </div> <a onClick={() => activateSignInModal()}>Sign In!</a>
                    </div>
                </div>
            }
            {/* <div className='navbar__spacer'></div> */}
        </div>
    )
};

export default NavBar;
