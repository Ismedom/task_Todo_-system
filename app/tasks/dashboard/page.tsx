"use client";

type StatusType = "success" | "danger" | "warning" | "none";
type DataAnalysisItem = {
    title: string;
    status: StatusType;
    value: number;
    type: "number" | "percentage";
};

import AnalyzeCard from "@/components/card/AnalyzeCard";
import AnalyzeTodo from "@/hooks/todoHook/analyzeTodo";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
    const { dataAnalysis, error, fetchDataLoading } = AnalyzeTodo();

    useEffect(() => {}, [dataAnalysis, error]);

    if (fetchDataLoading)
        return (
            <div className="pr-4">
                <div className="my-4">
                    <Skeleton
                        height={35}
                        className="min-w-[300px] "
                        width="30%"
                        baseColor="#ededed"
                        highlightColor="#c1c1c1"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            className="border border-gray-300"
                            key={index}
                            height={250}
                            width="100%"
                            baseColor="#ededed"
                            highlightColor="#c1c1c1"
                        />
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            className="border border-gray-300"
                            key={index}
                            height={290}
                            width="100%"
                            baseColor="#ededed"
                            highlightColor="#c1c1c1"
                        />
                    ))}
                </div>
            </div>
        );
    if (error) return <div>Error:{error}</div>;

    return (
        <div className="pr-4">
            <h3 className="my-4 pb-2 text-lg text-gray-500 border-b border-b-gray-400 font-semibold">
                Analyze Your Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dataAnalysis?.slice(0, 4).map((item: DataAnalysisItem, index: number) => (
                    <AnalyzeCard
                        key={index}
                        title={item.title}
                        statusType={item.status}
                        value={item.value}
                        alignItem="center"
                        dataType={item.type}
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {dataAnalysis?.slice(4, dataAnalysis.length).map((item: DataAnalysisItem, index: number) => (
                    <AnalyzeCard
                        key={index}
                        title={item.title}
                        statusType={item.status}
                        value={item.value}
                        alignItem="center"
                        dataType={item.type}
                        className="md:min-h-[300px] md:py-4"
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
