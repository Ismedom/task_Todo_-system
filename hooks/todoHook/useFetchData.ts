import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import { useContext } from "react";

const UseFetchData = () => {
    const { setLoading, setUniversalArray } = useContext(contextInfor);
    const fetchTodo = async () => {
        try {
            setLoading((prev) => ({ ...prev, fetchTodoLoading: true }));
            const response = await axios.get("/api/todos");
            setUniversalArray(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, fetchTodoLoading: false }));
        }
    };

    return fetchTodo;
};

export default UseFetchData;
