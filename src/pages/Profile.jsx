import React, { useEffect, useState } from 'react';
import Navbar from '../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import SendAvatar from './../components/UI/SendButtons/SendAvatar';
import { useSelector } from 'react-redux';
import { Avatar, Button, ButtonGroup } from '@material-tailwind/react';
import FileService from '../services/FileService';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import PostService from '../services/PostService';

const Profile = () => {
    const user = useSelector(state => state.user);

    const [activeTab, setActiveTab] = useState('posts'); // предполагая, что это управляется где-то в компоненте
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorPost, setErrorPost] = useState(null);
    const [errorComent, setErrorComment] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        const fetchPostsAndLikes = async () => {
            setLoading(true);
            try {
                const response = await UserService.getAllPostOfUser(user.id);
                const postsData = response;
                setLoading(false);

                const postsWithLikesPromises = postsData.map(async post => {
                    const likesResponse = await PostService.getAllLikesForPost(post.id);
                    const likesCount = likesResponse.data?.length || 0;

                    return { ...post, likesCount };
                });

                const postsWithLikes = await Promise.all(postsWithLikesPromises);
                setPosts(postsWithLikes);
            } catch (err) {
                setErrorPost(err);
                setLoading(false);
            }
        }

        const fetchCommentsAndLikes = async () => {
            setLoading(true);
            try {
                const response = await UserService.getAllCommentsOfUser(user.id);
                const commentData = response;
                if (commentData === null) {
                    setComments([]);
                    setLoading(false);
                    return;
                }

                setLoading(false);

                const commentWithLikesPromises = commentData.map(async comment => {
                    const likesResponse = await PostService.getAllLikesForPost(comment.id);
                    const likesCount = likesResponse.data?.length || 0;
                    return { ...comment, likesCount };
                });

                const commentWithLikes = await Promise.all(commentWithLikesPromises);
                setComments(commentWithLikes);
            } catch (error) {
                setErrorComment(error);
                setLoading(false);
            }
        }
        fetchPostsAndLikes();
        fetchCommentsAndLikes();

    }, [user.id]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const Posts = () => {
        if (loading) return <div>Загрузка...</div>;
        if (errorPost) return <div>Ошибка: {errorPost.message}</div>;
        if (!posts || posts.length === 0) return <div>Посты не найдены.</div>;
        return posts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 mb-4 pb-4">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-500">Статус: {post.status}</p>
                <div className="flex justify-between">
                    <p className="text-gray-500">Лайков: {post.likesCount}</p> {/* Добавьте это */}
                    <p className="text-gray-600">{new Date(post.publish_date).toLocaleDateString()}</p>
                </div>
                {/* Остальные данные поста, если нужно */}
            </div>
        ));
    };


    const Comments = () => {
        if (loading) return <div>Загрузка...</div>;
        if (errorComent) return <div>Ошибка: {errorComent.message}</div>;
        if (!comments || comments.length === 0) return <div>Comments не найдены.</div>;
        return comments.map((post) => (
            <div key={post.id} className="border-b border-gray-200 mb-4 pb-4">
            </div>
        ));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'posts':
                return <div className="bg-white p-4 rounded-lg shadow-md mt-4">{Posts()}</div>;
            case 'comments':
                return <div className="bg-white p-4 rounded-lg shadow-md mt-4">{Comments()}</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <Navbar />
            <Slidebar />
            <div className="container mx-auto mt-24 p-4 flex">
                <div className="w-1/4 bg-white p-4 rounded-lg shadow-md h-96 max-h-96">
                    {/* Аватар и кнопка создания */}
                    <div className="mb-4 p-4 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-300 rounded-full">
                            <Avatar
                                src={user.profilePicture}
                                alt="avatar"
                                withBorder={true}
                                className="p-0.5 w-full h-full object-cover z-0"
                            />
                        </div>
                        <h1 className="mt-3 text-2xl">{user.login}</h1>
                        <p>{user.fullName}</p>
                        <div className="mt-3 w-full text-center ">
                            <Link to="/profile/editProfile">
                                <button className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700 w-full text-center font-semibold text-white py-2 px-4 rounded-full">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Информация о пользователе */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">Role</span>
                            <span>{user.role}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold">Rating</span>
                            <span>{user.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Основное содержимое */}
                <div className="flex-1 ml-4">
                    <div className="flex w-max flex-col gap-4 shadow-md">
                        <ButtonGroup color='white'>
                            <Button onClick={() => handleTabChange('posts')}>posts</Button>
                            <Button onClick={() => handleTabChange('comments')}>comments</Button>
                        </ButtonGroup>
                    </div>
                    {/* <h1 className="font-semibold text-xl mb-4">Posts</h1> */}
                    {/* Посты пользователя */}
                    <div>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;