import React from 'react';
import { Dropdown, Space } from 'antd';
import Down from '../assets/ico/down.svg';
import subcategory from '../helper/subcategory';
const SubcategoryDropdown = ({ subCategoryData, setSubCategoryData }) => {
    const items = [];
    const handleClick = (element) => {
        setSubCategoryData((p) => {
            return {
                ...p,
                type: element.type,
            };
        });
    };
    subcategory.forEach((element) => {
        items.push({
            label: (
                <button
                    className="flex gap-1 font-semibold"
                    onClick={() => handleClick(element)}
                >
                    {`${element.type}`}
                </button>
            ),
            key: element.type,
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
                    {subCategoryData.type
                        ? `${subCategoryData.type}`
                        : 'Choose a Subcategory'}
                    <img src={Down} className="w-[16px] invert" />
                </Space>
            </a>
        </Dropdown>
    );
};

export default SubcategoryDropdown;
