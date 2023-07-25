import React, { useEffect, useState } from 'react';
import VoteOutline from '../assets/ico/vote-outline.svg';
import VoteBlue from '../assets/ico/voteBlue.svg';
import Vote from '../assets/ico/vote.svg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import axios from 'axios';

const Like = ({ likes, disLikes, postId }) => {
    const [likeToggle, setLikeToggle] = useState(false);
    const [dislikeToggle, setDislikeToggle] = useState(false);
    const [likeCount, setLikeCount] = useState(() => {
        const value = likes - disLikes >= 0 ? likes - disLikes : 0;
        return value;
    });
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.userInfo && user?.userInfo?.postsLike?.includes(postId)) {
            setLikeToggle(() => true);
        }
        if (user.userInfo && user?.userInfo?.postsDislike?.includes(postId)) {
            setDislikeToggle(() => true);
        }
    }, []);

    const handleLikes = async (operation) => {
        try {
            if (operation === 'dislikePost' && likeToggle) {
                const result = await axios.post(
                    `http://localhost:1337/api/user/unLike`,
                    {
                        postId: postId,
                    },
                    {
                        withCredentials: true,
                    }
                );
                dispatch(login(result.data));
            }
            if (operation === 'like' && dislikeToggle) {
                const result = await axios.post(
                    `http://localhost:1337/api/user/dislikePost`,
                    {
                        postId: postId,
                    },
                    {
                        withCredentials: true,
                    }
                );
                dispatch(login(result.data));
            }
            if (operation === 'like') {
                setLikeToggle((p) => !p);
                setLikeCount((p) => ++p);
                setDislikeToggle(() => false);
            } else if (operation === 'unLike') {
                setLikeToggle((p) => !p);
                setLikeCount((p) => (p > 0 ? --p : 0));
                setDislikeToggle(() => false);
            } else if (operation === 'dislikePost') {
                setDislikeToggle((p) => !p);
                setLikeCount((p) => (p > 0 ? --p : 0));
                setLikeToggle(() => false);
            } else if (operation === 'unDislikePost') {
                setDislikeToggle((p) => !p);
                setLikeCount((p) => (p === 0 ? 0 : ++p));
                setLikeToggle(() => false);
            }
            const result = await axios.post(
                `http://localhost:1337/api/user/${operation}`,
                {
                    postId: postId,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(login(result.data));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <button
                className={`${likeToggle ? 'none' : 'blockD'} w-[24px]`}
                onClick={(e) => {
                    e.preventDefault();
                    handleLikes('like');
                }}
            >
                <img
                    src={VoteOutline}
                    alt="Like button Outline"
                    className="hover:bg-gray-200 p-1 rounded w-full"
                />
            </button>
            <button
                className={`${likeToggle ? 'blockD' : 'none'} w-[24px]`}
                onClick={(e) => {
                    e.preventDefault();
                    handleLikes('unLike');
                }}
            >
                <img
                    src={Vote}
                    alt="Like button"
                    className={`hover:bg-gray-200 p-1 rotate-180 rounded w-full fill-red-500`}
                />
            </button>
            <span
                className={`${
                    likeToggle
                        ? 'text-red-500'
                        : dislikeToggle
                        ? 'text-blue-500'
                        : 'text-black'
                } text-[12px]`}
            >
                {likeCount}
            </span>
            <button
                className={`${dislikeToggle ? 'none' : 'blockD'} w-[24px]`}
                onClick={(e) => {
                    e.preventDefault();
                    handleLikes('dislikePost');
                }}
            >
                <img
                    src={VoteOutline}
                    alt="Dislike button Outline"
                    className="hover:bg-gray-200 p-1 rounded w-full rotate-180"
                />
            </button>
            <button
                className={`${dislikeToggle ? 'blockD' : 'none'} w-[24px]`}
                onClick={(e) => {
                    e.preventDefault();
                    handleLikes('unDislikePost');
                }}
            >
                <img
                    src={VoteBlue}
                    alt="Dislike button"
                    className="hover:bg-gray-200 p-1 rounded w-full"
                />
            </button>
        </>
    );
};

export default Like;
