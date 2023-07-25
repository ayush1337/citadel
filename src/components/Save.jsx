import React, { useEffect, useState } from 'react';
import SaveOutline from '../assets/ico/save-outline.svg';
import SaveFilled from '../assets/ico/save-filled.svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

const Save = ({ postId }) => {
    const [saveToggle, setSaveToggle] = useState(false);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    useEffect(() => {
        if (userInfo && userInfo?.postsSaved?.includes(postId)) {
            setSaveToggle(() => true);
        }
    }, []);
    const handleSave = async (type) => {
        try {
            setSaveToggle((p) => !p);
            const user = await axios.post(
                `http://localhost:1337/api/user/${type}`,
                { postId: postId },
                { withCredentials: true }
            );
            dispatch(login(user.data));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <button
                className={`${
                    saveToggle ? 'none' : 'flexD'
                } items-center hover:bg-gray-100 rounded p-1`}
                onClick={(e) => {
                    e.preventDefault();
                    handleSave('save');
                }}
            >
                <img
                    src={SaveOutline}
                    alt="Save Button"
                    className=" p-1  w-[24px]"
                />
                <div className="hidden sm:inline-block text-[10px]">Save</div>
            </button>

            <button
                className={`${
                    saveToggle ? 'flexD' : 'none'
                } items-center hover:bg-gray-100 rounded p-1`}
                onClick={(e) => {
                    e.preventDefault();
                    handleSave('unsave');
                }}
            >
                <img
                    src={SaveFilled}
                    alt="Save Button"
                    className=" p-1  w-[24px]"
                />
                <div className="hidden sm:inline-block text-[10px] font-bold text-red-500">
                    Saved
                </div>
            </button>
        </>
    );
};

export default Save;
