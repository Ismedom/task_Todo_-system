"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const NotificationNavData = [
    { id: 1, title: "New", href: "/tasks/notification" },
    { id: 2, title: "Mark", href: "/tasks/notification/mark" },
];

const NotificationNav = () => {
    const pathname = usePathname();
    const [pathName, setPathName] = useState("/tasks/notification");

    useEffect(() => {
        if (pathname.startsWith("/tasks/notification/mark")) {
            setPathName("/tasks/notification/mark");
        } else {
            setPathName("/tasks/notification");
        }
    }, [pathname]);

    return (
        <div className="flex transition-all duration-200">
            <>
                {NotificationNavData.map(({ id, title, href }) => (
                    <Link
                        className={`select-none ${
                            pathName === href ? "bg-green-500 text-gray-200" : "bg-gray-100 hover:bg-gray-200"
                        } px-3 md:px-4 py-[5px] rounded-sm`}
                        key={id}
                        href={href}
                        id={id.toString()}>
                        {title}
                    </Link>
                ))}
            </>
        </div>
    );
};

export default NotificationNav;
