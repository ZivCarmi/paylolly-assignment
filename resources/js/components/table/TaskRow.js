import { useEffect, useState } from "react";
import TaskRowActions from "./TaskRowActions";

const TaskRow = ({ task }) => {
    const [formattedEstDate, setFormattedEstDate] = useState("");

    useEffect(() => {
        const date = new Date(task.estimated_time);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        setFormattedEstDate(`${day}/${month}/${year}`);
    }, [task]);

    return (
        <tr>
            <th>{task.id}</th>
            <td>{task.task_name}</td>
            <td>{formattedEstDate}</td>
            <td>{task.status}</td>
            <td>
                <TaskRowActions
                    taskId={task.id}
                    allowedToDelete={task.allowedToDelete}
                />
            </td>
        </tr>
    );
};

export default TaskRow;
