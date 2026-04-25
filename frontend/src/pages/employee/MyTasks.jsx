import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, PlayCircle, MoreVertical } from 'lucide-react'
import { getMyTasks, updateTaskStatus } from '../../services/employeeService'
import Badge from '../../components/ui/Badge'
import SkeletonLoader from '../../components/ui/SkeletonLoader'
import EmptyState from '../../components/ui/EmptyState'
import toast from 'react-hot-toast'

const MyTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const res = await getMyTasks()
      setTasks(res.data)
    } catch (err) {
      toast.error('Failed to load your tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus)
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      )
      toast.success(`Task marked as ${newStatus}`)
    } catch (err) {
      toast.error('Failed to update task status')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Tasks</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and update your assigned work</p>
      </div>

      {loading ? (
        <SkeletonLoader rows={4} />
      ) : tasks.length === 0 ? (
        <div className="card p-12">
          <EmptyState
            title="No tasks assigned"
            description="You don't have any tasks assigned to you at the moment."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card p-6 flex flex-col justify-between hover:border-violet-300 dark:hover:border-violet-700 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <Badge status={task.status} />
                  <div className="relative group-status">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="opacity-0 absolute inset-0 cursor-pointer w-full h-full z-10"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In-Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <div className="p-1.5 rounded-lg text-slate-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
                      <MoreVertical size={16} />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{task.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={12} />
                  {new Date(task.createdAt).toLocaleDateString()}
                </div>

                <div className="flex gap-1">
                  {task.status !== 'in-progress' && task.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(task._id, 'in-progress')}
                      className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                      title="Start Task"
                    >
                      <PlayCircle size={18} />
                    </button>
                  )}
                  {task.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(task._id, 'completed')}
                      className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                      title="Mark as Completed"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTasks
