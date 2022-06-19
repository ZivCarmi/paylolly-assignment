import { useState } from "react";
import { useTasks } from "../../contexts/TasksContext";
import Filters from "./Filters";
import style from "../../css/Header.module.css";
import Modal from "../Modal";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { totalTasks, tasksCompleted, tasksRemaining } = useTasks();

    return (
        <div className={style.header}>
            <div className={style.listCounters}>
                <div className={style.counterWrapper}>
                    Total Tasks:
                    <span className={style.counterValue}>{totalTasks}</span>
                </div>
                <div className={style.counterWrapper}>
                    Tasks Completed:
                    <span className={style.counterValue}>{tasksCompleted}</span>
                </div>
                <div className={style.counterWrapper}>
                    Tasks Remaining:
                    <span className={style.counterValue}>{tasksRemaining}</span>
                </div>
            </div>
            <div className={style.listActions}>
                <Filters />
                <button
                    type="button"
                    className={style.addNewTask}
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className={style.plusIcon}></span>
                    Add Task
                </button>
                {isModalOpen && (
                    <Modal
                        title="Create Task"
                        operation="create"
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
