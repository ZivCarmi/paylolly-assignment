import { useState, useEffect } from "react";
import { useTasks } from "../contexts/TasksContext";
import "./Modal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";

const Modal = ({ setModalIsOpen, taskId }) => {
    const [selectedTaskName, setSelectedTaskName] = useState("");
    const [selectedEstDate, setSelectedEstDate] = useState(null);
    const { tasks, setTasks } = useTasks();

    useEffect(() => {
        const newTasks = [...tasks];
        const index = newTasks.findIndex((task) => task.id === taskId);

        setSelectedTaskName(newTasks[index].task_name);
        setSelectedEstDate(new Date(newTasks[index].estimated_time));

        return () => {
            setSelectedTaskName("");
            setSelectedEstDate(null);
        };
    }, []);

    const updateTask = async () => {
        const newTasks = [...tasks];
        const index = newTasks.findIndex((task) => task.id === taskId);

        await api
            .updateTask(taskId, {
                taskName: selectedTaskName,
                estDate: selectedEstDate,
            })
            .then(() => {
                setModalIsOpen(false);

                const newTaskData = {
                    ...newTasks[index],
                    task_name: selectedTaskName,
                    estimated_time: selectedEstDate,
                };

                newTasks[index] = newTaskData;
                setTasks(newTasks);
            })
            .catch((error) => {
                alert(`Failed to update Task: ${error}`);
            });
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setModalIsOpen(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Update Task</h1>
                </div>
                <div className="body">
                    <label>
                        <input
                            type="text"
                            onChange={(e) =>
                                setSelectedTaskName(e.target.value)
                            }
                            value={selectedTaskName}
                        />
                    </label>
                    <label>
                        <DatePicker
                            selected={selectedEstDate}
                            onChange={(date) => setSelectedEstDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            onChangeRaw={(e) => e.preventDefault()}
                        />
                    </label>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setModalIsOpen(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button onClick={updateTask}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
