import api from './api'

export const getMyTasks = () => api.get('/employee/tasks')
export const updateTaskStatus = (id, status) => api.patch(`/employee/tasks/${id}`, { status })
export const getTaskStats = () => api.get('/employee/stats')
