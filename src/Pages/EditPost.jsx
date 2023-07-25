import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { message, Modal } from 'antd';
import ImageUpload from '../assets/ico/imgupload.svg';
import SubcateoryButton from '../components/SubcateoryButton';
import Cross from '../assets/ico/cross.svg';
import CommunityDropdown from '../components/CommunityDropdown';
import SubcategoryDropdown from '../components/SubcategoryDropdown';

const EditPost = () => {
    const [communityData, setCommunityData] = useState({});
    const [subCategoryData, setSubCategoryData] = useState('');
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const titleField = useRef();
    const bodyField = useRef();
    const { editPostId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await Promise.allSettled([
                    axios.post(
                        'http://localhost:1337/api/user/community',
                        {},
                        {
                            withCredentials: true,
                        }
                    ),
                    axios.get(`http://localhost:1337/api/post/${editPostId}`),
                ]);
                const [user, postResult] = result;
                if (user.value.data._id !== postResult.value.data.user._id) {
                    navigate('/');
                }
                setUserData(() => user.value.data);
                setPostData(() => postResult.value.data);
                const post = postResult.value.data;
                setCommunityData((p) => {
                    return {
                        ...p,
                        _id: post.community._id,
                        id: post.community.communityID,
                        cover: post.community.communityProfile,
                        name: post.community.communityName,
                    };
                });
                setSubCategoryData((p) => {
                    return {
                        ...p,
                        type: post.subCategory,
                    };
                });
                setFormData((p) => {
                    return {
                        ...p,
                        community: post.community._id,
                        subCategory: post.subCategory,
                    };
                });
                titleField.current.value = post.title;
                bodyField.current.value = post.postBody;
                setFormData((p) => {
                    return {
                        ...p,
                        title: post.title,
                    };
                });
                setFormData((p) => {
                    return {
                        ...p,
                        postBody: post.postBody,
                    };
                });
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    const successModal = () => {
        Modal.success({
            content: 'Post Updated Sucessfully',
            okText: 'View Post',
            onOk() {
                navigate(`/post/${postData?._id}`);
            },
        });
    };

    const clearForm = () => {
        titleField.current.value = null;
        bodyField.current.value = null;
        setCommunityData(() => {
            return new Object();
        });
        setSubCategoryData(null);
    };

    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please choose a community',
        });
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Posted sucessfully',
        });
    };

    const postUpdated = () => {
        messageApi.open({
            type: 'success',
            content: 'Post Updated sucessfully',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => {
            return {
                ...p,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!communityData.id) {
                warning();
                return;
            }

            const result = await axios.put(
                'http://localhost:1337/api/post',
                {
                    ...formData,
                    community: communityData._id,
                    subCategory: subCategoryData?.type
                        ? subCategoryData?.type
                        : 'Others',
                    user: userData._id,
                    postId: postData._id,
                },
                {
                    withCredentials: true,
                }
            );
            successModal();
            // success();
            // clearForm();
        } catch (err) {
            console.log(err);
        }
    };
    // console.log(formData);

    return (
        <>
            {contextHolder}
            <div className="w-screen h-screen  bg-white">
                <div className="h-24"></div>

                <div className="flex items-center w-screen  bg-cover h-36 bg-center bg-gradient2">
                    <div className="flex flex-col p-2  items-center w-full">
                        <h1 className="m-0 font-black text-xl text-white tracking-wide">
                            Edit a Post.
                        </h1>
                        {userData && (
                            <span className="text-white font-medium text-[0.6rem] ">
                                {`/u/${userData.userName}`}
                            </span>
                        )}
                    </div>
                </div>
                <div className="h-4"></div>
                <div className="max-w-5xl bg-white mx-auto w-full flex flex-col gap-2 px-2 sm:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <div>
                            {userData && (
                                <CommunityDropdown
                                    community={userData.joinedCommunity}
                                    setCommunityData={setCommunityData}
                                    communityData={communityData}
                                />
                            )}
                        </div>
                        <div>
                            <SubcategoryDropdown
                                setSubCategoryData={setSubCategoryData}
                                subCategoryData={subCategoryData}
                            />
                        </div>
                        <div className="relative"></div>
                        <div className="relative"></div>
                    </div>
                    <div className="flex justify-between items-center flex-col gap-2  sm:flex-row sm:gap-0 pt-2">
                        <span>
                            {communityData.id && (
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-medium text-gray-400">
                                        Posting in
                                    </span>
                                    <button className="flex gap-1 items-center  outline-1 outline outline-gray-200 rounded-full p-2">
                                        <Link
                                            to={`/r/${communityData.id}`}
                                            className="flex  items-center gap-1"
                                        >
                                            <img
                                                src={communityData.cover}
                                                className="w-8 bg-slate-100 h-8  rounded-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">
                                                    {communityData.name}
                                                </span>
                                                <span className="hover:underline text-[0.6rem]">
                                                    {`r/${communityData.id}`}
                                                </span>
                                            </div>
                                        </Link>
                                        <div
                                            className="pl-1"
                                            onClick={() => {
                                                setCommunityData(() => {
                                                    return new Object();
                                                });
                                            }}
                                        >
                                            <img src={Cross} className="w-6" />
                                        </div>
                                    </button>
                                </div>
                            )}
                        </span>

                        <span>
                            {subCategoryData.type && (
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-medium text-gray-400">
                                        Subcategory
                                    </span>
                                    <Link
                                        to={`/subcategory/${subCategoryData.type}`}
                                    >
                                        <SubcateoryButton
                                            name={subCategoryData.type}
                                        />
                                    </Link>
                                </div>
                            )}
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-2">
                            <textarea
                                type="text"
                                placeholder="Title goes here"
                                className="w-full ctitleField focus:outline-none placeholder:font-extrabold font-extrabold border-solid borde border-red-200
                            shadow shadow-gray-100
                            "
                                name="title"
                                maxLength="2000"
                                rows="2"
                                required
                                onChange={handleChange}
                                ref={titleField}
                            />
                        </div>
                        <button className="flex justify-start items-center shadow gap-2 p-2 bg-red-500 rounded-md w-fit hover:bg-red-600 text-white">
                            <span className="text-xs font-bold">
                                Upload a Photo/Video
                            </span>
                            <img
                                src={ImageUpload}
                                className="w-[16px] invert"
                            />
                        </button>
                        <div className="p-2">
                            <textarea
                                type="text"
                                placeholder="Text(Optional)"
                                className="w-full cbodyField focus:outline-none placeholder:font-extrabold font-medium text-sm border-solid borde border-red-200
                              shadow shadow-gray-100"
                                maxLength="300"
                                name="postBody"
                                rows="5"
                                onChange={handleChange}
                                ref={bodyField}
                            />
                        </div>
                        <button className="mt-auto flex justify-start items-center self-end gap-2 p-2 bg-red-500 rounded w-fit hover:bg-red-600 text-white font-extrabold">
                            <span className="text-xs font-bold text-white">
                                Update Post
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditPost;
