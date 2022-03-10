import React from 'react';

const PrimaryButton = ({text, onSignUpButtonClicked}) => {
    return (
        <button className='primary-btn' onClick={() => onSignUpButtonClicked()}>
            {text}
        </button>
    );
}

export default PrimaryButton;