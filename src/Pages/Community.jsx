import React, { useEffect, useState } from 'react';
import PostTimeline from '../components/PostTimeline';
import { login } from '../store/authSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadCommunity from '../components/LoadCommunity';
function Community({ setRender }) {
    const dispatch = useDispatch();
    const [community, setCommunity] = useState('');
    const [buttonToggle, setButtonToggle] = useState(false);

    const [state, setState] = useState('loading');
    const [posts, setPosts] = useState(null);
    const { rid } = useParams();
    const { userInfo } = useSelector((state) => state.auth);

    const handleJoin = async () => {
        try {
            const res = await axios.post(
                'http://localhost:1337/api/user/join',
                {
                    communityID: community._id,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(login(res.data));
            setButtonToggle((p) => !p);
            setRender((p) => !p);
        } catch (err) {
            console.log(err);
        }
    };
    const handleLeave = async () => {
        try {
            const res = await axios.post(
                'http://localhost:1337/api/user/leave',
                {
                    communityID: community._id,
                },
                {
                    withCredentials: true,
                }
            );
            // const newUser = await res.json();
            console.log(res);
            dispatch(login(res.data));
            setButtonToggle((p) => !p);
            setRender((p) => !p);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const getCommuinty = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:1337/api/community/${rid}`
                );
                if (result.data) {
                    const postData = await axios.get(
                        `http://localhost:1337/api/post/c/${result.data._id}`
                    );
                    setPosts(() => postData.data);
                    setCommunity(() => result.data);
                    setState(() => 'fulfilled');
                }
            } catch (err) {
                setState(() => 'error');
            }
        };
        getCommuinty();
    }, [rid]);
    useEffect(() => {
        if (userInfo?.joinedCommunity?.includes(community._id)) {
            setButtonToggle(() => true);
        } else {
            setButtonToggle(() => false);
        }
    }, [community]);

    return (
        <>
            {state === 'loading' ? (
                <LoadCommunity />
            ) : community ? (
                <div className="w-screen h-screen  ">
                    <div className="h-16"></div>
                    <div
                        className="flex relative items-center w-screen  bg-cover h-36 bg-center"
                        style={{
                            backgroundImage: `url(${community.communityBanner})`,
                        }}
                    >
                        <button className="w-20 h-20 translate-half  rounded-full bg-white absolute top-full  left-1/2 p-1">
                            <img
                                src={`${community.communityProfile}`}
                                className="w-full h-full rounded-full object-contain"
                            />
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-1 pt-10 pb-3 bg-white ">
                        <h1 className="font-extrabold text-xs md:text-lg">
                            {`${community.communityName}`}
                        </h1>
                        <button className="hover:underline text-gray-400 text-[0.5rem] md:text-sm">
                            {`r/${community.communityID}`}
                        </button>
                        <span className="text-gray-400 text-[0.5rem] md:text-sm pb-1">
                            {`${community.communityDescription}`}
                        </span>

                        {/* {} */}
                        <button
                            className={`${buttonToggle ? ' hidden' : 'blockD'}
                            text-white text-xs font-bold bg-[#0079d3] rounded-full px-4 py-1`}
                            onClick={() => {
                                handleJoin();
                            }}
                        >
                            Join
                        </button>
                        <button
                            className={`${
                                buttonToggle ? ' blockD' : 'hidden'
                            } bg-white text-xs  text-[#0079d3] outline outline-1  outline-[#0079d3] font-bold  rounded-full px-4 py-1`}
                            onClick={() => {
                                handleLeave();
                            }}
                        >
                            Joined
                        </button>
                    </div>
                    <div className="w-screen height ">
                        <div className="w-full height max-w-5xl mx-auto flex flex-col gap-5 pt-5 ">
                            {posts ? (
                                posts.map((post) => {
                                    return (
                                        <PostTimeline
                                            post={post}
                                            key={post._id}
                                        />
                                    );
                                })
                            ) : (
                                <div>Loading</div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-screen height flex items-center justify-center bg-white">
                    Something went wrong
                </div>
            )}
        </>
    );
}

export default Community;
