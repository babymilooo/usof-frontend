import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { privateRoutes, publicRoutes } from '../router/router';
import Navbar from './UI/Navbars/MyNavbar';

const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isLoggedIn);

    console.log("Is Authenticated:", isAuth);
    return (
        <div className='bg-#607d8b'>
            <Routes>
                {isAuth ? (
                    privateRoutes.map(({ path, component }) =>
                        <Route key={path} path={path} element={React.createElement(component)} />
                    )
                ) : (
                    publicRoutes.map(({ path, component }) =>
                        <Route key={path} path={path} element={React.createElement(component)} />
                    )
                )}
                <Route path="*" element={<Navigate to={isAuth ? "/posts" : "/login"} />} />
            </Routes>
        </div>
    );
};

export default AppRouter;
