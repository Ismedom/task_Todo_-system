import React from "react";

const Profile = () => {
    return (
        <div className="flex gap-2 items-center">
            <div className="max-w-[30px] md:max-w-[40px] rounded-full overflow-hidden">
                <img
                    src="https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png"
                    alt="Profile picture"
                    width={200}
                    height={200}
                    className="w-full"
                />
            </div>
            <p className="md:text-lg md:font-bold text-gray-600">Ismedom</p>
        </div>
    );
};

export default Profile;
