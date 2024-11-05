import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import { useContext } from "react";

const UseAddTodo = () => {
    const { setLoading, setUniversalArray } = useContext(contextInfor);

    //

    const addTodo = async (obj: any) => {
        const { taskName, description, deadline, todoCategory } = obj;
        try {
            setLoading((prev) => ({ ...prev, addTodoLoading: true }));
            const response = await axios.post("/api/todos", {
                taskName,
                description,
                deadline,
                status: false,
                todoCategory,
            });

            setUniversalArray((prevArray) => [...prevArray, response.data]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, addTodoLoading: false }));
        }
    };

    return addTodo;
};

export default UseAddTodo;
