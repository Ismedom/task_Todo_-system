//

import NavigationBar from "@/components/common/NavigationBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-[150px_auto] md:grid-cols-[200px_auto] lg:grid-cols-[250px_auto] gap-3 ">
            <div className="sticky top-0 h-[100vh] overflow-hidden">
                <NavigationBar />
            </div>
            <div className="py-2 md:py-4">{children}</div>
        </div>
    );
};

export default layout;
