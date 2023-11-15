import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/logoutUser';

const Posts = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default Posts;