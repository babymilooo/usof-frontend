import React, { useState } from 'react';
import { useParams } from 'react-router';
import AuthService from '../services/AuthService';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

// В вашем компоненте

const RefreshPassword = () => {
    const { token } = useParams(); // Получение токена из URL
    const [newPassword, setNewPassword] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвратите действие формы по умолчанию
        try {
            const response = await AuthService.SendNewPassword(newPassword, token);
            if (response.status === 200) {
                // Программное перенаправление на страницу входа после успешного запроса
                history.push('/login');
            } else {
                // Обработка ситуации, когда статус ответа не равен 200
                alert('An error occurred: ' + response.data.message);
            }
        } catch (error) {
            // Обработка ошибки запроса
            alert('An error occurred: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card color="transparent" shadow={false} className="bg-blue-gray-50 p-8 shadow-md">
                <div className="w-80 max-w-screen-lg sm:w-96 mx-auto"> {/* This wrapper ensures that all child elements have the same width */}
                    <Typography variant="h4" color="blue-gray">
                        Enter new password
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        create a new password consisting of numbers and upper and lower case letters
                    </Typography>
                    <form className="mt-8 mb-2" onSubmit={handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">
                            <Input
                                onChange={e => setNewPassword(e.target.value)}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <Button type="submit" className="mt-6 w-full">
                            change password
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default RefreshPassword;