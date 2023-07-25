import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import Home from '../assets/ico/homepage.svg';
import Down from '../assets/ico/down.svg';
import Search from '../assets/ico/search.svg';
import Hamburger from '../assets/ico/hamburger.svg';
import AddPost from '../assets/ico/plus.svg';
import Notificaion from '../assets/ico/notification.svg';
import Chat from '../assets/ico/chat.svg';
import Popular from '../assets/ico/popular.svg';
import ProfilePic from './ProfilePic';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { Dropdown, Space } from 'antd';
import {
    LogoutOutlined,
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    PlusOutlined,
    HomeFilled,
    RiseOutlined,
    DownOutlined,
    UserOutlined,
    MenuOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import { setNaveMenu } from '../store/navMenuSlice';
import axios from 'axios';
function Navbar({ navRender }) {
    const { userInfo } = useSelector((state) => state.auth);
    const navInfo = useSelector((state) => state.navMenu);
    const [item, setItem] = useState(navInfo);
    const [community, setCommunity] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuCommunity, setMenuCommunity] = useState([]);
    useEffect(() => {
        if (userInfo) {
            const getCommunity = async () => {
                try {
                    const res = await axios.post(
                        'http://localhost:1337/api/user/community',
                        {},
                        {
                            withCredentials: true,
                        }
                    );
                    setCommunity(() => res.data.joinedCommunity);
                    let p = [];
                    res.data.joinedCommunity.forEach((single) => {
                        p.push({
                            key: single._id,
                            label: (
                                <Link
                                    to={`/r/${single.communityID}`}
                                    className="text-[0.8rem]"
                                >{`/r/${single.communityID}`}</Link>
                            ),
                            icon: (
                                <img
                                    src={single.communityProfile}
                                    className="w-8 rounded-full"
                                />
                            ),
                            onClick: () => {
                                // setItem(() => {
                                //     return {
                                //         title: `/r/${single.communityID}`,
                                //         icon: (
                                //             <img
                                //                 src={single.communityProfile}
                                //                 className="w-8 rounded-full"
                                //             />
                                //         ),
                                //     };
                                // });
                                dispatch(
                                    setNaveMenu({
                                        title: `/r/${single.communityID}`,
                                        icon: (
                                            <img
                                                src={single.communityProfile}
                                                className="w-8 rounded-full"
                                            />
                                        ),
                                    })
                                );
                            },
                        });
                    });
                    setMenuCommunity(() => p);
                } catch (err) {
                    console.log(err);
                }
            };
            getCommunity();
        }
    }, [navRender]);
    console.log(community);
    const handleLogOut = async (e) => {
        e.preventDefault();
        await axios.post(
            'http://localhost:1337/api/auth/logout',
            {},
            {
                withCredentials: true,
            }
        );
        dispatch(logout());
        navigate('/');
    };
    const userMenu = [
        {
            key: 0,
            label: <Link to="/">Account Info</Link>,
            icon: <UserOutlined />,
        },
        {
            key: 1,
            label: <div onClick={handleLogOut}>Log out</div>,
            icon: <LogoutOutlined />,
        },
    ];

    const mainMenu = [
        {
            key: '3',
            label: <Link to="/submit">Create a Post</Link>,
            icon: <PlusOutlined />,
            onClick: () => {
                dispatch(
                    setNaveMenu({
                        title: 'Submit',
                        icon: <PlusOutlined />,
                    })
                );
            },
        },
        {
            key: '1',
            type: 'group',
            label: 'Feeds',
            children: [
                {
                    key: '1-1',
                    label: <Link to="/">Home</Link>,
                    icon: <HomeFilled />,
                    onClick: () => {
                        dispatch(
                            setNaveMenu({
                                title: 'Home',
                                icon: <HomeFilled />,
                            })
                        );
                    },
                },
                {
                    key: '1-2',
                    label: 'Popular',
                    icon: <RiseOutlined />,
                    onClick: () => {
                        dispatch(
                            setNaveMenu({
                                title: 'Popular',
                                icon: <RiseOutlined />,
                            })
                        );
                    },
                },
                {
                    key: '1-3',
                    label: <Link to="/explore">Explore</Link>,
                    icon: <GlobalOutlined />,
                    onClick: () => {
                        dispatch(
                            setNaveMenu({
                                title: 'Explore',
                                icon: <GlobalOutlined />,
                            })
                        );
                    },
                },
            ],
        },
        {
            key: '2',
            type: 'group',
            label: 'Joined Communities',
            children: menuCommunity,
        },

        {
            key: '4',
            type: 'group',
            label: 'Others',
            children: [
                {
                    key: '4-1',
                    label: <Link to="/">Account Info</Link>,
                    icon: <UserOutlined />,
                },
                {
                    key: '4-2',
                    label: 'Logout',
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ];

    return (
        <div className="w-screen z-10 fixed top-0 left-0 bg-white flex drop-shadow-sm p-2 items-center justify-center sm:p-2">
            <div className="flex items-center justify-evenly w-full">
                <div className="flex items-center cursor-pointer ">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-12" />
                    </Link>
                    <Link to="/">
                        <div className="font-black text-sm">Citadel</div>
                    </Link>
                </div>

                <Dropdown
                    menu={{
                        items: mainMenu,
                        selectable: true,
                        defaultSelectedKeys: ['1-1'],
                    }}
                    arrow
                    trigger={['click']}
                    overlayStyle={{
                        maxHeight: 500,
                        overflowY: 'auto',
                    }}
                    className="ml-auto pr-4 sm:ml-0 sm:pr-0"
                >
                    <div className="cursor-pointer">
                        <div className="hidden sm:flex items-center gap-16 xl:gap-24">
                            <div className="flex items-center gap-2">
                                {navInfo.icon}
                                <span className="text-[0.8rem]">
                                    {navInfo.title}
                                </span>
                            </div>
                            <img src={Down} className="w-4" />
                        </div>
                        <MenuOutlined className="sm:hidden " />
                    </div>
                </Dropdown>

                <form className="hidden flex-grow md:max-w-xs lg:flex items-center bg-gray-100 p-2 rounded-full focus:outline focus:outline-1 focus:outline-blue-300">
                    <label htmlFor="search">
                        <img src={Search} alt="Search" className="w-6 " />
                    </label>
                    <input
                        type="text"
                        placeholder="Search"
                        name="search"
                        className="placeholder:text-sm bg-gray-100 placeholder:p-1 w-48 focus:outline-none placeholder:font-semibold lg:w-96"
                    />
                </form>
                <div className="hidden md:flex items-center gap-8">
                    <button className="hidden md:inline-block ">
                        <Link to="/explore">
                            <RiseOutlined style={{ fontSize: '1.2rem' }} />
                        </Link>
                    </button>
                    {userInfo && (
                        <>
                            <button className="hidden md:inline-block relative">
                                <Link to="/community/1337">
                                    <img
                                        src={Notificaion}
                                        alt="Logo"
                                        className=" p-1 menu-hover menu-icon"
                                    />
                                    <div className="absolute top-0 right-0  w-4 h-4 rounded-full bg-red-500 flex items-center justify-center ">
                                        <span className="text-[8px] text-white p-2">
                                            11
                                        </span>
                                    </div>
                                </Link>
                            </button>

                            <button className="hidden md:inline-block">
                                <Link to="/submit">
                                    <PlusOutlined
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                </Link>
                            </button>
                        </>
                    )}
                </div>
                {userInfo && (
                    <Dropdown
                        className="cursor-pointer"
                        trigger={['click']}
                        arrow
                        menu={{ items: userMenu }}
                    >
                        <button className=" relative flex items-center gap-3">
                            <div className="hidden md:flex flex-col gap-1">
                                <span className="text-xs font-bold">
                                    {userInfo.name}
                                </span>
                                <span className="text-xs">{`/u/${userInfo.userName}`}</span>
                            </div>
                            <ProfilePic img_url={userInfo.avatar} />
                        </button>
                    </Dropdown>
                )}

                {!userInfo && (
                    <div className="flex gap-2">
                        <Link to="/login">
                            <button className="bg-red-500 text-white font-bold px-4 py-1 rounded shadow text-xs hover:bg-red-600">
                                Login
                            </button>
                        </Link>
                        <Link to="/singnup">
                            <button className="bg-white text-gray-700 font-bold px-4 py-1 rounded shadow text-xs hover:bg-gray-100">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
