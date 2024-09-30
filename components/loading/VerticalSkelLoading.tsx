//

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VerticalSkelLoading = () => {
    return (
        <div className="w-full bg-gray-50">
            <div className="p-4 border border-gray-300 rounded-lg w-full">
                <Skeleton height={20} style={{ width: "40%" }} baseColor="#ededed" highlightColor="#c1c1c1" />
                <Skeleton
                    height={15}
                    baseColor="#ededed"
                    highlightColor="#c1c1c1"
                    style={{ marginTop: "16px", width: "30%" }}
                />
            </div>
        </div>
    );
};

export default VerticalSkelLoading;
