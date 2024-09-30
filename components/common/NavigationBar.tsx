"use client";

import { BellIcon, InfoIcon, ListIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Profile from "../ui/Profile";

const NavigationBar = () => {
    const pathname = usePathname();

    const navbarData = [
        {
            id: 1,
            text: "Todo",
            value: "",
            href: "/tasks",
            icon: <ListIcon className="size-4 translate-y-[1px]" aria-hidden="true" />,
        },
        {
            id: 2,
            text: "Profile",
            value: "profile",
            href: "/tasks/profile",
            icon: <User className="size-4 translate-y-[1px]" aria-hidden="true" />,
        },
        {
            id: 3,
            text: "Notification",
            value: "notification",
            href: pathname == "/tasks/notification/mark" ? "/tasks/notification/mark" : "/tasks/notification",
            icon: <BellIcon className="size-4 translate-y-[1px]" aria-hidden="true" />,
        },
        {
            id: 4,
            text: "About",
            value: "about",
            href: "/tasks/about",
            icon: <InfoIcon className="size-4 translate-y-[1px]" aria-hidden="true" />,
        },
    ];

    return (
        <div className="sticky top-0 h-[100vh] border border-gray-200 shadow-sm">
            <div className="border-b border-b-gray-300 bg-gray-200 px-4 py-5 md:py-6 lg:py-7">
                <Profile />
            </div>
            <nav className="flex flex-col pt-5 md:pt-6 lg:pt-7 pl-2">
                {navbarData.map(({ id, href, text, icon }) => (
                    <Link
                        key={id}
                        href={href}
                        className={`flex gap-2 items-center px-3 py-3 border-b border-b-gray-200 select-none md:py-4 rounded-l-md  ${
                            pathname === href
                                ? "text-gray-100 border bg-blue-500 font-bold"
                                : "text-gray-500 hover:bg-gray-200 hover:text-gray-500"
                        }`}>
                        {icon}
                        <span>{text}</span>
                    </Link>
                ))}
            </nav>
            <div className="absolute bottom-5 w-full flex justify-center">
                <button className="bg-red-800  hover:bg-red-700 text-gray-200 px-3 md:px-4 py-1 w-[80%] text-center rounded-md">
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default NavigationBar;
