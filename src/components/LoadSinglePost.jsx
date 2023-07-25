import React from 'react';
import { Skeleton } from 'antd';
const LoadSinglePost = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-4 p-4">
                <Skeleton.Avatar active shape="circle" size="large" />
                <Skeleton paragraph={{ rows: 1, width: '100%' }} active />;
                <Skeleton.Image active />
                <Skeleton paragraph={{ rows: 5, width: '100%' }} active />;
                <div className="flex gap-4">
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                </div>
            </div>
        </div>
    );
};

export default LoadSinglePost;
