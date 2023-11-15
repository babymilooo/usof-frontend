import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { privateRoutes, publicRoutes } from '../router/router';

const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isLoggedIn);

    console.log("Is Authenticated:", isAuth);
    return (
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
    );
};

export default AppRouter;
