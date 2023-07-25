import React, { useState } from 'react';
import axios from 'axios';
import subcategory from '../helper/subcategory';
const CreateCommunity = () => {
    const [formData, setFormData] = useState({});
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
            const res = await axios.post(
                'http://localhost:1337/api/community',
                {
                    ...formData,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="w-full height  bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="h-24"></div>
                <div>
                    <h1>Create communities.</h1>
                    <form
                        className="flex flex-col gap-2 items-start"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name">Community Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="e.g. Indian Memes"
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="handle">Community handle r/</label>
                        <input
                            type="text"
                            name="handle"
                            id="handle"
                            placeholder="e.g. indianmemes"
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="subcategory">
                            Choose a subcategory
                        </label>
                        <select
                            name="subcategory"
                            id="subcategory"
                            defaultValue="Others"
                            className="cursor-pointer"
                            onChange={handleChange}
                        >
                            {subcategory.map((single, index) => {
                                return (
                                    <option key={index}>{single.type}</option>
                                );
                            })}
                        </select>
                        <label htmlFor="description">Short Description</label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Community for memers and memes around south asia"
                            maxLength="100"
                            required
                            className="min-w-[300px]"
                            onChange={handleChange}
                        />
                        <input type="submit" className="cursor-pointer" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCommunity;
