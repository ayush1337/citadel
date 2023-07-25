import React, { useEffect, useReducer, useState } from 'react';
import CommunityList from '../components/CommunityList';
import Plus from '../assets/ico/plus.svg';
import { Link } from 'react-router-dom';
import LoadExplore from '../components/LoadExplore';
function Explore() {
    const [state, setState] = useState('loading');
    const [communities, setCommunities] = useState([]);
    const communityState = {
        memes: {
            type: '',
            data: [],
        },
        anime: {
            type: '',
            data: [],
        },
        science: {
            type: '',
            data: [],
        },
        space: {
            type: '',
            data: [],
        },
        entertainment: {
            type: '',
            data: [],
        },
        random: {
            type: '',
            data: [],
        },
        politics: {
            type: '',
            data: [],
        },
        wholesome: {
            type: '',
            data: [],
        },
        games: {
            type: '',
            data: [],
        },
        world: {
            type: '',
            data: [],
        },
        sports: {
            type: '',
            data: [],
        },
        others: {
            type: '',
            data: [],
        },
    };

    function reducer(state, action) {
        let lower = action.type.toLowerCase();
        state[lower].type = action.type;
        state[lower].data.push(action.payload);
    }
    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const data = await fetch('http://localhost:1337/api/community');
                const response = await data.json();
                setCommunities(() => response);
                setState(() => 'fulfilled');
            } catch (err) {
                setState(() => 'error');
            }
        };
        fetchCommunity();
    }, []);

    communities.map((community) => {
        reducer(communityState, {
            type: community.subCategory,
            payload: community,
        });
    });

    return (
        <div className="bg-white height">
            <div className="max-w-5xl mx-auto pt-24">
                <div className="p-2 flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row w-full justify-between items-center gap-2">
                        <h1 className="font-black text-xl">Explore Citadel.</h1>
                        <Link to="/r/create">
                            <button className="flex gap-2 items-center py-2 px-3 bg-red-500 rounded-full">
                                <span className="text-sm font-semibold text-white">
                                    Create Community
                                </span>
                                <img src={Plus} className="w-4 invert" />
                            </button>
                        </Link>
                    </div>
                    {state === 'loading' ? (
                        <LoadExplore />
                    ) : state === 'fulfilled' ? (
                        <div className="flex flex-col gap-4">
                            {Object.entries(communityState).map(
                                ([key, value], index) => {
                                    return value.type ? (
                                        <CommunityList
                                            data={value}
                                            key={index}
                                        />
                                    ) : (
                                        ''
                                    );
                                }
                            )}
                        </div>
                    ) : (
                        <div>Oops something went wrong</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Explore;
