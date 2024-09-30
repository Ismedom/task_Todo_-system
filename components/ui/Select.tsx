"use client";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

interface CustomSelectProps {
    array: { id: number; name: string; stringValue: string }[];
    StateAction: React.Dispatch<SetStateAction<string>>;
}

export default function CustomSelect({ array, StateAction }: CustomSelectProps) {
    const [selected, setSelected] = useState(array[0]);

    useEffect(() => {
        StateAction(selected.name);
    }, [selected]);
    return (
        <Listbox value={selected} onChange={setSelected}>
            <ListboxButton
                className={clsx(
                    "relative block max-w-[200px] min-w-[130px] rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm text-gray-500 border border-gray-200 select-none shadow-sm hover:bg-gray-50",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/25"
                )}>
                {selected.stringValue}
                <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                    aria-hidden="true"
                />
            </ListboxButton>
            <ListboxOptions
                className={clsx(
                    "w-[var(--button-width)] rounded-xl border border-gray-200 bg-white p-1 absolute z-[900] shadow-md",
                    "transition duration-100 ease-in"
                )}>
                {array.map((person) => (
                    <ListboxOption
                        key={person.id}
                        value={person}
                        className="group flex items-center gap-2 rounded-lg py-1.5 pr-3 pl-1 select-none cursor-pointer hover:bg-gray-100 ">
                        <CheckIcon className="invisible size-4 fill-gray/50 group-data-[selected]:visible" />
                        <div className="text-sm text-gray-500 capitalize">{person.stringValue}</div>
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    );
}
