import { Typography } from '@material-tailwind/react';
import React from 'react';
import Gmail from "../components/Images/google-svgrepo-com.svg"
import Yahoo from "../components/Images/yahoo-svgrepo-com.svg"
import Outlook from "../components/Images/outlook-svgrepo-com.svg"
const CheckEmail = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Typography variant="h4" color="blue-gray" className="mb-4">
                Check Your email
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                A form for a new password has been sent to your email.
            </Typography>
            <br />
            <div className="flex justify-center space-x-4">
                <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={Gmail} alt="Gmail" className="w-12 h-12" />
                </a>

                <a
                    href="https://mail.yahoo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={Yahoo} alt="Yahoo Mail" className="w-20 h-12" />
                </a>

                <a
                    href="https://outlook.live.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={Outlook} alt="Outlook" className="w-12 h-12" />
                </a>
            </div>
        </div>


    );
};

export default CheckEmail;