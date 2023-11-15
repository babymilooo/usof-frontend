import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/loginUser';
import { Link } from 'react-router-dom';

const Login = () => {
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
                type="password"
            />
            <br />
            <button>Submit</button>
            <Link to="/registration">
                <button>Register</button>
            </Link>
            <Link to="/forgotPassword">
            <button>forgot password</button>
            </Link>
        </form>
    );
};

export default Login;