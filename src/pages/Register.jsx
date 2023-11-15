import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/registerUser';
import { Link } from 'react-router-dom';

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handeRegister = event => {
        event.preventDefault();
        dispatch(registerUser({ login, password, fullName, email }));
    };

    return (
        <form onSubmit={handeRegister}>
            <input
                onChange={e => setLogin(e.target.value)}
                value={login}
                placeholder='Login'
                type="text"
            />
            <br />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder='password'
                type="password"
            />
            <br />
            <input
                onChange={e => setFullname(e.target.value)}
                value={fullName}
                placeholder='fullname'
                type="text"
            />
            <br />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder='email'
                type="email"
            />
            <br />
            <button type='submit'>Submit</button>
            <Link to="/login">
                <button>back to login</button>
            </Link>
        </form>
    );
};

export default Register;