import React, { useEffect, useState } from 'react';
import PostTimeline from '../components/PostTimeline';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import axios from 'axios';
import LoadCommunity from '../components/LoadCommunity';
function User() {
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [postsMade, setPostsMade] = useState(null);
    const [viewTab, setViewTab] = useState(1);
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(
                    `http://localhost:1337/api/user/${uid}`
                );
                setUserData(() => user.data[0]);
                setPostsMade(() => {
                    return <div></div>;
                });
                setStatus(() => 'fulfilled');
            } catch (err) {
                console.log(err);
                setStatus(() => 'error');
            }
        };
        getUser();
    }, []);
    const tabItems = [
        {
            key: 1,
            label: `Posts Made`,
        },
        {
            key: 2,
            label: `Liked Posts`,
        },
    ];

    return (
        <>
            {status === 'loading' ? (
                <LoadCommunity />
            ) : status === 'fulfilled' ? (
                <div className="w-screen h-screen  ">
                    <div className="h-16"></div>
                    <div className="flex relative items-center w-screen  bg-cover bg-no-repeat h-36 bg-center bg-[url('https://images.mygoodtimes.in/wp-content/uploads/2023/04/24135749/WhatsApp-Image-2023-04-24-at-1.57.19-PM.jpeg')]">
                        <button className="w-20 h-20 translate-half  rounded-full bg-white absolute top-full  left-1/2 p-1">
                            <div className="w-full h-full rounded-full   bg-cover bg-center bg-[url('https://pbs.twimg.com/media/E3z0ZiaWEAIG8TZ?format=jpg&name=large')]"></div>
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-1 pt-10 pb-2 bg-white ">
                        <h1 className="font-extrabold text-xs md:text-lg">
                            {userData.name}
                        </h1>
                        <button className="hover:underline text-gray-400 text-[0.5rem] md:text-sm">
                            {`u/${userData.userName}`}
                        </button>
                        <span className="text-gray-400 text-[0.5rem] md:text-sm pb-1">
                            {userData.description}
                        </span>
                    </div>
                    <div className="w-screen height bg-white">
                        <div className="w-full height max-w-5xl mx-auto flex flex-col gap-5 pt-5 ">
                            <Tabs
                                defaultActiveKey="1"
                                centered
                                items={tabItems}
                                onTabClick={(e) => {
                                    setViewTab(() => Number(e));
                                }}
                            />
                            {viewTab === 1 ? (
                                <>
                                    {userData.postsMade.length > 0 ? (
                                        userData?.postsMade?.map((post) => {
                                            return (
                                                <PostTimeline
                                                    post={post}
                                                    key={post._id}
                                                />
                                            );
                                        })
                                    ) : (
                                        <div>No posts created</div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {userData.postsLike.length > 0 ? (
                                        userData?.postsLike?.map((post) => {
                                            return (
                                                <PostTimeline
                                                    post={post}
                                                    key={post._id}
                                                />
                                            );
                                        })
                                    ) : (
                                        <div>No posts liked</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-screen height bg-white flex items-center justify-center">
                    <div>Oops Something went Wrong</div>
                </div>
            )}
        </>
    );
}

export default User;
