import React, { useState, useCallback, useEffect } from 'react';
import PostService from '../../../services/PostService';
import CommentService from '../../../services/CommentService';
import { useSelector } from 'react-redux';
import upvote from '../../Images/upvote-svgrepo-com.svg'
import downvote from '../../Images/downvote-svgrepo-com.svg'
import like from '../../Images/like-svgrepo-com.svg'
import clicked from '../../Images/like-clicked-svgrepo-com.svg'
const LikeButton = ({ entity, entityType }) => {
    const [reactionCount, setReactionCount] = useState(entity.likesCount - entity.dislikesCount);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);

    const user = useSelector(state => state.user);

    useEffect(() => {
        // Initialize like/dislike status from reactionData
        const userLike = entity.reactionData.likesData.some(
            (reaction) => reaction.author_id === user.id && reaction.type === 'like'
        );
        setHasLiked(userLike);

        const userDislike = entity.reactionData.dislikesData.some(
            (reaction) => reaction.author_id === user.id && reaction.type === 'dislike'
        );
        setHasDisliked(userDislike);

        // Calculate and set the reaction count based on the reactionData
        const likes = entity.reactionData.likesData.filter((reaction) => reaction.type === 'like').length;
        const dislikes = entity.reactionData.dislikesData.filter((reaction) => reaction.type === 'dislike').length;
        setReactionCount(likes - dislikes);
    }, [user.id, entity.reactionData]);

    const handleLike = useCallback(async () => {
        try {
            if (!hasLiked) {
                setReactionCount((count) => count + 1);
                // If the user had disliked before, undo the dislike
                if (hasDisliked) {
                    // API call to remove dislike
                    await (entityType === 'post' ? PostService.unDisLikePost(entity.id) : CommentService.removeDislike(entity.id));
                }
                // API call to add like
                await (entityType === 'post' ? PostService.likePost(entity.id) : CommentService.likeComment(entity.id));
                setHasLiked(true);
                setHasDisliked(false);
            } else {
                // API call to remove like if already liked
                setReactionCount((count) => count - 1);
                await (entityType === 'post' ? PostService.unLikePost(entity.id) : CommentService.removeLike(entity.id));
                setHasLiked(false);
            }
        } catch (error) {
            console.error('Error handling like for the', entityType, error);
            // Rollback optimistic UI update if API call fails
            setReactionCount((count) => hasLiked ? count - 1 : count);
            setHasLiked(hasLiked);
        }
    }, [entity, entityType, hasLiked, hasDisliked, user.id]);

    const handleDislike = useCallback(async () => {
        try {
            if (!hasDisliked) {
                setReactionCount((count) => count - 1);
                // If the user had liked before, undo the like
                if (hasLiked) {
                    // API call to remove like
                    await (entityType === 'post' ? PostService.unLikePost(entity.id) : CommentService.removeLike(entity.id));
                }
                // API call to add dislike
                await (entityType === 'post' ? PostService.disLikePost(entity.id) : CommentService.dislikeComment(entity.id));
                setHasDisliked(true);
                setHasLiked(false);
            } else {
                // API call to remove dislike if already disliked
                setReactionCount((count) => count + 1);
                await (entityType === 'post' ? PostService.unDisLikePost(entity.id) : CommentService.removeDislike(entity.id));
                setHasDisliked(false);
            }
        } catch (error) {
            console.error('Error handling dislike for the', entityType, error);
            // Rollback optimistic UI update if API call fails
            setReactionCount((count) => hasDisliked ? count + 1 : count);
            setHasDisliked(hasDisliked);
        }
    }, [entity, entityType, hasLiked, hasDisliked, user.id]);

    return (
        <div className="flex flex-col items-center">
            <img
                src={hasLiked ? clicked : like}
                alt={hasLiked ? 'Unlike' : 'Like'}
                onClick={handleLike}
                className={`w-6 h-6 cursor-pointer ${hasLiked ? 'text-orange-500' : 'text-gray-400'}`}
            />
            <p className=" font-bold text-lg">
                {reactionCount}
            </p>
            <img
                src={hasDisliked ? clicked : like}
                alt={hasDisliked ? 'Undislike' : 'Dislike'}
                onClick={handleDislike}
                className={`w-6 h-6 cursor-pointer rotate-180 ${hasDisliked ? 'filter' : ''}`}
            />
        </div>
    );
};

export default LikeButton;
