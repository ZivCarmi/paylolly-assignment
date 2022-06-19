import axios from "axios";

export default {
    createTask: (taskData) => axios.post("tasks", taskData),
    updateTask: (taskId, taskData) => axios.put(`tasks/${taskId}`, taskData),
    updateStatus: (taskId, taskStatus) =>
        axios.patch(`tasks/${taskId}`, taskStatus),
    deleteTask: (taskId) => axios.delete(`tasks/${taskId}`),

    getFilters: () => axios.get("tasks/filters"),
    filterTasks: (filterType, filterValue) =>
        axios.get(`tasks/filter_by/${filterType}/${filterValue}`),

    sortTasks: (sortType, taskIds) =>
        axios.post(`tasks/sort_by/${sortType}`, {
            task_ids: taskIds,
        }),
};
