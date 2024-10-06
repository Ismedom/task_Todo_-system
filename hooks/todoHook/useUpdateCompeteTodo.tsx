import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import { useContext } from "react";

const UseUpdateCompeteTodo = () => {
    const { setLoading, setUniversalArray } = useContext(contextInfor);

    const updateCompletedTodo = async (id: string) => {
        try {
            setLoading((prev) => ({ ...prev, updateTodoLoading: true }));
            const response = await axios.put(`/api/todos/${id}/333`, {
                taskName: "",
                description: "",
                status: "",
                actions: "completed",
            });

            console.log(response.data);
            setUniversalArray((prevArray) => prevArray.map((todo) => (todo._id == id ? response.data : todo)));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, updateTodoLoading: false }));
        }
    };

    return updateCompletedTodo;
};

export default UseUpdateCompeteTodo;
