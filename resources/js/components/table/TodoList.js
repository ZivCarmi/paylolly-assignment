import { useState, useEffect } from "react";
import { useTasks } from "../../contexts/TasksContext";
import TaskRow from "./TaskRow";
import api from "../../api";
import style from "../../css/TodoList.module.css";
import classnames from "classnames";

const TodoList = () => {
    const [displayTasksTable, setDisplayTasksTable] = useState(false);
    const { tasks, initiateTasks } = useTasks();
    const [sortOrder, setSortOrder] = useState("ASC");
    const [sortData, setSortData] = useState({
        name: false,
        date: false,
        status: false,
    });

    const changeSortOrder = () => {
        sortOrder === "DESC" ? setSortOrder("ASC") : setSortOrder("DESC");
        initiateTasks([...tasks].reverse());
    };

    const sortTasks = (e) => {
        const { sortKey } = e.target.dataset;
        const sortType = sortData[sortKey];

        if (sortType === undefined) return;

        if (sortType === true) return changeSortOrder();

        const taskIds = tasks.map(({ id }) => id);

        // We also send task ids
        api.sortTasks(sortKey, taskIds)
            .then((res) => {
                const newSortData = sortData;

                // We reset all other sorts
                Object.keys(newSortData).map((sort) => {
                    if (sort !== sortKey) {
                        newSortData[sort] = false;
                    }
                });

                setSortOrder("DESC");
                setSortData({ ...newSortData, [sortKey]: true });
                initiateTasks(res.data);
            })
            .catch((error) => {
                alert(`Failed to sort tasks: ${error}`);
            });
    };

    useEffect(() => {
        if (tasks.length) setDisplayTasksTable(true);

        return () => setDisplayTasksTable(false);
    }, [tasks]);

    return displayTasksTable ? (
        <div className={style.tableContainer}>
            <table className={style.todoTable}>
                <thead className={style.tableHead}>
                    <tr className={style.tableHeadRow} data-title="Sort by">
                        <th
                            className={style.taskHeadDescription}
                            data-sort-key="name"
                            onClick={sortTasks}
                        >
                            Task name
                            <span
                                className={classnames([
                                    style.sortOrderIcon,
                                    {
                                        [style.descendingOrder]:
                                            sortData.name === true &&
                                            sortOrder === "DESC",
                                    },
                                ])}
                            ></span>
                        </th>
                        <th
                            className={style.taskHeadDescription}
                            data-sort-key="date"
                            onClick={sortTasks}
                        >
                            Estimated Time
                            <span
                                className={classnames([
                                    style.sortOrderIcon,
                                    {
                                        [style.descendingOrder]:
                                            sortData.date === true &&
                                            sortOrder === "DESC",
                                    },
                                ])}
                            ></span>
                        </th>
                        <th
                            className={style.taskHeadDescription}
                            data-sort-key="status"
                            onClick={sortTasks}
                        >
                            Status
                            <span
                                className={classnames([
                                    style.sortOrderIcon,
                                    {
                                        [style.descendingOrder]:
                                            sortData.status === true &&
                                            sortOrder === "DESC",
                                    },
                                ])}
                            ></span>
                        </th>
                        <th className={style.taskHeadActions}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <TaskRow key={index} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div>No tasks available</div>
    );
};

export default TodoList;
