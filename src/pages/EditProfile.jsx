import React, { useEffect, useState } from 'react';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import Navbar from '../components/UI/Navbars/MyNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../store/updateAvatar';
import { updateProfile } from '../store/updateProfile';
import { Avatar } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import SendAvatar from '../components/UI/SendButtons/SendAvatar';
import FileService from '../services/FileService';
import Compressor from 'compressorjs';

const EditProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Для программного перенаправления
    const [profileData, setProfileData] = useState({
        id: user.id,
        username: user.login || '',
        fullName: user.fullName || '',
        email: user.email || '',
    });
    const [formData, setFormData] = useState(new FormData());
    const [avatar, setAvatar] = useState(user.profilePicture || '');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);

    function compressImage(file, callback) {
        new Compressor(file, {
            quality: 0.6, // Сжатие качества от 0 до 1
            maxWidth: 800, // Максимальная ширина изображения
            maxHeight: 800, // Максимальная высота изображения
            success(compressedImage) {
                callback(compressedImage);
            },
            error(err) {
                console.error('Ошибка при сжатии изображения:', err.message);
            },
        });
    }

    // Обновление состояния при изменении данных пользователя
    useEffect(() => {
        setProfileData({
            id: user.id,
            login: user.login || '',
            fullName: user.fullName || '',
            email: user.email || '',
        });
        setAvatar(user.profilePicture || '');
    }, [user]);

    const handleAvatarSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedAvatar(file);
            setIsAvatarChanged(true);
            setAvatar(URL.createObjectURL(file));
        }
    };

    const handleChange = (event) => {
        setProfileData({ ...profileData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedProfileData = {
            ...profileData,
            id: user.id, // Убедитесь, что id передается в updatedProfileData
        };

        try {
            if (isAvatarChanged && selectedAvatar) {
                compressImage(selectedAvatar, (compressedImage) => {
                    const formData = new FormData();
                    formData.append('userId', user.id);
                    formData.append('avatar', compressedImage, compressedImage.name);
                    dispatch(updateAvatar({ formData: formData }));
                });
            }
            // Отправляем изменения профиля на сервер и обновляем Redux Store

            dispatch(updateProfile({ profileData: updatedProfileData }))
                .then(() => {
                    // Перенаправление на страницу профиля пользователя
                    navigate(`/profile`);
                })
                .catch(error => console.error('Ошибка при обновлении профиля:', error));
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Slidebar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 z-10">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 justify-center flex z-10">
                            <Avatar
                                src={avatar}
                                alt="Profile"
                                withBorder={true}
                                className="w-32 h-32 p-1 rounded-full relative"
                                onClick={() => document.getElementById('avatarInput').click()}
                            />

                            <input
                                id="avatarInput"
                                type="file"
                                hidden
                                onChange={handleAvatarSelect}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                                Nickname
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={profileData.fullName}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 w-full text-center font-semibold text-white py-2 px-4 rounded-full"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

