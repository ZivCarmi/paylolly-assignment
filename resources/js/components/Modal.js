import { useState, useEffect } from "react";
import { useTasks } from "../contexts/TasksContext";
import "./Modal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";

const initialErrors = { taskName: "", estDate: "" };

const Modal = ({ title, operation, taskId, setIsModalOpen }) => {
    const [selectedTaskName, setSelectedTaskName] = useState("");
    const [selectedEstDate, setSelectedEstDate] = useState(null);
    const [errors, setErrors] = useState(initialErrors);
    const { tasks, setTasks, taskCanBeDeleted } = useTasks();

    const handleValidation = () => {
        let errors = {};

        if (selectedTaskName === "") {
            errors.taskName = "Task name is required";
        }

        if (selectedEstDate === null) {
            errors.estDate = "Date is required";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = handleValidation();
        const isValid = Object.keys(validationErrors).length === 0;

        if (!isValid) return setErrors(validationErrors);

        if (operation === "create") createTask();
        else if (operation === "update") updateTask();
    };

    const createTask = async () => {
        await api
            .createTask({
                taskName: selectedTaskName,
                estDate: selectedEstDate,
            })
            .then((res) => {
                setIsModalOpen(false);

                res.data.allowedToDelete = taskCanBeDeleted(res.data);
                setTasks([res.data, ...tasks]);
            })
            .catch((error) => {
                alert(`Failed to add Task: ${error}`);
            });
    };

    const updateTask = async () => {
        const newTasks = [...tasks];
        const index = newTasks.findIndex((task) => task.id === taskId);

        await api
            .updateTask(taskId, {
                taskName: selectedTaskName,
                estDate: selectedEstDate,
            })
            .then(() => {
                setIsModalOpen(false);

                // New estimated time assigning below so taskCanBeDeleted function can get the updated value
                newTasks[index].estimated_time = selectedEstDate;

                const newTaskData = {
                    ...newTasks[index],
                    task_name: selectedTaskName,
                    allowedToDelete: taskCanBeDeleted(newTasks[index]),
                };

                newTasks[index] = newTaskData;
                setTasks(newTasks);
            })
            .catch((error) => {
                alert(`Failed to update Task: ${error}`);
            });
    };

    // Set initial task data to populate into the inputs when user update a task
    useEffect(() => {
        if (operation !== "update") return;

        const newTasks = [...tasks];
        const index = newTasks.findIndex((task) => task.id === taskId);

        setSelectedTaskName(newTasks[index].task_name);
        setSelectedEstDate(new Date(newTasks[index].estimated_time));
    }, []);

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="modalWrapper">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="title">
                        <h1>{title}</h1>
                    </div>
                    <form className="body" onSubmit={handleSubmit}>
                        <label>
                            Task name
                            <input
                                type="text"
                                onChange={(e) =>
                                    setSelectedTaskName(e.target.value)
                                }
                                value={selectedTaskName}
                            />
                            {errors.taskName && (
                                <span className="error">{errors.taskName}</span>
                            )}
                        </label>
                        <label>
                            Date
                            <DatePicker
                                selected={selectedEstDate}
                                onChange={(date) => setSelectedEstDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                onChangeRaw={(e) => e.preventDefault()}
                            />
                            {errors.estDate && (
                                <span className="error">{errors.estDate}</span>
                            )}
                        </label>
                        <div className="formButtons">
                            <button type="submit">Submit</button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                                id="cancelBtn"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
