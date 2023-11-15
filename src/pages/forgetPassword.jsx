import React, { useState } from 'react';
import AuthService from '../services/AuthService';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const handleEmail = async() => {
        const response = AuthService.SendEmailToServer(email);
        console.log(response.data);
    }
    return (
        <div>
            <h1>Enter your email address to receive an update link</h1>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder='email'
                type="text"
            />
            <button onClick={handleEmail}>Submit</button>
        </div>
    );
};

export default ForgetPassword;