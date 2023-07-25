import React from 'react';
import subcategory from '../helper/subcategory';
import buttonColor from '../helper/buttonColor';

function Dropdown({
    active,
    btn,
    setSubCategory,
    setCommunity,
    setSubCategoryData,
    setCommunityData,
    setFormData,
    jj,
}) {
    return (
        <div
            className={`${
                active ? 'absolute' : 'hidden'
            }  top-full  mt-2 bg-white shadow-lg rounded p-2 text-xs max-h-[300px] overflow-y-scroll drop-down z-10 test  w-[200px] overflow-x-hidden test`}
        >
            <div className="w-full gap-2  bg-white flex flex-col">
                <input
                    type="text"
                    placeholder="Search"
                    className="focus:outline-none bg-gray-200 p-2 rounded font-medium"
                />
                {btn === 'community' && (
                    <ul>
                        {jj.joinedCommunity.map((single) => {
                            return (
                                <li
                                    key={single._id}
                                    className="p-2 border-b border-solid border-gray-200 cursor-pointer"
                                    onClick={() => {
                                        setFormData((p) => {
                                            return {
                                                ...p,
                                                community: single._id,
                                            };
                                        });
                                        setCommunityData((p) => {
                                            return {
                                                ...p,
                                                name: single.communityName,
                                                id: single.communityID,
                                                cover: single.communityProfile,
                                                _id: single._id,
                                            };
                                        });
                                        setCommunity(() => false);
                                    }}
                                >
                                    <button className="flex gap-1">
                                        <img
                                            src={single.communityProfile}
                                            className="w-8 bg-slate-100 h-8  rounded-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="flex flex-col text-start">
                                            <span className="truncate max-w-[150px]">
                                                {`${single.communityName}`}
                                            </span>
                                            <span>{`r/${single.communityID}`}</span>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {btn === 'subcategory' && (
                    <ul className="flex flex-col gap-2">
                        {subcategory.map((singleCategory) => {
                            return (
                                <button
                                    onClick={() => {
                                        setFormData((p) => {
                                            return {
                                                ...p,
                                                subCategory:
                                                    singleCategory.type,
                                            };
                                        });
                                        setSubCategoryData(
                                            () => singleCategory
                                        );
                                        setSubCategory((p) => false);
                                    }}
                                    key={singleCategory.type}
                                    className={` ${
                                        buttonColor[singleCategory.color]
                                    } p-2 rounded-full text-white font-semibold tracking-wider`}
                                >
                                    <li>{singleCategory.type}</li>
                                </button>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dropdown;
