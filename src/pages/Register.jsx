import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/registerUser';
import { Link } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullname] = useState('empty');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handeRegister = event => {
        event.preventDefault();
        dispatch(registerUser({ login, password, fullName, email }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card color="transparent" shadow={false} className="bg-blue-gray-50 p-8 shadow-md">
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                            onChange={e => setLogin(e.target.value)}
                            size="lg"
                            placeholder="name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            onChange={e => setEmail(e.target.value)}
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <br />
                    <Button className="mt-6" fullWidth onClick={handeRegister}>
                        sign up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-900">Sign In</Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Register;