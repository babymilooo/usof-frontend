import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/loginUser';
import { Link } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = event => {
        event.preventDefault();
        dispatch(loginUser({ login, password }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card color="transparent" shadow={false} className="bg-blue-gray-50 p-8 shadow-md">
                <Typography variant="h4" color="blue-gray">
                    Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to login.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your login
                        </Typography>
                        <Input
                            onChange={e => setLogin(e.target.value)}
                            size="lg"
                            placeholder="Name"
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
                    <Typography color="gray" className="mt-4 text-center font-normal">

                        <Link to="/forgotPassword" className="font-medium text-gray-900">
                            Forgot password?
                        </Link>
                    </Typography>
                    <Button className="mt-6" fullWidth onClick={handleLogin}>
                        sign in
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Not a member?{" "}
                        <Link to="/registration" className="font-medium text-gray-900">
                            Sign Un
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Login;