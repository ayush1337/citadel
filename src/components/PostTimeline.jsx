import React from 'react';
import Like from './Like';
import Save from './Save';
import Share from './Share';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import SubcateoryButton from './SubcateoryButton';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useSelector } from 'react-redux';
function PostTimeline({ post }) {
    const { userInfo } = useSelector((state) => state.auth);
    const items = [
        {
            label: <Link to={`/edit/${post._id}`}>Edit Post</Link>,
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
    return (
        <div className="w-full  bg-white drop-shadow flex  cursor-pointer hover:outline hover:outline-1 hover:outline-gray-800 sm:rounded hover:drop-shadow-none ">
            <div className="hidden bg-gray-50 p-3 md:flex flex-col gap-1 items-center">
                <Like
                    key={post._id}
                    likes={post ? post.likes : 0}
                    postId={post._id}
                    disLikes={post ? post.disLikes : 0}
                />
            </div>
            <div className="flex-grow">
                <div className="p-2 flex items-center gap-1">
                    {post.community.communityProfile && (
                        <button
                            className={`w-6 h-6 sm:w-7 sm:h-7 bg-gray-200 rounded-full bg-center bg-cover`}
                            style={{
                                backgroundImage: `url(${post.community.communityProfile})`,
                            }}
                        ></button>
                    )}
                    {post.community.communityID && (
                        <Link
                            to={`/r/${post.community.communityID}`}
                            className="text-[0.4rem] sm:text-[0.6rem]  font-bold hover:underline cursor-pointer"
                        >
                            {`/r/${post.community.communityID}`}
                        </Link>
                    )}
                    {post.user.userName && (
                        <div className="text-[0.4rem] sm:text-[0.6rem] text-gray-600 opacity-60 ">
                            • Posted by
                        </div>
                    )}
                    {post.user.userName && (
                        <Link
                            to={`/u/${post.user.userName}`}
                            className="text-[0.4rem] sm:text-[0.6rem] text-gray-600 opacity-60 cursor-pointer hover:underline"
                        >
                            {`u/${post.user.userName}`}
                        </Link>
                    )}

                    <Link
                        to={`/subcategory/${post.subCategory}`}
                        className="flex flex-col items-center"
                    >
                        <SubcateoryButton
                            name={post.subCategory}
                            small={true}
                        />
                    </Link>
                    {post.user._id === userInfo?._id && post.user._id && (
                        <Dropdown
                            className="ml-auto cursor-pointer"
                            trigger={['click']}
                            arrow
                            menu={{ items }}
                        >
                            <MoreOutlined style={{ fontSize: '16px' }} />
                        </Dropdown>
                    )}
                </div>

                <Link to={`/post/${post._id}`}>
                    <h1 className="text-base px-2 flex items-start gap-2 font-extrabold text-[0.8rem] sm:text-base leading-none">
                        {`${post.title}`}
                    </h1>

                    <div className="mask p-2">
                        {post.postImage?.secure_url && (
                            <div className="w-2/4">
                                <img
                                    className="w-full object-contain"
                                    src={post.postImage?.secure_url}
                                />
                            </div>
                        )}

                        {post.postBody ? (
                            <div>{`${post.postBody}`}</div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="h-12 bg-white flex w-full md:justify-start justify-between items-center gap-2">
                        <div className="flex md:hidden items-center gap-1 rounded-full outline outline-1 outline-gray-200 p-1">
                            <Like
                                key={post._id}
                                likes={post ? post.likes : 0}
                                postId={post._id}
                                disLikes={post ? post.disLikes : 0}
                            />
                        </div>
                        <Comment comments={post.comments.length} />
                        <Share />
                        <Save postId={post._id} />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default PostTimeline;
