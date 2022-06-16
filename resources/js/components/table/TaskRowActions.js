import EditIcon from "../../../images/edit-svg.svg";
import DeleteIcon from "../../../images/delete-svg.svg";
import { useState } from "react";
import Modal from "../Modal";
import { useTasks } from "../../contexts/TasksContext";
import api from "../../api";

const TaskRowActions = ({ taskId, allowedToDelete }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { tasks, setTasks } = useTasks();

    const deleteTask = () => {
        api.deleteTask(taskId).then((res) => {
            setTasks(tasks.filter((task) => task.id !== taskId));
        });
    };

    return (
        <div className="task-row-actions">
            <button
                type="button"
                className="btn btn-update"
                onClick={() => setModalIsOpen(true)}
            >
                <img src={EditIcon} alt="Edit" />
            </button>
            {modalIsOpen && (
                <Modal setModalIsOpen={setModalIsOpen} taskId={taskId} />
            )}
            {allowedToDelete && (
                <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => deleteTask()}
                >
                    <img src={DeleteIcon} alt="Delete" />
                </button>
            )}
        </div>
    );
};

export default TaskRowActions;
