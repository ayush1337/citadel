import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SubcateoryButton from '../components/SubcateoryButton';
import Like from '../components/Like';
import Save from '../components/Save';
import LoadSinglePost from '../components/LoadSinglePost';
import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Dropdown, FloatButton, Spin, Image } from 'antd';

function Post() {
    const [status, setStatus] = useState('loading');
    const [post, setPost] = useState(null);
    const [commentData, setCommentData] = useState('');
    const [addCommentLoading, setAddCommentLoading] = useState(false);
    const [showCommentButton, setCommentButton] = useState(false);
    const [refreshCommentSection, setRefreshCommentSection] = useState(false);
    const [fetchComment, setFetchComment] = useState(null);
    const { userInfo } = useSelector((state) => state.auth);
    const { postId } = useParams();
    const commentField = useRef(null);

    useEffect(() => {
        const post = async () => {
            try {
                setStatus(() => 'loading');
                const result = await axios.get(
                    `http://localhost:1337/api/post/${postId}`
                );
                setPost(() => result.data);
                setStatus(() => 'fulfilled');
            } catch (err) {
                console.log(err);
                setStatus(() => 'error');
            }
        };
        post();
    }, []);

    useEffect(() => {
        const getComments = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:1337/api/comment/${postId}`
                );
                setFetchComment(result.data.comments);
                console.log(result.data.comments);
            } catch (err) {
                console.log(err);
                setStatus(() => 'error');
            }
        };
        getComments();
    }, [refreshCommentSection]);

    const handleAddComment = async () => {
        try {
            setAddCommentLoading(() => true);
            const result = await axios.post(
                'http://localhost:1337/api/comment',
                {
                    comment: commentData,
                    postId: postId,
                },
                {
                    withCredentials: true,
                }
            );
            setAddCommentLoading(() => false);
            commentField.current.value = '';
            setCommentData(() => '');
            setCommentButton(() => false);
            setRefreshCommentSection((p) => !p);
        } catch (err) {
            console.log(err);
        }
    };
    const loadingIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    const items = [
        {
            label: <Link to={`/edit/${postId}`}>Edit Post</Link>,
            key: 0,
            icon: <EditOutlined />,
        },
        {
            label: <div>Delete Post</div>,
            key: 1,
            icon: <DeleteOutlined />,
            danger: true,
        },
    ];
    const commentMenu = [
        {
            label: <div>Delete Comment</div>,
            key: 1,
            icon: <DeleteOutlined />,
            danger: true,
        },
    ];

    return (
        <>
            {status === 'loading' ? (
                <div className="w-screen bg-white height pt-32">
                    <LoadSinglePost />
                </div>
            ) : status === 'error' ? (
                <div className="w-screen bg-white height flex items-center justify-center  p-1 sm:p-8  ">
                    Ooops something went wrong
                </div>
            ) : (
                <>
                    <div className={`w-screen bg-white height  p-1 sm:p-8 `}>
                        <div className="max-w-5xl mx-auto pt-20 flex flex-col items-start gap-2 p-2 sm:gap-3">
                            <div className="flex  items-center gap-2 w-full">
                                <Link
                                    to={`/r/${post.community.communityID}`}
                                    className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 bg-center bg-cover rounded-full"
                                    style={{
                                        backgroundImage: `url(${post.community.communityProfile})`,
                                    }}
                                ></Link>
                                <div className="flex text-[0.5rem] items-center gap-1">
                                    <Link
                                        to={`/r/${post.community.communityID}`}
                                        className="font-bold hover:underline"
                                    >
                                        {`r/${post.community.communityID}`}
                                    </Link>
                                    <span className="text-gray-600 opacity-60">
                                        Posted By
                                    </span>
                                    <button className="font-bold hover:underline">
                                        {`u/${post.user.userName}`}
                                    </button>
                                </div>
                                {post.user._id === userInfo?._id && (
                                    <Dropdown
                                        className="ml-auto cursor-pointer"
                                        trigger={['click']}
                                        arrow
                                        menu={{ items }}
                                    >
                                        <MoreOutlined
                                            style={{ fontSize: '20px' }}
                                        />
                                    </Dropdown>
                                )}
                            </div>
                            <h1 className="font-extrabold text-lg">
                                {`${post.title}`}
                            </h1>
                            <Link to={`/subcategory/${post.subCategory}`}>
                                <SubcateoryButton
                                    name={post.subCategory}
                                    small={true}
                                />
                            </Link>

                            {post.postImage?.secure_url && (
                                <Image src={post.postImage?.secure_url} />
                            )}

                            <div className="text-base leading-relaxed tracking-wide">
                                {`${post.postBody}`}
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Like
                                        key={post._id}
                                        likes={post ? post.likes : 0}
                                        postId={post._id}
                                        disLikes={post ? post.disLikes : 0}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Save postId={post._id} />
                                </div>
                            </div>
                            <div>
                                {fetchComment ? fetchComment.length : 0}{' '}
                                Comments
                            </div>
                            {userInfo?._id && (
                                <Spin
                                    spinning={addCommentLoading ? true : false}
                                    indicator={loadingIcon}
                                >
                                    <div className="flex w-full gap-4">
                                        <img
                                            src="https://pbs.twimg.com/profile_images/1631721849385263110/Ucj4sLGL_400x400.jpg"
                                            className="rounded-full w-10 object-cover"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Add a comment"
                                            className="focus:outline-none p-1 placeholder:text-sm border border-b-gray-300 border-x-0 border-t-0 focus:border-b-gray-700 flex-grow w-full"
                                            ref={commentField}
                                            onFocus={() => {
                                                setCommentButton(() => true);
                                            }}
                                            onChange={(e) => {
                                                setCommentData(
                                                    () => e.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            showCommentButton
                                                ? 'flex'
                                                : 'hidden'
                                        } w-full gap-4`}
                                    >
                                        <button
                                            className="ml-auto text-sm rounded-full px-4 py-2
                                hover:bg-zinc-100"
                                            onClick={() => {
                                                setCommentButton(() => false);
                                                setCommentData(() => '');
                                                commentField.current.value = '';
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="text-sm rounded-full px-4 py-2
                                    bg-blue-500 text-white disabled:text-gray-700
                                disabled:bg-zinc-100 disabled:cursor-not-allowed"
                                            disabled={
                                                commentData ? false : true
                                            }
                                            onClick={handleAddComment}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Spin>
                            )}
                            {fetchComment && (
                                <div className="flex flex-col w-full gap-5 pt-5">
                                    {fetchComment.map((comment) => {
                                        return (
                                            <div
                                                key={comment._id}
                                                className="flex gap-4 w-full"
                                            >
                                                <Link to="/">
                                                    <img
                                                        src={
                                                            comment.user.avatar
                                                        }
                                                        className="rounded-full w-6 object-contain object-center"
                                                    />
                                                </Link>
                                                <div className="flex flex-col justify-between w-full">
                                                    <div className="flex gap-1 text-[0.7rem] w-full">
                                                        <span className="font-bold">
                                                            {comment.user.name
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                comment.user.name
                                                                    .slice(1)
                                                                    .toLowerCase()}
                                                        </span>
                                                        <Link
                                                            to="/"
                                                            className="hover:underline"
                                                        >{`u/${comment.user.userName}`}</Link>
                                                        {userInfo?._id ===
                                                            comment.user
                                                                ._id && (
                                                            <Dropdown
                                                                className="ml-auto cursor-pointer"
                                                                trigger={[
                                                                    'click',
                                                                ]}
                                                                arrow
                                                                menu={{
                                                                    items: commentMenu,
                                                                }}
                                                            >
                                                                <MoreOutlined
                                                                    style={{
                                                                        fontSize:
                                                                            '16px',
                                                                    }}
                                                                />
                                                            </Dropdown>
                                                        )}
                                                    </div>
                                                    <div className="text-sm">
                                                        {comment.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {post.user._id === userInfo?._id && (
                            <Link to={`/edit/${post._id}`}>
                                <FloatButton
                                    tooltip={<div>Edit Post</div>}
                                    icon={<EditOutlined />}
                                />
                            </Link>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default Post;
