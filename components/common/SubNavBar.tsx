import { contextInfor } from "@/provider/Provider";
import React, { useContext, useState } from "react";
import CustomSelect from "../ui/Select";
import CustomCheckBox from "../ui/CheckBox";

const filter = [
    { id: 1, name: "", stringValue: "All" },
    { id: 2, name: "created", stringValue: "New" },
    { id: 3, name: "completed", stringValue: "completed" },
    { id: 4, name: "uncompleted", stringValue: "uncompleted" },
];
const categories = [
    { id: 1, name: "", stringValue: "All Category" },
    { id: 2, name: "work", stringValue: "Work" },
    { id: 3, name: "personal", stringValue: "Personal" },
    { id: 4, name: "shopping", stringValue: "Shopping" },
    { id: 5, name: "fitness", stringValue: "Fitness" },
    { id: 6, name: "errands", stringValue: "Errands" },
];
const sorts = [
    { id: 1, name: "newest", stringValue: "Newest" },
    { id: 2, name: "name", stringValue: "Name" },
    { id: 3, name: "latest", stringValue: "Latest" },
];

const SubNavBar = () => {
    const { setSort, setCategory, setTodoFilters } = useContext(contextInfor);
    return (
        <div className="pb-4 py-2 flex gap-2 flex-wrap">
            <div className="relative">
                <CustomSelect array={sorts} StateAction={setSort} />
            </div>
            <div className="relative">
                <CustomSelect array={categories} StateAction={setCategory} />
            </div>
            <div className="relative">
                <CustomSelect array={filter} StateAction={setTodoFilters} />
            </div>
            <CustomCheckBox />
        </div>
    );
};

export default SubNavBar;
