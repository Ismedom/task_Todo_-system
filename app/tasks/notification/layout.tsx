//
import NotificationNav from "@/components/common/NotificationNav";
import NotificationProvider from "@/provider/NotificationProvider";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <NotificationProvider>
            <div className="md:px-4 lg:px-5">
                <div className="sticky top-0 z-[991] py-3">
                    <NotificationNav />
                </div>
                {children}
            </div>
        </NotificationProvider>
    );
};

export default layout;
