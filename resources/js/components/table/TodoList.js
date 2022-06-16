import { useTasks } from "../../contexts/TasksContext";
import TaskRow from "./TaskRow";

const TodoList = () => {
    const { tasks } = useTasks();

    return (
        <table className="todo-table">
            <thead>
                <tr>
                    <th className="number">#</th>
                    <th className="task-name">Task name</th>
                    <th className="task-date">Estimated Time</th>
                    <th className="task-status">Status</th>
                    <th className="task-date">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <TaskRow key={index} task={task} />
                ))}
            </tbody>
        </table>
    );
};

export default TodoList;
