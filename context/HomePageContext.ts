"use client";

import { createContext } from "react";
import { contextHomePageType } from "@/interface/interface";

const initialValue: contextHomePageType = {
    searchTodo: async () => {},
    fetchTodo: async () => {},
};

export const HomePageContext = createContext(initialValue);
