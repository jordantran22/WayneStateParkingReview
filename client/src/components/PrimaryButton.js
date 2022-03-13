import React from 'react';

const PrimaryButton = ({text, func}) => {
    return (
        <button className='primary-btn' onClick={() => func()}>
            {text}
        </button>
    );
}

export default PrimaryButton;