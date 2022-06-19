import EditIcon from "../../../images/edit-svg.svg";
import DeleteIcon from "../../../images/delete-svg.svg";
import { useState } from "react";
import Modal from "../Modal";
import { useTasks } from "../../contexts/TasksContext";
import api from "../../api";
import style from "../../css/TaskRowActions.module.css";

const TaskRowActions = ({ taskId, allowedToDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tasks, setTasks } = useTasks();

    const deleteTask = () => {
        api.deleteTask(taskId).then((res) => {
            setTasks(tasks.filter((task) => task.id !== taskId));
        });
    };

    return (
        <div className={style.taskRowActions}>
            <button
                type="button"
                className={style.taskActionButton}
                onClick={() => setIsModalOpen(true)}
            >
                <img src={EditIcon} alt="Edit" />
            </button>
            {isModalOpen && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    taskId={taskId}
                    title="Update Task"
                    operation="update"
                />
            )}
            {allowedToDelete && (
                <button
                    type="button"
                    className={style.taskActionButton}
                    onClick={() => deleteTask()}
                >
                    <img src={DeleteIcon} alt="Delete" />
                </button>
            )}
        </div>
    );
};

export default TaskRowActions;
