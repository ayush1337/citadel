import React, { useState } from 'react';
import axios from 'axios';
function SignUp() {
    const [form, setForm] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
    });
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(
                'http://localhost:1337/api/auth/signup',
                {
                    name: form.name,
                    userName: form.userName,
                    email: form.userName,
                    password: form.password,
                }
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };
    // console.log(form);
    return (
        <div className="w-full height flex items-center justify-center bg-white">
            <div className="max-w-5xl mx-auto flex flex-col gap-4 shadow p-8 rounded">
                <h1 className="font-extrabold">Citadel Sing Up</h1>
                <div className="w-full">
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name" className="font-semibold">
                            Display Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Ayush Kumar"
                            className="focus:outline-red-500 rounded p-2 font-light text-xs"
                            name="name"
                            id="name"
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="userName" className="font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. ayush_1337"
                            className="focus:outline-red-500 rounded p-2 font-light text-xs"
                            name="userName"
                            id="userName"
                            required
                            onChange={handleChange}
                            autoComplete="user-name"
                        />
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="yourname@gmail.com"
                            className="focus:outline-red-500 rounded p-2 font-light text-xs"
                            name="email"
                            id="email"
                            required
                            onChange={handleChange}
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
                            required
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <input
                            type="submit"
                            className="cursor-pointer bg-red-500 text-white font-semibold p-1 rounded hover:bg-red-600 shadow-sm"
                            name="submit"
                            id="submit"
                            value="Sign Up"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
