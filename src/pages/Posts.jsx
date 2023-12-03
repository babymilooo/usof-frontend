import React, { useEffect, useState } from 'react';
import Navbar from './../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import { Avatar, Button, ButtonGroup, Input } from '@material-tailwind/react';
import UserService from '../services/UserService';
import PostService from '../services/PostService';
import { DrawerPlacement } from './../components/UI/Drawer/Drawer';
import { useSelector } from 'react-redux';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
const Posts = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorPost, setErrorPost] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [query, setQuery] = useState('');

    const user = useSelector(state => state.user);

    useEffect(() => {
        const fetchPostsAndLikes = async () => {
            setLoading(true);
            try {
                const response = await UserService.getAllPost();
                const postsData = response;
                setLoading(false);

                const postsWithLikesPromises = postsData.map(async post => {
                    const likesResponse = await PostService.getAllLikesForPost(post.id);
                    const likesCount = likesResponse.data?.length || 0;

                    return { ...post, likesCount };
                });

                const postsWithLikes = await Promise.all(postsWithLikesPromises);
                setPosts(postsWithLikes);
                setFilteredPosts(postsWithLikes);
            } catch (err) {
                setErrorPost(err);
                setLoading(false);
            }
        }
        fetchPostsAndLikes();
    }, [user.id]);

    const handleSearch = () => {
        const filtered = query
            ? posts.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.content.toLowerCase().includes(query.toLowerCase())
            )
            : posts;
        setFilteredPosts(filtered);
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    // Обработчик для нажатия клавиши Enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const PostContent = ({ posts }) => {
        if (loading) return <div>Загрузка...</div>;
        if (errorPost) return <div>Ошибка: {errorPost.message}</div>;
        if (!posts || posts.length === 0) return <div>Посты не найдены.</div>;


        return posts.map((post) => {
            // Конвертация JSON из Draft.js в объект состояния редактора
            let htmlContent;
            try {
                // Make sure you have a valid structure or catch the error
                const contentState = convertFromRaw(JSON.parse(post.content));
                htmlContent = stateToHTML(contentState);
            } catch (error) {
                console.error('Error converting DraftJS content:', error);
                htmlContent = '<p>Error rendering post content.</p>';
            }

            return (
                <div key={post.id} className="min-h-[100px] max-h-[500px] bg-white w-full md:w-2/4 rounded-lg shadow-lg flex border border-transparent hover:border-black cursor-pointer">
                    <div className="flex flex-col items-center bg-gray-100 rounded-l-lg p-2">
                        {/* Assuming there's an upvote button */}
                        <button className="hover:bg-blue-gray-100 p-2">
                            {/* Placeholder for upvote icon */}
                            ↑
                        </button>
                        {/* Placeholder for vote count */}
                        <span className="block text-center">{post.likesCount}</span>
                        {/* Assuming there's a downvote button */}
                        <button className="hover:bg-blue-gray-100 p-2">
                            {/* Placeholder for downvote icon */}
                            ↓
                        </button>
                    </div>

                    <div className="relative flex-1 flex-col ml-4 mr-4 overflow-hidden">
                        <div className="flex items-center w-full mb-2 mt-4">
                            <div className="mr-2 flex items-center">
                                {/* Displaying the author's login of the post */}
                                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2">
                                    <Avatar
                                        src={user.profilePicture}
                                        alt="avatar"
                                        withBorder={true}
                                        className="p-0.5 w-full h-full object-cover z-0"
                                    />
                                </div>
                                <p className="font-bold">{post.postAuthorData.fullName}</p>
                            </div>
                            <div className="flex items w-full justify-between">
                                <div className="flex">
                                    {post.postsCategories && post.postsCategories.map((category) => (
                                        <div key={category.id} className="flex items-center mr-1">
                                            <span className="text-gray-800 font-bold">#{' '}</span>
                                            <span className="inline-block text-gray-600 text-xs font-semibold px-0.5 py-0.5 hover:underline" title={category.description}>
                                                {category.title}
                                            </span>
                                        </div>

                                    ))}
                                </div>
                                <div className="flex justify-end">
                                    <p className="text-gray-500 text-sm">{new Date(post.publish_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="pb-4 relative">
                            <h2 className="font-bold">{post.title}</h2>
                            <div className="prose lg:prose-xl mx-auto relative overflow-hidden">
                                <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="overflow-y-hidden overflow-x-hidden">
            <Navbar />
            <Slidebar />
            {/* <DrawerPlacement /> */}
            <div className="mx-auto mt-24 p-4 flex flex-col justify-center items-center gap-4 ">
                <div className="bg-white w-2/4 p-2 rounded-lg shadow-lg">
                    <div className="relative flex w-full gap-2">
                        <Input
                            type="search"
                            value={query}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            color="black"
                            label="Type here..."
                            className=" pr-24"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                        />
                        <Button
                            size="sm"
                            color="black"
                            className="!absolute right-1 top-1 rounded"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>
                <div className="w-2/4 p-2">
                    <div className="relative flex w-full gap-2 justify-center">
                        <ButtonGroup color="white" className="shadow-lg">
                            <Button>New</Button>
                            <Button>best</Button>
                            <Button>top</Button>
                        </ButtonGroup>
                    </div>
                </div>
                
                <PostContent posts={filteredPosts} />



            </div>
        </div>
    );
};

export default Posts;