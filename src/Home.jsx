import React, { useEffect, useState } from 'react';
import CreatePost from './components/CreatePost';
import PostTimeline from './components/PostTimeline';
import axios from 'axios';
import LoadPost from './components/LoadPost';
function Home() {
    const [state, setState] = useState('loading');
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const { data } = await axios.get(
                    'http://localhost:1337/api/post/'
                );
                setPosts(data);
                setState(() => 'fulfilled');
            } catch (err) {
                console.log(err);
                setState(() => 'error');
            }
        };
        getAllPosts();
    }, []);
    return (
        <>
            <div className="max-w-5xl mx-auto mt-32  sm:p-8 flex flex-col gap-1 md:gap-5">
                <CreatePost />
                {state === 'fulfilled' ? (
                    posts.map((post) => {
                        return <PostTimeline post={post} key={post._id} />;
                    })
                ) : state === 'loading' ? (
                    <div>
                        <LoadPost />
                    </div>
                ) : (
                    <div>Something went wrong</div>
                )}
            </div>
        </>
    );
}

export default Home;
