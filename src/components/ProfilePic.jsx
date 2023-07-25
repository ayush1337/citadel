import React from 'react';

function ProfilePic({ img_url }) {
    console.log(img_url);
    return (
        <div className={` relative`}>
            <img
                src={img_url}
                className="object-contain object-center w-7 h-7 rounded-full sm:w-12 sm:h-12"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
        </div>
    );
}

export default ProfilePic;
