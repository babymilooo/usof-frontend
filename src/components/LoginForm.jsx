import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/loginUser';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = event => {
        event.preventDefault();
        dispatch(loginUser({ login, password }));
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                onChange={e => setLogin(e.target.value)}
                value={login}
                placeholder='Login'
                type="text"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder='password'
                type="text"
            />
            <button>Submit</button>
        </form>
    );
};

export default LoginForm;