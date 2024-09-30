import { contextInfor } from "@/provider/Provider";
import { Checkbox } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";

function CustomCheckBox() {
    const [enabled, setEnabled] = useState(true);
    const { setOnelineSearch } = useContext(contextInfor);

    useEffect(() => {
        setOnelineSearch(enabled);
    }, [enabled]);

    return (
        <div
            onClick={() => setEnabled(!enabled)}
            className="select-none flex items-center py-1 gap-1 border border-gray-200 hover:bg-gray-50 rounded-md px-3 cursor-pointer">
            <label htmlFor="onlineSearch" className="cursor-pointer text-gray-500">
                Search online
            </label>
            <Checkbox
                id="onlineSearch"
                checked={enabled}
                onChange={setEnabled}
                className="group block size-5 border p-[2px] bg-white data-[checked]:bg-blue-500 rounded-full">
                <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Checkbox>
        </div>
    );
}

export default CustomCheckBox;
