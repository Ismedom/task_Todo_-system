import React from "react";

const AnalyzeCard = ({
    id,
    title,
    dataType = "number",
    statusType = "success",
    value,
    alignItem = "left",
    fontSize = "large",
    className = "",
}: {
    id?: string;
    title: string;
    dataType?: "percentage" | "number";
    statusType?: "success" | "danger" | "warning" | "none";
    value: number;
    alignItem?: "center" | "right" | "left";
    fontSize?: "small" | "medium" | "large" | "x-large";
    className?: string;
}) => {
    const getStatusClass = () => {
        switch (statusType) {
            case "success":
                return "text-green-500";
            case "danger":
                return "text-red-500";
            case "warning":
                return "text-yellow-500";
            case "none":
                return "text-gray-600";
            default:
                return "";
        }
    };

    const getalignItem = () => {
        switch (alignItem) {
            case "center":
                return "items-center";
            case "right":
                return "items-end";
            case "left":
                return "items-start";
            default:
                return "items-start";
        }
    };

    const getFontSize = () => {
        switch (fontSize) {
            case "small":
                return "text-[30px] md:text-[40px]";
            case "medium":
                return "text-[40px] md:text-[50px]";
            case "large":
                return "text-[50px] md:text-[60px]";
            case "x-large":
                return "text-[60px] md:text-[70px]";
            default:
                return "items-start";
        }
    };

    return (
        <article
            id={id}
            className={`flex flex-col ${getalignItem()} border border-gray-300 bg-gray-100 rounded-sm px-5 py-3 ${className}`}>
            <h3 className="py-1 text-gray-700 w-max first-letter:uppercase">{title}</h3>
            <div className={`${getFontSize()} py-10 md:py-12 ${getStatusClass()}`}>
                {dataType === "number" ? value : `${value}%`}
            </div>
        </article>
    );
};

export default AnalyzeCard;
