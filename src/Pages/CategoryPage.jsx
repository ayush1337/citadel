import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubcateoryButton from '../components/SubcateoryButton';
import PostTimeline from '../components/PostTimeline';

const CategoryPage = () => {
    const [posts, setPosts] = useState(null);
    let { subCategory } = useParams();
    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:1337/api/post/s/${subCategory}`
                );
                setPosts(() => result.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, []);
    return (
        <div className="w-full height bg-slate-100">
            <div className="h-24"></div>
            <div className="max-w-5xl mx-auto flex flex-col gap-4">
                <h1 className="flex gap-2 w-full font-black">
                    Explore Category <SubcateoryButton name={subCategory} />
                </h1>
                {posts ? (
                    posts.map((post) => {
                        return <PostTimeline post={post} key={post._id} />;
                    })
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
