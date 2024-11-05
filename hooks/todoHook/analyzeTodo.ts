import axios from "axios";
import { useEffect, useState } from "react";

const AnalyzeTodo = () => {
    const [dataAnalysis, setDataAnalysis] = useState<any>([]);
    const [fetchDataLoading, setFetchDataLoading] = useState(false);
    const [error, setError] = useState<any>();
    const handleFetchTaskAnalysis = async () => {
        try {
            setFetchDataLoading(true);
            const response = await axios.get("/api/todos/analyze");

            setDataAnalysis(response.data);
        } catch (errors) {
            setFetchDataLoading(false);
            setError(errors);
        } finally {
            setFetchDataLoading(false);
        }
    };

    useEffect(() => {
        handleFetchTaskAnalysis();
    }, []);

    return { dataAnalysis, error, fetchDataLoading };
};

export default AnalyzeTodo;
