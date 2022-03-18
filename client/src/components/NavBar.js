import React from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const NavBar = ({ loggedInStatus }) => {
    let navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/');
    }

    const navigateToMyReviewsPage = () => {
        navigate('/MyReviewsPage', {state: {

        }});
    }

    const [signInClicked, setSignInClicked] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [status, setStatus] = useState(loggedInStatus);

    const signIn = async credentials => {
        const userInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
            credentials: "include"
        }

        const res = await fetch('http://localhost:5000/login', userInformation);
        const data = await res.json();
        if (data.loggedIn === true) {
            setStatus(true);
            if (signInClicked) setSignInClicked(false);
            else if (signUpClicked) setSignUpClicked(false);
        } else {
            alert("Invalid email and password!");
        }
    }

    const getSessionLoginStatus = async () => {
        const userInformation = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            credentials: "include"
        }

        const res = await fetch('http://localhost:5000/login', userInformation);
        const data = await res.json();
        //console.log(data);
        if (data.loggedIn === true) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }

    const logoutButtonClicked = async () => {
        const userInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            credentials: "include"
        }

        const res = await fetch('http://localhost:5000/logout', userInformation);
        const data = await res.json();
        //console.log(data);
        if (data.loggedIn === false) {
            setStatus(false);
            navigateToHomePage();
        }
    }

    useEffect(() => {
        try {
            getSessionLoginStatus();
        } catch (e) {
            console.log(e);
        }
    }, [])

    return (
        <div className='navbar__spacer'>
            <ul className="navbar">

                <li>
                    <button onClick={() => navigateToHomePage()} className="site-logo">WSU Parking</button>
                </li>

                <li className="navbar__item">
                    <SearchBar />
                </li>
                <div>
                    <li className="navbar__item ff-condensed fw-bold" style={status ? { display: 'initial' } : { display: 'none' }} >
                        <button onClick={() => navigateToMyReviewsPage()}>My Reviews</button>
                    </li>

                    <li className="navbar__item ff-condensed fw-bold">
                        {(status) ? <button onClick={() => logoutButtonClicked()}>Sign Out</button> : <button onClick={() => setSignInClicked(true)}>Sign In</button>}
                    </li>
                </div>
            </ul>

            {
                signInClicked && <SignInModal startSession={signIn} changeSignInClicked={setSignInClicked} changeSignUpClicked={setSignUpClicked} />
            }
            {
                signUpClicked && <SignUpModal startSession={signIn} changeSignUpClicked={setSignUpClicked} />
            }

        </div >
    )
};

export default NavBar;
