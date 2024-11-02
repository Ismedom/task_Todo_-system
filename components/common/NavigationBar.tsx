"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BellIcon, GridIcon, InfoIcon, LayoutDashboard } from "lucide-react";
import Profile from "../ui/Profile";
import SignOutButton from "./SignoutButton";
import UseSocket from "@/hooks/useSocket";

const NavigationBar = () => {
    const pathname = usePathname();
    const { tasks } = UseSocket();

    // useEffect(() => {
    //     console.log(tasks);
    // }, [tasks]);

    const navbarData = [
        {
            id: 1,
            text: "Tasks",
            value: "",
            href: pathname.startsWith("/tasks/details") ? `/tasks/details/${pathname.split("/")[3]}` : `/tasks`,
            icon: <LayoutDashboard className="size-4 translate-y-[1px]" aria-hidden="true" />,
        },

        {
            id: 2,
            text: "Dashboard",
            value: "dashboard",
            href: "/tasks/dashboard",
            icon: <GridIcon className="size-4 translate-y-[1px]" aria-hidden="true" />,
        },
        {
            id: 3,
            text: "Notification",
            value: "notification",
            href: pathname.startsWith("/tasks/notification/mark")
                ? `/tasks/notification/mark${pathname.split("/tasks/notification/mark")[1] || ""}`
                : `/tasks/notification${pathname.split("/tasks/notification")[1] || ""}`,
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
        <div className="border h-full border-gray-200 shadow-sm">
            <div className="border-b border-b-gray-300 bg-gray-200 px-4 py-5 md:py-6 lg:py-7">
                <Profile />
            </div>
            <nav className="flex flex-col pt-5 md:pt-6 lg:pt-7 pl-2">
                {navbarData.map(({ id, href, text, icon }, index) => (
                    <Link
                        key={id}
                        href={href}
                        className={`flex gap-2 items-center px-3 py-3 border-b border-b-gray-200 select-none md:py-4 rounded-l-md relative  ${
                            pathname === href
                                ? "text-gray-100 border bg-blue-500"
                                : "text-gray-500 hover:bg-gray-200 hover:text-gray-500"
                        }`}>
                        <div className="translate-y-[-1px]">{icon}</div>
                        <span>{text}</span>
                        {index === 2 && tasks.length !== 0 ? (
                            <span className="w-5 h-5 px-2 flex justify-center items-center rounded-full bg-red-500 text-gray-200">
                                {tasks.length}
                            </span>
                        ) : null}
                    </Link>
                ))}
            </nav>
            <div className="absolute bottom-5 w-full flex justify-center">
                <SignOutButton />
            </div>
        </div>
    );
};

export default NavigationBar;
