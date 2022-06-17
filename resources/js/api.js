import axios from "axios";

export default {
    createTask: (taskData) => axios.post("tasks", taskData),
    updateTask: (taskId, taskData) => axios.put(`tasks/${taskId}`, taskData),
    updateStatus: (taskId, taskStatus) =>
        axios.patch(`tasks/${taskId}`, taskStatus),
    deleteTask: (taskId) => axios.delete(`tasks/${taskId}`),

    filterTasks: (filter) => axios.get(`tasks/filter/${filter}`),
};
