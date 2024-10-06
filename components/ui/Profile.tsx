import React from "react";

const Profile = () => {
    return (
        <div className="flex gap-2 items-center">
            <div className="max-w-[30px] md:max-w-[40px] rounded-full overflow-hidden">
                <img
                    src="https://scontent.fpnh2-2.fna.fbcdn.net/v/t39.30808-6/453099058_1517472489189969_823834815994771031_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFIE7lTquZ7pVvkKElkU8BHYMC5dGhkz4hgwLl0aGTPiEyLGJGc_1wdLc-g5659dbOmW2NrA40wrfrPxf4R6usx&_nc_ohc=RzwO6XyslecQ7kNvgEArJp0&_nc_zt=23&_nc_ht=scontent.fpnh2-2.fna&_nc_gid=A_s_ZtqyQpfZow7FS82H6Qd&oh=00_AYDkRH8cHO7utzp6-KH_JLU1WG1dH-TTFKM4TopSMbCcJg&oe=66F9F487"
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
