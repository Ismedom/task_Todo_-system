"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function UseSocket() {
    const [tasks, setTasks] = useState<any[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const { data: session } = useSession();
    useEffect(() => {
        if (session?.user) {
            socketRef.current?.disconnect();

            socketRef.current = io(process.env.BACK_END_URL, {
                transports: ["websocket", "polling"],
                reconnectionAttempts: 5,
                autoConnect: true,
                auth: {
                    userId: session.user.id,
                },
            });

            socketRef.current.on("fetch_all_tasks", (receivedTodos: any[]) => {
                setTasks(receivedTodos);
            });

            socketRef.current.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            return () => {
                socketRef.current?.disconnect();
            };
        }
    }, [session]);

    return { tasks };
}
