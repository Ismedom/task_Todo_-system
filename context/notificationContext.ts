// contexts/notificationContext.ts
import { createContext } from "react";

interface InotificationContext {
    updateTodoStatus: (id: string) => void;
    deleteNotification: (id: string) => void;
}

const initialValue = {
    updateTodoStatus: () => {},
    deleteNotification: () => {},
};

export const notificationContext = createContext<InotificationContext>(initialValue);
