import React from 'react';
import { Skeleton } from 'antd';
import LoadPost from './LoadPost';
const LoadCommunity = () => {
    return (
        <div className="w-screen h-screen">
            <div className="h-16"></div>
            <div className="w-full h-1/4 bg-white relative">
                <div className="absolute top-full translate-half left-1/2">
                    <Skeleton.Avatar active shape="circle" size="large" />
                </div>
            </div>
            <div className="bg-white h-12 w-full"></div>
            <div className="max-w-5xl mx-auto pt-6">
                <LoadPost />
            </div>
        </div>
    );
};

export default LoadCommunity;
