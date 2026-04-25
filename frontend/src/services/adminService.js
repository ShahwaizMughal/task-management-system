import api from './api'

// Employee management
export const getEmployees = () => api.get('/admin/employees')
export const addEmployee = (data) => api.post('/admin/employee', data)
export const removeEmployee = (id) => api.delete(`/admin/employee/${id}`)

// Task management
export const assignTask = (data) => api.post('/admin/task', data)
export const getAllTasks = () => api.get('/admin/tasks')
