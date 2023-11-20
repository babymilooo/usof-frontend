import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const handleEmail = async () => {
        const response = AuthService.SendEmailToServer(email);
        console.log(response.data);
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Password recovery
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    enter your email to send the link
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Email
                        </Typography>
                        <Input
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            size="lg"
                            placeholder="exa@example.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Link to='/checkEmail'><Button className="mt-6" fullWidth onClick={handleEmail}>
                        send a letter
                    </Button></Link>
                </form>
            </Card>
        </div>
    );
};

export default ForgetPassword;