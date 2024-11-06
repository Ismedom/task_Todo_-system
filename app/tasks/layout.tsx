//
"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isOpenNavBar, setIsOpenNavBar] = useState(false);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[150px_auto] md:grid-cols-[200px_auto] lg:grid-cols-[250px_auto] gap-3 ">
            {isOpenNavBar && (
                <div
                    onClick={() => setIsOpenNavBar(false)}
                    className="fixed inset-0 bg-black opacity-60 z-[1200] block sm:hidden"></div>
            )}
            {/* for big screen */}
            <div className="hidden sm:block fixed sm:sticky top-0 h-[100vh] overflow-hidden">
                <NavigationBar />
            </div>
            {/* for small screen  */}
            <div
                className={`block transform transition-transform duration-150 ease-in-out ${
                    isOpenNavBar ? "-translate-x-0" : "-translate-x-full"
                } sm:hidden fixed sm:sticky top-0 h-[100vh] overflow-hidden bg-gray-200 z-[1200]`}>
                <NavigationBar setIsOpenNavBar={setIsOpenNavBar} />
            </div>
            <div className="py-2 md:py-4 px-4 sm:px-1">{children}</div>
            <div className="flex sm:hidden fixed right-5 bottom-10  items-center justify-center z-[1201] select-none">
                <ArrowLeft
                    onClick={() => setIsOpenNavBar(!isOpenNavBar)}
                    className="text-gray-400 text-lg w-8 h-8 px-2 bg-gray-600  rounded-sm cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Layout;
