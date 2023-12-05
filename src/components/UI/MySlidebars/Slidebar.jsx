import React, { useState } from 'react';
import LogoutIcon from "../../Images/logout-svgrepo-com.svg";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/logoutUser';
import { toggleSidebar } from '../../../store/Slidebar';
import { Link } from 'react-router-dom';
import { Avatar, Switch, Typography } from '@material-tailwind/react';

const Slidebar = () => {

    const user = useSelector(state => state.user);
    const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);
    const [isOnline, setIsOnline] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handleToggle = () => {
        dispatch(toggleSidebar());
    };


    const handleOnline = () => {
        setIsOnline(!isOnline);
    };
    return (
        <>
            {isSidebarOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 ${isSidebarOpen ? 'z-40' : 'z-20'}`}
                    onClick={() => dispatch(toggleSidebar())}
                ></div >
            )}

            <div
                className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}  z-30`}
                style={{ zIndex: isSidebarOpen ? 50 : 20 }}
            >
                <nav>
                    <ul className="text-gray-700 px-4 py-4">
                        <li className="hover:bg-gray-200">
                            <Link to="/profile" className="flex items-center gap-2 cursor-pointer hover:underline">

                                <Avatar
                                    src={user.profilePicture}
                                    alt="avatar"
                                    withBorder={true}
                                    className="p-0.5"
                                />
                                <div>
                                    <p className="text-black font-bold">{user.login}</p>
                                </div>

                            </Link>
                        </li>
                        <li className="pt-4 hover:bg-gray-200">
                            <Switch
                                id="custom-switch-component"
                                ripple={false}
                                checked={isOnline}
                                onChange={handleOnline}
                                className="h-full w-full checked:bg-[#2ec946] bg-red-700"
                                containerProps={{
                                    className: "w-11 h-6",
                                }}
                                circleProps={{
                                    className: "before:hidden left-0.5 border-none ",
                                }}
                                label={
                                    <Typography>
                                        {isOnline ? 'online' : 'offline'}
                                    </Typography>
                                }
                            />
                        </li>
                        <li className="pt-4 hover:underline">About</li>
                        <li className="pt-4 hover:underline">Services</li>
                        <li className="pt-4 hover:underline">Contact</li>
                        <li className='pt-4'>
                            <span onClick={handleLogout} className="text-black font-bold hover:underline cursor-pointer">
                                <img src={LogoutIcon} alt="Logout" className="w-6 h-6" />
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Slidebar;