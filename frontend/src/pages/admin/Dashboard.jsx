import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react'
import { getEmployees, getAllTasks } from '../../services/adminService'
import StatCard from '../../components/ui/StatCard'
import SkeletonLoader from '../../components/ui/SkeletonLoader'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  })
  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, taskRes] = await Promise.all([getEmployees(), getAllTasks()])
        const employees = empRes.data
        const tasks = taskRes.data

        setStats({
          totalEmployees: employees.length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter((t) => t.status === 'completed').length,
          pendingTasks: tasks.filter((t) => t.status === 'pending').length,
        })
        setRecentTasks(tasks.slice(-5).reverse())
      } catch (err) {
        console.error('Failed to fetch dashboard data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <SkeletonLoader rows={6} />

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Overview of your workspace performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate('/admin/tasks')} icon={Plus}>
            New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Employees" value={stats.totalEmployees} icon={Users} color="violet" delay={0.1} />
        <StatCard label="Total Tasks" value={stats.totalTasks} icon={AlertCircle} color="blue" delay={0.2} />
        <StatCard label="Completed" value={stats.completedTasks} icon={CheckCircle} color="green" delay={0.3} />
        <StatCard label="Pending" value={stats.pendingTasks} icon={Clock} color="amber" delay={0.4} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white px-2">Recent Tasks</h2>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Task Title</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Assigned To</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {recentTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{task.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{task.assignedTo?.name || 'Unknown'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={task.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs text-slate-400">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentTasks.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400 text-sm">
                      No tasks assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
