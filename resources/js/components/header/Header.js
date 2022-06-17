import { useState } from "react";
import { useTasks } from "../../contexts/TasksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api";

const Header = () => {
    const [selectedTaskName, setSelectedTaskName] = useState("");
    const [selectedEstDate, setSelectedEstDate] = useState(null);
    const {
        tasks,
        setTasks,
        totalTasks,
        tasksCompleted,
        tasksRemaining,
        taskCanBeDeleted,
    } = useTasks();

    const submitNewTask = async () => {
        try {
            await api
                .createTask({
                    taskName: selectedTaskName,
                    estDate: selectedEstDate,
                })
                .then((res) => {
                    res.data.allowedToDelete = taskCanBeDeleted(res.data);
                    setTasks([res.data, ...tasks]);
                    setSelectedTaskName("");
                    setSelectedEstDate(null);
                });
        } catch (error) {
            alert(`Failed to add Task: ${error}`);
        }
    };

    const filterTasks = (e) => {};

    return (
        <div className="header">
            <div className="total-tasks">Total Tasks: {totalTasks}</div>
            <div className="tasks-completed">
                Tasks Completed: {tasksCompleted}
            </div>
            <div className="tasks-remaining">
                Tasks Remaining: {tasksRemaining}
            </div>
            <button type="button">Add New Task</button>
            <div className="create-new-task-container">
                <label>
                    <input
                        type="text"
                        onChange={(e) => setSelectedTaskName(e.target.value)}
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
                <button type="button" onClick={submitNewTask}>
                    Add Task
                </button>
            </div>
            <div className="filters">
                <h2 className="filter-by">Filter by</h2>
                <div className="filters-form">
                    <label className="status-filter">
                        <input
                            type="radio"
                            name="filter"
                            value="status"
                            onChange={filterTasks}
                        />
                        Status
                    </label>
                    <label className="date-filter">
                        <input
                            type="radio"
                            name="filter"
                            value="date"
                            onChange={filterTasks}
                        />
                        Date
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Header;
