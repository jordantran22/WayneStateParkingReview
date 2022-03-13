import React from 'react';

const PrimaryButton = ({text, func=null}) => {
    return (
        <button className='primary-btn' onClick={func ? () => func() : null}>
            {text}
        </button>
    );
}

export default PrimaryButton;