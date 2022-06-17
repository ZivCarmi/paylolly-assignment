import { useState, useEffect } from "react";
import { useTasks } from "../../contexts/TasksContext";
import TaskRow from "./TaskRow";

const TodoList = () => {
    const [displayTasksTable, setDisplayTasksTable] = useState(false);
    // const [sortData, setSortData] = useState({
    //     name: {
    //         isSorted: false,
    //         order: "",
    //     },
    //     date: {
    //         isSorted: false,
    //         order: "",
    //     },
    //     status: {
    //         isSorted: false,
    //         order: "",
    //     },
    // });
    const { tasks } = useTasks();

    const sortTasks = (e) => {
        // const { sortKey } = e.target.dataset;
        // if (sortData[sortKey] === undefined) return;
        // const newTasks = [...tasks];
        // if (sort === "name") {
        //     setTasks(
        //         newTasks.sort((a, b) => a.task_name.localeCompare(b.task_name))
        //     );
        // } else if (sort === "date") {
        // } else if (sort === "status") {
        //     setTasks(
        //         newTasks.sort((a, b) => a.task_name.localeCompare(b.task_name))
        //     );
        // }
    };

    useEffect(() => {
        if (tasks.length) setDisplayTasksTable(true);

        return () => setDisplayTasksTable(false);
    }, [tasks]);

    return displayTasksTable ? (
        <table className="todo-table">
            <thead>
                <tr>
                    <th
                        className="task-name"
                        data-sort-key="name"
                        onClick={sortTasks}
                    >
                        Task name
                    </th>
                    <th
                        className="task-date"
                        data-sort-key="date"
                        onClick={sortTasks}
                    >
                        Estimated Time
                    </th>
                    <th
                        className="task-status"
                        data-sort-key="status"
                        onClick={sortTasks}
                    >
                        Status
                    </th>
                    <th className="task-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <TaskRow key={index} task={task} />
                ))}
            </tbody>
        </table>
    ) : (
        <div>No tasks available</div>
    );
};

export default TodoList;
