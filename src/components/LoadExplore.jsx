import React from 'react';
import { Skeleton } from 'antd';
const LoadExplore = () => {
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
                            <Skeleton
                                paragraph={{ rows: 0, width: '100%' }}
                                active
                            />
                            ;
                            <div className="flex gap-2">
                                {Array(Math.floor(Math.random() * 15) + 1)
                                    .fill(0)
                                    .map((_, index) => {
                                        return (
                                            <Skeleton.Avatar
                                                active
                                                shape="circle"
                                                key={index}
                                                size="large"
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default LoadExplore;
