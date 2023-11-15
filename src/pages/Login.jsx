import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <LoginForm />
            <Link to="/registration">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Login;