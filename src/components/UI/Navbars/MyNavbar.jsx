import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './MyNavbar.module.css'
import { logoutUser } from '../../../store/logoutUser';
import MySearchbar from '../Searchbar/MySearchbar';
const Navbar = () => {
    const [post, setPost] = useState('');
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className={classes.navbar}>
            <div className={classes.navbar__links}>
                <MySearchbar>search</MySearchbar>
                <Link className={classes.transparentLink} to="/about">
                    ABOUT
                </Link>
                <Link className={classes.transparentLink} to="/posts">
                    POSTS
                </Link>
                <Link className={classes.transparentLink} to="/profile">
                    PROFILE
                </Link>
                <span onClick={handleLogout} className={classes.transparentLink}>
                    LOGOUT
                </span>

            </div>
        </div>
    );
};

export default Navbar;