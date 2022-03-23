import React from 'react';
import { useState } from 'react';
import ModalTextInput from './ModalTextInput';
import PrimaryButton from './PrimaryButton';
import { URL } from '../data/APIurl';

const SignUpModal = ({ changeSignUpClicked, startSession }) => {
    const [details, setDetails] = useState({ email: "", firstName: "", lastName: "", password: "", confirmPassword: "" })
    const [error, setError] = useState(false);

    const onSignUpButtonClicked = e => {
        e.preventDefault();
        // console.log(details)
        // console.log(details.email);
        // console.log(details.firstName);
        // console.log(details.lastName);
        // console.log(details.password);
        // console.log(details.confirmPassword);

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
        const userInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                email: details.email,
                firstName: details.firstName,
                lastName: details.lastName,
                password: details.password
            })
        }

        const res = await fetch(`${URL}/register`, userInformation);
        const data = await res.json();
        //console.log(data);

        if(data.err === "Account with email already exists!") {
            alert("Account with email already exists!");
        } else {
            let credentials = {
                email: details.email,
                password: details.password
            }
    
            startSession(credentials);
        }
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

{/* <div className='modal-text-input'>
                    <input type="text" id="email" name="email" value={email} onChange={((e) => setEmail(e.target.value))} required />
                    <label for="username">Enter Email</label>
                </div> */}

{/* <div className='modal-text-input'>
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
                </div> */}



{/* <ModalTextInput text="Enter Email" name="username" />
                        <ModalTextInput text="Enter First Name" name="firstname" />
                        <ModalTextInput text="Enter Last Name" name="lastname" />
                        <ModalTextInput text="Enter Password" name="password" />
                        <ModalTextInput text="Confirm Password" name="confirmpassword" /> */}

{/* <div>Already have an account? </div> <a onClick={() => activateSignInModal()}>Sign In!</a> */ }