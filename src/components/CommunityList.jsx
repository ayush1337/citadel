import React from 'react';
import SubcateoryButton from './SubcateoryButton';
import { Link } from 'react-router-dom';
function CommunityList({ data }) {
    return (
        <div className="flex flex-col  items-start gap-4">
            <SubcateoryButton name={data.type} />
            <ul className="flex flex-wrap gap-5 md:gap-8 items-center justify-evenly md:justify-start">
                {data.data.map((sub, index) => {
                    return (
                        <li key={index}>
                            <Link to={`/r/${sub.communityID}`}>
                                <button className="flex flex-col items-center">
                                    {/* <div
                                    className={`w-12 bg-slate-100 h-12 md:w-16 md:h-16 rounded-full bg-center bg-cover bg-[url('${sub.cover}')]`}
                                ></div> */}
                                    <img
                                        src={sub.communityProfile}
                                        className="w-12 bg-slate-100 h-12 md:w-16 md:h-16 rounded-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="text-[0.6rem] md:text-sm font-bold">
                                        {sub.communityName}
                                    </span>
                                    <div className="hover:underline text-[0.4rem] md:text-xs">{`r/${sub.communityID}`}</div>
                                </button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CommunityList;
