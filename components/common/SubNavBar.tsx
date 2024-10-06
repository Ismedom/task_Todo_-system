import { contextInfor } from "@/provider/Provider";
import React, { useContext } from "react";
import CustomSelect from "../ui/Select";
import CustomCheckBox from "../ui/CheckBox";
import { categories, filter, sorts } from "@/constant/constantArray";

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
