"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

// interface Todo {
//     _id: string;
//     title: string;
//     completed: boolean;
// }

export default function useSocket() {
    const [tasks, setTasks] = useState<any[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:4000");

        socketRef.current.on("todos", (receivedTodos: any) => {
            setTasks(receivedTodos);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return { tasks };
}
