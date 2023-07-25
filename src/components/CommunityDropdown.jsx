import React from 'react';
import { Dropdown, Space } from 'antd';
import Down from '../assets/ico/down.svg';
import { Link } from 'react-router-dom';

const CommunityDropdown = ({ community, communityData, setCommunityData }) => {
    const items = [];
    const handleClick = (element) => {
        setCommunityData((p) => {
            return {
                ...p,
                id: element.communityID,
                cover: element.communityProfile,
                name: element.communityName,
                _id: element._id,
            };
        });
    };
    if (!community.length) {
        items.push({
            label: (
                <Link
                    to="/explore"
                    className="flex gap-1  px-1 rounded
                 py-2 font-bold 
                "
                >
                    Join a community
                </Link>
            ),
            key: 0,
        });
        items.push({
            type: 'divider',
        });
    }
    community.forEach((element) => {
        items.push({
            label: (
                <button
                    className="flex gap-1"
                    onClick={() => handleClick(element)}
                >
                    <img
                        src={element.communityProfile}
                        className="w-8 bg-slate-100 h-8  rounded-full object-cover"
                        loading="lazy"
                    />
                    <div className="flex flex-col text-start">
                        <span className="font-bold truncate max-w-[150px]">{`${element.communityName}`}</span>
                        <span>{`r/${element.communityID}`}</span>
                    </div>
                </button>
            ),
            key: element._id,
        });
        items.push({
            type: 'divider',
        });
    });

    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            className="flex justify-center items-center shadow gap-1 p-2 bg-red-500 rounded-md  hover:bg-red-600 text-white cursor-pointer text-xs font-bold"
            arrow
            overlayStyle={{
                maxHeight: 250,
                overflowY: 'auto',
            }}
            overlayClassName="drop-down"
        >
            <a
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-center"
            >
                <Space>
                    {communityData.id
                        ? `r/${communityData.id}`
                        : 'Choose a community'}
                    <img src={Down} className="w-[16px] invert" />
                </Space>
            </a>
        </Dropdown>
    );
};

export default CommunityDropdown;
