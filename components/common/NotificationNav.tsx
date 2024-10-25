"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const NotificationNavData = [
    { id: 1, title: "New", href: "/tasks/notification" },
    { id: 2, title: "Achieve", href: "/tasks/notification/achieve" },
];

const NotificationNav = () => {
    const pathname = usePathname();
    const [pathName, setPathName] = useState("/tasks/notification");

    useEffect(() => {
        if (pathname.startsWith("/tasks/notification/achieve")) {
            setPathName("/tasks/notification/achieve");
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
                            pathName === href ? "border-b-2 border-b-gray-400" : ""
                        } px-3 md:px-4 py-[5px] hover:bg-gray-200`}
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
