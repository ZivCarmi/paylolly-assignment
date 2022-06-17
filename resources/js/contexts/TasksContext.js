import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [tasksRemaining, setTasksRemaining] = useState(0);

    const initiateTasks = (tasks) => {
        tasks.map((task) => (task.allowedToDelete = taskCanBeDeleted(task)));
        setTasks(tasks);
    };

    const taskCanBeDeleted = ({ status, estimated_time }) => {
        if (!isTaskCompleted(status)) {
            const taskEstDate = new Date(estimated_time);
            const timeDifference = taskEstDate.getTime() - new Date();
            const daysDifference = parseInt(
                Math.ceil(timeDifference / (1000 * 3600 * 24))
            );

            if (daysDifference > 6) return false;
        }

        return true;
    };

    const isTaskCompleted = (status) => (status === "Completed" ? true : false);

    const getTasks = () => {
        axios
            .get("tasks")
            .then((res) => initiateTasks(res.data))
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    const getTotalTasks = () => setTotalTasks(tasks ? tasks.length : 0);

    const getTotalTasksByStatus = () => {
        tasks.map((task) => {
            task.status === "Completed"
                ? setTasksCompleted((prevState) => prevState + 1)
                : setTasksRemaining((prevState) => prevState + 1);
        });
    };

    useEffect(() => {
        getTotalTasks();
        getTotalTasksByStatus();

        return () => {
            // Reset tasks counters by filters for next use
            setTasksCompleted(0);
            setTasksRemaining(0);
        };
    }, [tasks]);

    return (
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
                totalTasks,
                tasksCompleted,
                tasksRemaining,
                taskCanBeDeleted,
                isTaskCompleted,
                initiateTasks,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export { TasksContext, TasksProvider };

export const useTasks = () => useContext(TasksContext);
