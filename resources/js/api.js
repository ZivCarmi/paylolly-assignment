export default {
    createTask: (taskData) => axios.post("tasks", taskData),
    updateTask: (taskId, taskData) => axios.put(`tasks/${taskId}`, taskData),
    deleteTask: (taskId) => axios.delete(`tasks/${taskId}`),
};
