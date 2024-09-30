//
"use client";

import React, { useContext } from "react";
import { contextInfor } from "@/provider/Provider";
import { ArrowLeft, Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { contextHomePage } from "@/app/tasks/page";

const Header = () => {
    const { setCreateTodoAction, searchValue, setSearchValue, onlineSearch } = useContext(contextInfor);
    const { searchTodo, fetchTodo } = useContext(contextHomePage);

    const handleCreate = () => {
        setCreateTodoAction((prev) => ({ ...prev, display: true }));
    };

    return (
        <header>
            <div className="py-3 flex justify-between border-b-1 border-b-gray-200 mb-3">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (onlineSearch) searchTodo(searchValue);
                    }}
                    className="w-[calc(100%-100px)] md:w-[80%] lg:w-[70%] flex gap-2">
                    <input
                        className="px-3 py-2 rounded-3xl border border-gray-200 bg-gray-50 focus:border-gray-400 outline-none w-full"
                        type="search"
                        name="search"
                        placeholder="search your todo..."
                        autoComplete="off"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    {onlineSearch ? (
                        <div className="flex items-center select-none">
                            <FontAwesomeIcon
                                icon={faSearch}
                                onClick={() => (searchValue ? searchTodo(searchValue) : null)}
                                className="text-lg bg-blue-500 p-2 rounded-full text-gray-100 cursor-pointer hover:bg-blue-600"
                            />
                        </div>
                    ) : null}
                    {searchValue ? (
                        <div className="flex gap-2 items-center">
                            <ArrowLeft
                                className="bg-red-600 p-1 rounded-full text-gray-200 hover:bg-red-500 cursor-pointer"
                                size={34}
                                onClick={() => {
                                    fetchTodo();
                                    setSearchValue("");
                                }}
                            />
                        </div>
                    ) : null}
                </form>

                <button
                    // href="/tasks"
                    className="border px-3 md:px-4 my-1 bg-blue-500 hover:bg-blue-600 text-gray-200 rounded-3xl md:mr-5 lg:mr-7 flex justify-center gap-1 items-center max-h-[35px]"
                    onClick={handleCreate}>
                    <Plus size={20} />
                    Create
                </button>
            </div>
        </header>
    );
};

export default Header;
