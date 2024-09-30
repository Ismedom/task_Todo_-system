//

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoaderPros {
    skelCount: number;
}

const SkeletonLoader = ({ skelCount }: SkeletonLoaderPros) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {[...Array(skelCount)].map((_, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-lg w-full">
                    <Skeleton height={150} style={{ width: "100%" }} baseColor="#ededed" highlightColor="#c1c1c1" />
                    <Skeleton height={24} baseColor="#ededed" highlightColor="#c1c1c1" style={{ marginTop: "16px" }} />
                    <Skeleton height={18} baseColor="#ededed" highlightColor="#c1c1c1" style={{ marginTop: "8px" }} />
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
