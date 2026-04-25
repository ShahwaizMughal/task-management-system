import { useState, useEffect } from 'react'
import { ClipboardList, Plus, Search, Filter } from 'lucide-react'
import { getAllTasks, assignTask, getEmployees } from '../../services/adminService'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import SkeletonLoader from '../../components/ui/SkeletonLoader'
import EmptyState from '../../components/ui/EmptyState'
import toast from 'react-hot-toast'

const AdminTasks = () => {
  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [filters, setFilters] = useState({ status: 'all', search: '' })
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '', status: 'pending' })

  const fetchData = async () => {
    try {
      const [taskRes, empRes] = await Promise.all([getAllTasks(), getEmployees()])
      setTasks(taskRes.data)
      setEmployees(empRes.data)
    } catch (err) {
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.assignedTo) return toast.error('Please select an employee')
    setSubmitting(true)
    try {
      await assignTask(form)
      toast.success('Task assigned successfully')
      setForm({ title: '', description: '', assignedTo: '', status: 'pending' })
      setIsModalOpen(false)
      fetchData()
    } catch (err) {
      toast.error('Failed to assign task')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = filters.status === 'all' || t.status === filters.status
    const matchesSearch = t.title.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tasks Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Assign and track team tasks</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={Plus}>
          Assign New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-3 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="input-base pl-11"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="input-base pl-11 appearance-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : filteredTasks.length === 0 ? (
        <div className="card p-12">
          <EmptyState
            title="No tasks found"
            description="Assign tasks to your employees to track their progress."
            action={<Button onClick={() => setIsModalOpen(true)}>Assign Task</Button>}
          />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Task Information</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Assigned To</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{task.title}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{task.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                          {task.assignedTo?.name?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{task.assignedTo?.name || 'Deleted User'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={task.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs text-slate-400">{new Date(task.createdAt).toLocaleDateString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign New Task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Task Title</label>
            <input
              type="text"
              required
              className="input-base"
              placeholder="e.g. Design UI Components"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
            <textarea
              required
              rows={3}
              className="input-base resize-none"
              placeholder="Provide details about the task..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Assign To</label>
              <select
                required
                className="input-base"
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Initial Status</label>
              <select
                className="input-base"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button className="flex-1" type="submit" loading={submitting}>
              Assign Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminTasks
