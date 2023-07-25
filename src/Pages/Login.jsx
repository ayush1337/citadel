import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../store/authSlice';
function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    // console.log(userInfo);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(
            'http://localhost:1337/api/auth/login',
            {
                userName,
                password,
            },
            {
                withCredentials: true,
            }
        );
        dispatch(login(res.data));
        navigate('/');
    };
    return (
        <div className="w-full height flex items-center justify-center bg-white">
            <div className="max-w-5xl mx-auto flex flex-col gap-4 shadow p-8 rounded">
                <h1 className="font-extrabold">Citadel Login</h1>
                <div className="w-full">
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="username" className="font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. ayush_1337"
                            className="focus:outline-red-500 rounded p-2 font-light text-xs"
                            name="username"
                            id="username"
                            autoComplete="username"
                            required
                            onChange={(e) => {
                                setUserName(() => e.target.value);
                            }}
                        />
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="focus:outline-red-500 text-xs rounded p-2 font-light"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            onChange={(e) => {
                                setPassword(() => e.target.value);
                            }}
                        />

                        <input
                            type="submit"
                            className="cursor-pointer bg-red-500 text-white font-semibold p-1 rounded hover:bg-red-600 shadow-sm"
                            name="submit"
                            id="submit"
                            value="Log In"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
