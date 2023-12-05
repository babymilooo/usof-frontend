import React, { useEffect, useState } from 'react';
import Navbar from './../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import { Avatar, Button, ButtonGroup, Input, Option, Select } from '@material-tailwind/react';
import UserService from '../services/UserService';
import PostService from '../services/PostService';
import { DrawerPlacement } from './../components/UI/Drawer/Drawer';
import { useSelector } from 'react-redux';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem } from '@material-tailwind/react';
import RateButtons from './../components/UI/RateButtons/RateButtons';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorPost, setErrorPost] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [query, setQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortPeriod, setSortPeriod] = useState('week');
    const user = useSelector(state => state.user);

    useEffect(() => {
        const fetchPostsAndLikes = async () => {
            setLoading(true);
            try {
                const response = await PostService.getAllPost();
                const postsData = response;
                setLoading(false);

                const postsWithLikesPromises = postsData.map(async post => {
                    const [likesResponse, dislikesResponse] = await Promise.all([
                        PostService.getAllLikesForPost(post.id),
                        PostService.getAllDisLikesForPost(post.id),
                    ]);

                    const reactionData = {
                        likesCount: likesResponse.data?.length || 0,
                        dislikesCount: dislikesResponse.data?.length || 0,
                        likesData: likesResponse.data || [],
                        dislikesData: dislikesResponse.data || [],
                    };

                    return { ...post, reactionData };
                });

                const postsWithLikes = await Promise.all(postsWithLikesPromises);

                setPosts(postsWithLikes);
                setFilteredPosts(sort(postsWithLikes));
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

    const sortByDate = () => {
        const sortedPosts = [...posts].sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
        setFilteredPosts(sortedPosts);
    };

    const sort = (postsArray) => {
        if (!Array.isArray(postsArray)) {
            console.error('sortByDate: provided argument is not an array', postsArray);
            return [];
        }

        return [...postsArray].sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
    };

    const sortByLikes = () => {
        const sortedPosts = [...posts].sort((a, b) => b.reactionData.likesCount - a.reactionData.likesCount);
        setFilteredPosts(sortedPosts);
    };

    const getFilteredTimePeriod = (timePeriod) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Убираем время, оставляем только дату.

        switch (timePeriod) {
            case 'day':
                return new Date(now.setDate(now.getDate() - 1));
            case 'week':
                return new Date(now.setDate(now.getDate() - 7));
            case 'month':
                return new Date(now.setMonth(now.getMonth() - 1));
            case 'year':
                return new Date(now.setFullYear(now.getFullYear() - 1));
            default:
                return now; // Если 'all', то возвращаем текущую дату.
        }
    };

    const sortByTop = (timePeriod) => {
        const timeLimit = getFilteredTimePeriod(timePeriod);

        const filteredByTime = posts.filter((post) => {
            const postDate = new Date(post.publish_date);
            return timePeriod === 'all' ? true : postDate >= timeLimit;
        });

        const sortedByLikes = filteredByTime.sort((a, b) => b.likesCount - a.likesCount);
        setFilteredPosts(sortedByLikes);
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

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const [selectedTimePeriod, setSelectedTimePeriod] = useState('week');

    const handleTimePeriodChange = (value) => {
        setSelectedTimePeriod(value);
        sortByTop(value);
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
                <div className="min-h-[150px] max-h-[500px] bg-white w-full lg:w-3/4 xl:w-1/2 rounded-lg shadow-lg flex border border-transparent hover:border-black cursor-pointer sm:text-lg md:text-xl xl:text-base">
                    {/* <div key={post.id} className="min-h-[100px] max-h-[500px] bg-white w-full md:w-2/4 rounded-lg shadow-lg flex border border-transparent hover:border-black cursor-pointer"> */}
                    <div className="flex flex-col items-center bg-gray-100 rounded-l-lg p-2">
                        <RateButtons entity={post} entityType="post" />
                    </div>

                    <Link to={`/posts/${post.id}`} key={post.id} className="relative flex-1 flex-col ml-4 mr-4 overflow-hidden">
                        <div className="flex items-center w-full mb-2 mt-4">
                            <div className="mr-2 flex items-center">
                                {/* Displaying the author's login of the post */}
                                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2">
                                    <Avatar
                                        src={post.postAuthorData.profilePicture}
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
                            <h1 className="font-bold text-2xl">{post.title}</h1>
                            <div className="prose lg:prose-xl mx-auto relative overflow-hidden">
                                <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="link-styling post"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
                    </Link>
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
                <div className="bg-white w-full lg:w-3/4 xl:w-1/2 p-2 rounded-lg shadow-lg">
                    <div className="relative flex w-full gap-2">
                        <Input
                            type="search"
                            value={query}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            color="black"
                            label="Type here..."
                            className="pr-24 w-full"
                            containerProps={{
                                className: "w-full",
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
                <div className="w-full lg:w-3/4 xl:w-1/2 p-2 flex items-center">
                    <ButtonGroup color="white" className="shadow-lg">
                        <Button onClick={sortByDate}>New</Button>
                        <Button onClick={sortByLikes}>Best</Button>
                        <Button onClick={toggleDropdown}>Top</Button>
                    </ButtonGroup>

                    {/* Используем flex для выравнивания выпадающего списка с кнопками */}
                    <div className={`ml-2 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                        <Select label="Top" value={selectedTimePeriod} onChange={(value) => handleTimePeriodChange(value)}>
                            <Option value="day">Today</Option>
                            <Option value="week">This Week</Option>
                            <Option value="month">This Month</Option>
                            <Option value="year">This Year</Option>
                            <Option value="all">All Time</Option>
                        </Select>
                    </div>
                </div>




                <PostContent posts={filteredPosts} />

            </div>
        </div>
    );
};

export default Posts;