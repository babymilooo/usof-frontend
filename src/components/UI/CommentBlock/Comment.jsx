import { Avatar } from '@material-tailwind/react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import React from 'react';
import moment from 'moment';
const Comment = ({ comment }) => {

    let htmlContent;
    const timeAgo = moment(comment.publish_date).fromNow();

    console.log(comment);
    try {
        const rawContent = JSON.parse(comment.content);

        const contentState = convertFromRaw(rawContent);
        htmlContent = stateToHTML(contentState);

    } catch (error) {
        htmlContent = '<p>Error rendering post content.</p>';
    }

    return (
        <div className="p-2">
            <div className="flex items-center w-full mb-2 mt-4">
                <div className="mr-2 flex items-center">
                    {/* Displaying the author's login of the post */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2">
                        <Avatar
                            src={comment.userData.profilePicture}
                            alt="avatar"
                            withBorder={true}
                            className="p-0.5 w-full h-full object-cover z-0"
                        />
                    </div>
                    <p className="font-bold">{comment.userData.fullName}</p>
                    <div className="text-gray-500 text-sm ml-2">{timeAgo}</div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="link-styling post"></div>
            {/* Здесь можно добавить кнопку лайка или другие действия для комментария */}
        </div>
    );
};

export default Comment;