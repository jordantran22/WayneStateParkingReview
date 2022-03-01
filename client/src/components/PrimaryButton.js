import React from 'react';

const PrimaryButton = ({text}=String, {func}=Function) => {
    return (
        <button className='primaryButton' onClick={func}>
            {text}
        </button>
    );
}

export default PrimaryButton;