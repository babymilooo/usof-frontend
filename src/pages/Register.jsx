import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <RegisterForm />
            <Link to="/login">
                <button>back to login</button>
            </Link>
        </div>
    );
};

export default Register;