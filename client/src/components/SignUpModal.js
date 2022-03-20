import { axiosPrivate } from '../api/axios';
import React from 'react';
import { useState } from 'react';
import ModalTextInput from './ModalTextInput';
import PrimaryButton from './PrimaryButton';

const SignUpModal = ({ changeSignUpClicked, startSession }) => {
    const [details, setDetails] = useState({ email: "", firstName: "", lastName: "", password: "", confirmPassword: "" })
    const [error, setError] = useState(false);

    const onSignUpButtonClicked = e => {
        e.preventDefault();
        signUpInputValidation(details);
    }

    const signUpInputValidation = () => {
        if (details.email === "" || details.firstName === "" || details.lastName === "" || details.password === "" || details.confirmPassword === "") {
            setError(true);
        } else {
            setError(false);
            signUpApiRequest(details);
        }
    }

    const signUpApiRequest = async () => {
        axiosPrivate.post('/register', {
            email: details.email,
            firstName: details.firstName,
            lastName: details.lastName,
            password: details.password
        })
            .then(res => {
                if (res.data.err === "Account with email already exists!")
                    alert(res.data.err);
                else {
                    startSession({
                        email: details.email,
                        password: details.password
                    });
                }
            })
    }

    return (
        <div className="login-modal-overlay">
            <form className="login-modal" onSubmit={onSignUpButtonClicked}>
                <button type="button" className="close-modal-btn" onClick={() => changeSignUpClicked(false)}>
                    X
                </button>
                <h2>Sign Up!</h2>
                <ModalTextInput type="text" text="Enter Email" name="email" value={details.email} func={e => setDetails({ ...details, email: e.target.value })} />
                <ModalTextInput type="text" text="Enter First Name" name="firstname" value={details.firstName} func={e => setDetails({ ...details, firstName: e.target.value })} />
                <ModalTextInput type="text" text="Enter Last Name" name="lastname" value={details.lastName} func={e => setDetails({ ...details, lastName: e.target.value })} />
                <ModalTextInput type="text" text="Enter Password" name="password" value={details.password} func={e => setDetails({ ...details, password: e.target.value })} />
                <ModalTextInput type="text" text="Re-enter Password" name="confirmPassword" value={details.confirmPassword} func={e => setDetails({ ...details, confirmPassword: e.target.value })} />
                <PrimaryButton text={"Sign Up"} onSignUpButtonClicked={onSignUpButtonClicked} />
            </form>
        </div>
    );
}

export default SignUpModal;