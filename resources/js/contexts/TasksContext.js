import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [tasksRemaining, setTasksRemaining] = useState(0);

    const initialTasks = (tasks) => {
        setTasks(tasks);
    };

    const getTasks = () => {
        axios
            .get("tasks")
            .then((res) => {
                res.data.map((task) => {
                    const taskEstDate = new Date(task.estimated_time);
                    const timeDifference = taskEstDate.getTime() - new Date();
                    const daysDifference = parseInt(
                        Math.ceil(timeDifference / (1000 * 3600 * 24))
                    );

                    console.log(daysDifference);

                    if (daysDifference > 6) {
                        task.allowedToDelete = false;
                    } else {
                        task.allowedToDelete = true;
                    }
                });
                initialTasks(res.data);
            })
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
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export { TasksContext, TasksProvider };

export const useTasks = () => useContext(TasksContext);
