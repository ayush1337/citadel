import React from 'react';
import ProfilePic from './ProfilePic';
import ImgUpload from '../assets/ico/imgupload.svg';
import LinkIcon from '../assets/ico/link.svg';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function CreatePost() {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <>
            {userInfo?._id && (
                <div className="w-full h-24 bg-white drop-shadow flex items-center justify-between p-4 gap-2 sm:gap-4">
                    <button>
                        <ProfilePic img_url={userInfo.avatar} />
                    </button>
                    <form className="sm:flex-grow">
                        <input
                            type="text"
                            placeholder="Create Post"
                            className="placeholder:font-medium
                placeholder:text-xs focus:outline-none bg-gray-100 px-1 py-1 sm:p-4 rounded hover:bg-gray-50 hover:outline hover:outline-sky-400 hover:outline-1 w-full"
                            onFocus={() => {
                                navigate('/submit');
                            }}
                        />
                    </form>
                    <Link
                        to="/submit"
                        className="w-[35px] sm:w-10 hover:bg-gray-100 rounded p-2"
                    >
                        <img src={ImgUpload} className="w-ful opacity-50" />
                    </Link>
                    <Link
                        to="/submit"
                        className="w-[35px] sm:w-10 hover:bg-gray-100 rounded p-2"
                    >
                        <img src={LinkIcon} className="w-full opacity-50" />
                    </Link>
                </div>
            )}
        </>
    );
}

export default CreatePost;
