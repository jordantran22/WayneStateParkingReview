import React from 'react';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import ModalTextInput from './ModalTextInput';
import wsu_logo from '../images/wsu_logo.png';

const SignInModal = ({ changeSignInClicked, changeSignUpClicked, startSession }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const submitHandler = e => {
        e.preventDefault();
        startSession(credentials);
    }

    const activateSignUpModal = () => {
        changeSignInClicked(false);
        changeSignUpClicked(true);
    }

    return (
        <div className="login-modal-overlay">
            <form onSubmit={submitHandler} className="login-modal">
                <button type='button' className="close-modal-btn" onClick={() => changeSignInClicked(false)}>
                    X
                </button>
                <div>
                    <img src={wsu_logo} alt='wsu logo' />
                </div>
                <ModalTextInput type="text" text="Enter Email" name="email" value={credentials.email} func={e => setCredentials({ ...credentials, email: e.target.value })} />
                <ModalTextInput type="password" text="Enter Password" name="password" value={credentials.password} func={e => setCredentials({ ...credentials, password: e.target.value })} />
                <PrimaryButton text="Sign In" />

                <div>Don't have an account? <a onClick={activateSignUpModal}>Sign Up</a></div>
            </form>
        </div>
    );
}

export default SignInModal;