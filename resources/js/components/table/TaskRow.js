import { useEffect, useState } from "react";
import TaskRowActions from "./TaskRowActions";
import api from "../../api";
import { useTasks } from "../../contexts/TasksContext";

const TaskRow = ({ task }) => {
    const [formattedEstDate, setFormattedEstDate] = useState("");
    const { tasks, setTasks, taskCanBeDeleted } = useTasks();

    const updateStatus = async () => {
        try {
            await api
                .updateStatus(task.id, {
                    taskStatus: task.status,
                })
                .then((res) => {
                    const { status } = res.data;

                    const newTasks = [...tasks];
                    const index = newTasks.findIndex(
                        (_task) => _task.id === task.id
                    );

                    // New status assigning below so taskCanBeDeleted function can get the updated value
                    newTasks[index].status = status;

                    const newTaskData = {
                        ...newTasks[index],
                        allowedToDelete: taskCanBeDeleted(newTasks[index]),
                    };

                    newTasks[index] = newTaskData;
                    setTasks(newTasks);
                });
        } catch (error) {
            alert(`Failed to update task status: ${error}`);
        }
    };

    useEffect(() => {
        const date = new Date(task.estimated_time);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        setFormattedEstDate(`${day}/${month}/${year}`);
    }, [task]);

    return (
        <tr onClick={updateStatus}>
            <td>{task.task_name}</td>
            <td>{formattedEstDate}</td>
            <td>{task.status}</td>
            <td onClick={(e) => e.stopPropagation()}>
                <TaskRowActions
                    taskId={task.id}
                    allowedToDelete={task.allowedToDelete}
                />
            </td>
        </tr>
    );
};

export default TaskRow;
