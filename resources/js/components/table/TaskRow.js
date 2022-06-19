import { useEffect, useState } from "react";
import TaskRowActions from "./TaskRowActions";
import api from "../../api";
import { useTasks } from "../../contexts/TasksContext";
import style from "../../css/TaskRow.module.css";
import classnames from "classnames";

const TaskRow = ({ task }) => {
    const [formattedEstDate, setFormattedEstDate] = useState("");
    const { tasks, setTasks, taskCanBeDeleted } = useTasks();
    const taskStatusClasses = classnames([
        style.taskStatus,
        {
            [style.taskCompleted]: task.status === "Completed",
            [style.taskRemaining]: task.status === "Remaining",
        },
    ]);

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
        <tr onClick={updateStatus} className={style.taskRow}>
            <td
                data-title="Name"
                className={`${style.taskRowBg} ${style.taskRowFirst} ${style.taskData}`}
            >
                {/* <div className={`task-data-inner ${style.taskDataInner}`}> */}
                {/* <span className={taskStatusClasses}></span> */}
                {task.task_name}
                {/* </div> */}
            </td>
            <td
                data-title="Est. Date"
                className={`${style.taskRowBg} ${style.taskRowMiddle} ${style.taskData}`}
            >
                {/* <div className={`task-data-inner ${style.taskDataInner}`}> */}
                {formattedEstDate}
                {/* </div> */}
            </td>
            <td
                data-title="Status"
                className={`${style.taskRowBg} ${style.taskRowLast} ${style.taskData}`}
            >
                {/* <div className={`task-data-inner ${style.taskDataInner}`}> */}
                {task.status}
                {/* </div> */}
            </td>
            <td
                onClick={(e) => e.stopPropagation()}
                className={`${style.taskRowActions} ${style.taskData}`}
            >
                <TaskRowActions
                    taskId={task.id}
                    allowedToDelete={task.allowedToDelete}
                />
            </td>
        </tr>
    );
};

export default TaskRow;
