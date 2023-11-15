import React, { useState } from 'react';
import { useParams } from 'react-router';
import AuthService from '../services/AuthService';

const RefreshPassword = () => {
    const { token } = useParams(); // Получение токена из URL
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async () => {
        const response = AuthService.SendNewPassword(newPassword, token);
        console.log(response);
    };

    return (
        <div>
            <h1>Reset Your Password</h1>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
            />
            <button onClick={handleSubmit}>Submit New Password</button>
        </div>
    );
};

export default RefreshPassword;