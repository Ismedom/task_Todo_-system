import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import { useContext } from "react";

const UseUpdateTodo = () => {
    const { setLoading, setUniversalArray } = useContext(contextInfor);
    const updateTodo = async (id: string, obj: any) => {
        const { taskName, description, status, actions } = obj;
        try {
            setLoading((prev) => ({ ...prev, updateTodoLoading: true }));
            const response = await axios.put(`/api/todos/${id}/333`, {
                taskName,
                description,
                status,
                actions,
            });

            setUniversalArray((prevArray) => prevArray.map((todo) => (todo._id == id ? response.data : todo)));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, updateTodoLoading: false }));
        }
    };
    return updateTodo;
};

export default UseUpdateTodo;
