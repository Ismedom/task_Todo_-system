//

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkelLoadingConstant = () => {
    return (
        <div className="w-full">
            <div className="p-4 border border-gray-300 rounded-lg w-full">
                <Skeleton height={100} style={{ width: "100%" }} baseColor="#ededed" highlightColor="#c1c1c1" />
                <Skeleton height={24} baseColor="#ededed" highlightColor="#c1c1c1" style={{ marginTop: "16px" }} />
                <Skeleton height={18} baseColor="#ededed" highlightColor="#c1c1c1" style={{ marginTop: "8px" }} />
            </div>
        </div>
    );
};

export default SkelLoadingConstant;
