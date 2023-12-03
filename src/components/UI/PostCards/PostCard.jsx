import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="border border-gray-300 rounded shadow p-4">
            <div className="flex space-x-2 items-center">
                {/* Voting buttons */}
                <button className="text-gray-500 hover:text-gray-700">↑</button>
                <span>{post.upvotes}</span>
                <button className="text-gray-500 hover:text-gray-700">↓</button>
            </div>
            <div className="mt-2">
                {/* Post title */}
                <h5 className="text-lg font-semibold">{post.title}</h5>
                {/* Post metadata */}
                <p className="text-sm text-gray-600">{post.user} - {post.timePosted}</p>
                {/* Comments */}
                <p className="text-sm text-blue-600">{post.comments} comments</p>
            </div>
        </div>
    );
};

export default PostCard;
