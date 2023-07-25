import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';
import ImageUpload from '../assets/ico/imgupload.svg';
import SubcateoryButton from '../components/SubcateoryButton';
import Cross from '../assets/ico/cross.svg';
import CommunityDropdown from '../components/CommunityDropdown';
import SubcategoryDropdown from '../components/SubcategoryDropdown';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { Spin, Progress, Image } from 'antd';
import { LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
function Submit() {
    const [communityData, setCommunityData] = useState({});
    const [subCategoryData, setSubCategoryData] = useState('');
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [startProgress, setStartProgress] = useState(false);
    const [uploadImage, setUploadImage] = useState('');
    const [uploadVideo, setUploadVideo] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const titleField = useRef();
    const bodyField = useRef();
    const fileField = useRef();
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:1337/api/user/community',
                    {},
                    {
                        withCredentials: true,
                    }
                );
                setUserData(() => res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    const clearForm = () => {
        titleField.current.value = null;
        bodyField.current.value = null;
        setCommunityData(() => {
            return new Object();
        });
        setSubCategoryData(() => '');
    };

    const handleImageDelete = () => {
        setImage(() => '');
        setUploadImage(() => '');
        fileField.current.value = '';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => {
            return {
                ...p,
                [name]: value,
            };
        });
    };
    const LoadingIcon = (
        <LoadingOutlined style={{ fontSize: 24, color: 'red' }} spin />
    );
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!communityData.id) {
                warning();
                return;
            }

            const result = await axios.post(
                'http://localhost:1337/api/post',
                {
                    ...formData,
                    community: communityData._id,
                    subCategory: subCategoryData.type,
                    postImage: uploadImage ? uploadImage : {},
                },
                {
                    withCredentials: true,
                }
            );
            console.log(result.data);
            if (uploadImage) {
                handleImageDelete();
            }
            success();
            clearForm();
        } catch (err) {
            console.log(err);
        }
    };
    async function handleUpload(e) {
        try {
            if (e) {
                e.preventDefault();
            }
            setUploading(() => true);
            setStartProgress(() => true);
            let data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'citadel_upload');
            data.append('cloud_name', 'dt2newa4h');

            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dt2newa4h/auto/upload',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(() => percentCompleted);
                        console.log(`Upload Progress: ${percentCompleted}%`);
                    },
                }
            );
            setUploading(() => false);
            setTimeout(() => {
                setStartProgress(() => false);
            }, 1000);
            console.log(res.data);
            setUploadImage(() => res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {contextHolder}
            <div className="w-screen height  bg-white">
                <div className="h-24"></div>

                <div className="flex items-center w-screen  bg-cover h-36 bg-center bg-gradient">
                    <div className="flex flex-col p-2  items-center w-full">
                        <h1 className="m-0 font-black text-xl text-white tracking-wide">
                            Create a Post.
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
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <textarea
                            type="text"
                            placeholder="Title goes here...."
                            className="w-full focus:outline-none font-semibold border-solid border border-gray-200 rounded resize-none drop-down focus:outline-1 focus:outline focus:outline-gray-400
                             p-2
                            "
                            name="title"
                            maxLength="2000"
                            rows="2"
                            required
                            onChange={handleChange}
                            ref={titleField}
                        />
                        <Spin
                            indicator={LoadingIcon}
                            spinning={uploading ? true : false}
                        >
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    className=" text-xs text-gray-500 
                                file:cursor-pointer file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
      file:text-xs file:font-semibold
      file:bg-red-500 file:text-white
      hover:file:bg-red-600"
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}
                                    ref={fileField}
                                />

                                <button
                                    onClick={handleUpload}
                                    disabled={image ? false : true}
                                    className="disabled:cursor-not-allowed flex items-center gap-2 rounded-md bg-red-500 px-2 text-white font-semibold
                                disabled:opacity-50
                                "
                                >
                                    <UploadOutlined className="text-sm" />
                                    <span className="text-xs">Upload</span>
                                </button>
                            </div>
                        </Spin>
                        <div></div>
                        <Progress
                            percent={progress}
                            strokeColor="red"
                            size={'small'}
                            className={`${startProgress ? 'blockD' : 'none'}`}
                        />
                        <div className="italic text-[0.5rem] text-gray-500 font-semibold">
                            Supports PNG, JPG, MP4 & MKV
                        </div>
                        {uploadImage && (
                            <div className="flex flex-col gap-3">
                                <Image
                                    width={'75%'}
                                    src={uploadImage.secure_url}
                                />
                                <button
                                    className="rounded px-2 py-1 hover:bg-gray-200 self-end"
                                    onClick={handleImageDelete}
                                >
                                    <DeleteOutlined />
                                </button>
                            </div>
                        )}

                        <textarea
                            type="text"
                            placeholder="Text (Optional)"
                            className="w-full focus:outline-none border-solid border border-gray-200 rounded  drop-down focus:outline-1 focus:outline focus:outline-gray-400
                            p-2
                           "
                            maxLength="300"
                            name="post"
                            rows="5"
                            onChange={handleChange}
                            ref={bodyField}
                        />

                        <input
                            type="submit"
                            className=" self-end gap-2 p-2 bg-red-500 rounded w-fit hover:bg-red-600 text-white font-semibold text-xs cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={uploading ? true : false}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Submit;
