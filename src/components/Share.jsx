import React from 'react';
import ShareIMG from '../assets/ico/share.svg';

const Share = () => {
    return (
        <button className="flex items-center hover:bg-gray-100 rounded p-1">
            <img src={ShareIMG} alt="Like button" className=" p-1  w-[24px]" />
            <div className="text-[10px]">Share</div>
        </button>
    );
};

export default Share;
