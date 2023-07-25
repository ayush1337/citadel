import React from 'react';
import CommentIMG from '../assets/ico/comment.svg';

const Comment = ({ comments }) => {
    return (
        <button className="flex items-center hover:bg-gray-100 rounded p-1">
            <img
                src={CommentIMG}
                alt="Comment button"
                className=" p-1  w-[24px]"
            />
            <div className="text-[10px]">{comments}</div>
        </button>
    );
};

export default Comment;
