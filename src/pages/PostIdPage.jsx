import React, { useEffect, useState } from 'react';
import Navbar from '../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import PostService from './../services/PostService';
import { Avatar, Button } from '@material-tailwind/react';
import { stateToHTML } from 'draft-js-export-html';
import { CompositeDecorator, ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import ShareIcon from '../components/Images/share.svg';
import DraftTextArea from '../components/UI/TextArea/DraftTextArea';
import linkDecorator from '../utils/linkDecorator';
import CommentService from '../services/CommentService';
import Comment from '../components/UI/CommentBlock/Comment';
import UserService from '../services/UserService';
import RateButtons from './../components/UI/RateButtons/RateButtons';
const PostIdPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorPost, setErrorPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(linkDecorator)
    );
    const clearEditorState = EditorState.push(editorState, ContentState.createFromText(''));
    const user = useSelector(state => state.user);

    useEffect(() => {
        const fetchPostAndLikes = async () => {
            setLoading(true);
            try {
                // Fetch post data
                const response = await PostService.getPost(id);
                const postData = response.data || {}; // Fallback to an empty object if data is undefined

                // Fetch likes and dislikes
                const [likesResponse, dislikesResponse] = await Promise.all([
                    PostService.getAllLikesForPost(id),
                    PostService.getAllDisLikesForPost(id),
                ]);

                console.log(dislikesResponse)
                const reactionData = {
                    likesCount: likesResponse.data?.length || 0,
                    dislikesCount: dislikesResponse.data?.length || 0,
                    likesData: likesResponse.data || [],
                    dislikesData: dislikesResponse.data || [],
                };

                // Fetch comments and enhance them with likes data and user details
                const commentsResponse = await PostService.getAllCommentsForPost(id);
                let comments = commentsResponse.data || []; // Fallback to an empty array if data is undefined

                comments = await Promise.all(comments.map(async (comment) => {
                    // Safeguard against undefined data
                    const commentLikesData = comment.likesData || [];
                    const userResponse = await UserService.getUser(comment.author);
                    const user = userResponse.data || {};

                    return {
                        ...comment,
                        likesData: commentLikesData,
                        likesCount: commentLikesData.length,
                        userData: user,
                    };
                }));

                // Update state with fetched data
                setPost({ ...postData, reactionData });
                setComments(comments);
            } catch (err) {
                setErrorPost(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndLikes();
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (errorPost) return <div>Ошибка: {errorPost.message}</div>;
    if (!post) return <div>Пост не найден.</div>;

    console.log(post);
    let htmlContent;
    try {
        // Make sure you have a valid structure or catch the error
        const contentState = convertFromRaw(JSON.parse(post.content));
        htmlContent = stateToHTML(contentState);
    } catch (error) {
        console.error('Error converting DraftJS content:', error);
        htmlContent = '<p>Error rendering post content.</p>';
    }

    const handleSubmit = async () => {
        // Convert editorState to raw JS object
        const contentRaw = convertToRaw(editorState.getCurrentContent());

        // Optionally, convert it to JSON if your server expects a JSON string
        const contentJSON = JSON.stringify(contentRaw);

        console.log(contentJSON);
        try {
            const response = await CommentService.createComment(contentJSON, id);
            console.log(response);
            if (response.status === 200) {
                const newCommentData = response.data;

                // Add user data to the new comment (you might need to fetch it or have it locally)
                const userResponse = await UserService.getUser(newCommentData.author);
                const userData = userResponse.data?.user || null;

                const newComment = { ...newCommentData, likesCount: 0, userData };

                // Update comments state with the new comment
                setComments(prevComments => [newComment, ...prevComments]);
                setEditorState(clearEditorState);
            }
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Slidebar />
            <div className="flex m-24 justify-center">
                <div className="flex bg-white w-3/4 min-h-[500px] rounded-lg shadow-lg mr-4">
                    <div className="flex flex-col items-center bg-gray-100 rounded-l-lg p-2">
                        <RateButtons entity={post} entityType="post" />
                    </div>
                    <div className="flex flex-1 flex-col ml-4 mr-4F">
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
                                            <span className="inline-block text-gray-600 text-xs font-semibold px-0.5 py-0.5 hover:underline cursor-pointer" title={category.description}>
                                                {category.title}
                                            </span>
                                        </div>

                                    ))}
                                </div>
                                {/* <div className="flex justify-end mr-14">
                                    <p className="text-gray-500 text-sm">{new Date(post.publish_date).toLocaleDateString()}</p>
                                </div> */}
                            </div>
                        </div>
                        <div className="pb-4 flex flex-col">
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="link-styling post"></div>

                            <div className="flex items-center mt-2">
                                <span className="text-sm font-semibold">{comments.length} Comments</span>
                                <img src={ShareIcon} alt="Share" className="inline-block cursor-pointer h-8 ml-2" />
                            </div>
                            <div className="mr-14 border border-1 border-gray-400 rounded">
                                <DraftTextArea
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    onSubmit={handleSubmit} // Pass handleSubmit as a prop if your DraftTextArea expects it
                                />
                                <div className="w-full flex justify-end pr-2 mb-2">
                                    <button
                                        onClick={handleSubmit} // Attach handleSubmit to the onClick event
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Вывод комментариев */}
                        <div className="flex-1 overflow-auto pr-2 mb-4">
                            {comments.length > 0 ? (
                                comments.map(comment => (
                                    <Comment key={comment.id} comment={comment} />
                                ))
                            ) : (
                                <div className="text-gray-500 flex items-center justify-center">No comments</div> // Style as needed
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PostIdPage;