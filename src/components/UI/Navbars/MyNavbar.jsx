import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/logoutUser';
import MySearchbar from '../Searchbar/MySearchbar';
import { Avatar, Typography } from "@material-tailwind/react";
import LogoutIcon from "../../Images/logout-svgrepo-com.svg";
import { Button } from "@material-tailwind/react";
import Slidebar from '../MySlidebars/Slidebar';
import { toggleSidebar } from '../../../store/Slidebar';

import { ArrowLeftIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { IconButton } from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { NewspaperIcon } from '@heroicons/react/24/outline';
const Navbar = () => {
    const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);
    const [post, setPost] = useState('');
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="bg-white pt-4 pb-4 fixed top-0 left-0 w-full border-b-2 border-gray-400">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold">Logo</div>
                <div className="flex items-center space-x-4">
                    <Link>
                        <PlusCircleIcon className='h-8 w-8' />
                    </Link>
                    <Link className="text-black hover:text-black" to="/about">
                        <NewspaperIcon className='h-8 w-8' />
                    </Link>
                    <Link className="text-black hover:text-black font-bold hover:underline" to="/posts">
                        <HomeIcon className='h-8 w-8' />
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer hover:underline">

                        <Avatar
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            alt="avatar"
                            withBorder={true}
                            className="p-0.5"
                        />
                    </Link>
                    <button onClick={() => dispatch(toggleSidebar())}>
                        <ArrowLeftIcon className={`h-5 w-5 transition-transform ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;