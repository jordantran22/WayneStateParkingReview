import React from 'react';

const ModalTextInput = ({text}=String, {name}=String) => {
    return (
        <div className='modal-text-input'>
            <input type={"text"} id={name} name={name} required />
            <label for={name}>{text}</label>
        </div>
    );
}

export default ModalTextInput;