import About from "../pages/About";
import Errors from "../pages/Errors";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Register from "../pages/Register";

export const privateRoutes = [
    { path: '/about', component: About, exact: true },
    { path: '/posts', component: Posts, exact: true },
    { path: '/posts/:id', component: PostIdPage, exact: true },
    { path: '/error', component: Errors, exact: true },
]

export const publicRoutes = [
    { path: '/login', component: Login, exact: true },
    { path: '/registration', component: Register, exact: true }
]