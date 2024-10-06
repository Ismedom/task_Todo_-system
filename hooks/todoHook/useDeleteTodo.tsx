import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import { useContext } from "react";

const UseDeleteTodo = () => {
    const { setLoading, setUniversalArray } = useContext(contextInfor);
    const deleteTodo = async (id: string) => {
        try {
            setLoading((prev) => ({ ...prev, deleteTodoLoading: true }));
            const response = await axios.delete(`/api/todos/${id}/233`);
            if (response.status == 200) setUniversalArray((prevArray) => prevArray.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, deleteTodoLoading: false }));
        }
    };
    return deleteTodo;
};

export default UseDeleteTodo;
