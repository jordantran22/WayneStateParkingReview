import React from 'react';
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { axiosPrivate } from '../api/axios';

const NavBar = () => {
    const navigate = useNavigate();
    const [signInClicked, setSignInClicked] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [status, setStatus] = useState();

    const signIn = credentials => {
        axiosPrivate.post('/login', { email: credentials.email, password: credentials.password })
            .then(res => {
                if (res.data.loggedIn) {
                    setStatus(true);
                    if (signInClicked) setSignInClicked(false);
                    else if (signUpClicked) setSignUpClicked(false);
                }
                else alert("Invalid email and password!");
            })
    }

    const getSessionLoginStatus = async () => {
        axiosPrivate.get('/login')
            .then(res => res.data.loggedIn ? setStatus(true) : setStatus(false))
    }

    const logoutButtonClicked = async () => {
        axiosPrivate.post('/logout')
            .then(res => {
                if (!res.data.loggedIn) {
                    setStatus(false);
                    navigate('/');
                }
            });
    }

    useEffect(() => {
        try {
            getSessionLoginStatus();
        } catch (e) {
            console.log(e);
        }
    }, [status])

    return (
        <div className='navbar__spacer'>
            <ul className="navbar">

                <li>
                    <button onClick={() => navigate('/')} className="site-logo">WSU Parking</button>
                </li>

                <div>
                    <li className="navbar__item ff-condensed fw-bold" style={status ? { display: 'initial' } : { display: 'none' }} >
                        <button onClick={() => navigate('/MyReviewsPage')}>My Reviews</button>
                    </li>

                    <li className="navbar__item ff-condensed fw-bold">
                        {(status) ? <button onClick={logoutButtonClicked}>Sign Out</button> : <button onClick={() => setSignInClicked(true)}>Sign In</button>}
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
