import React from 'react';
import { Skeleton } from 'antd';
const LoadPost = () => {
    return (
        <div className="flex flex-col gap-2">
            {Array(3)
                .fill(0)
                .map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-white p-4 rounded shadow flex flex-col gap-2"
                        >
                            <Skeleton.Avatar active shape="circle" />
                            <Skeleton active />
                        </div>
                    );
                })}
        </div>
    );
};

export default LoadPost;
