import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/registerUser';

const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handeRegister = event => {
        event.preventDefault();
        dispatch(registerUser({ login, password, fullname, email }));
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
                type="text"
            />
            <br />
            <input
                onChange={e => setFullname(e.target.value)}
                value={fullname}
                placeholder='fullname'
                type="text"
            />
            <br />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder='email'
                type="text"
            />
            <br />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default RegisterForm;