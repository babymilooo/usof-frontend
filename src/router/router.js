import About from "../pages/About";
import CheckEmail from "../pages/CheckEmail";
import CreatePost from "../pages/CreatePost";
import EditProfile from "../pages/EditProfile";
import Errors from "../pages/Errors";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Profile from "../pages/Profile";
import RefreshPassword from "../pages/RefreshPassword";
import Register from "../pages/Register";
import forgetPassword from "../pages/forgetPassword";

export const privateRoutes = [
    { path: '/about', component: About, exact: true },
    { path: '/posts', component: Posts, exact: true },
    { path: '/posts/:id', component: PostIdPage, exact: true },
    { path: '/error', component: Errors, exact: true },
    { path: '/profile', component: Profile, exact: true },
    { path: '/profile/editProfile', component: EditProfile, exact: true },
    { path: '/createPost', component: CreatePost, exact: true }
]

export const publicRoutes = [
    { path: '/login', component: Login, exact: true },
    { path: '/registration', component: Register, exact: true },
    { path: '/forgotPassword', component: forgetPassword, exact: true },
    { path: '/checkEmail', component: CheckEmail, exact: true },
    { path: '/password-reset/:token', component: RefreshPassword, exact: true }
]