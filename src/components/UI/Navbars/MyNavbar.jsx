import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from "@material-tailwind/react";
import { toggleSidebar } from '../../../store/Slidebar';
import { ArrowLeftIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from "@heroicons/react/24/outline";
import { NewspaperIcon } from '@heroicons/react/24/outline';
import Logo from "../../Images/icons8-pandora-app.svg";

const Navbar = () => {
    const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div className="bg-white pt-4 pb-4 fixed top-0 left-0 w-full shadow-md z-20">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center text-2xl font-bold">
                    <Link to="/posts" className="flex items-center">
                        <img src={Logo} alt="logo" id="logo" className="inline" />
                        <span>Posters</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/createPost">
                        <PlusCircleIcon className="h-8 w-8 transition-transform hover:rotate-180" />
                    </Link>
                    <Link className="text-black hover:text-black" to="/about">
                        <NewspaperIcon className='h-8 w-8' />
                    </Link>
                    <Link className="text-black hover:text-black font-bold hover:underline" to="/posts">
                        <HomeIcon className='h-8 w-8' />
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer hover:underline">

                        <Avatar
                            src={user.profilePicture}
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