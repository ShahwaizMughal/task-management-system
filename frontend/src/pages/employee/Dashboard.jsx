import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertCircle, BarChart3, TrendingUp } from 'lucide-react'
import { getTaskStats } from '../../services/employeeService'
import StatCard from '../../components/ui/StatCard'
import SkeletonLoader from '../../components/ui/SkeletonLoader'

const EmployeeDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getTaskStats()
        setStats(res.data)
      } catch (err) {
        console.error('Failed to load stats', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <SkeletonLoader rows={4} />

  const completionRate = stats?.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Here is a quick look at your task performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Tasks" value={stats?.total || 0} icon={BarChart3} color="violet" delay={0.1} />
        <StatCard label="In Progress" value={stats?.inProgress || 0} icon={TrendingUp} color="blue" delay={0.2} />
        <StatCard label="Completed" value={stats?.completed || 0} icon={CheckCircle} color="green" delay={0.3} />
        <StatCard label="Pending" value={stats?.pending || 0} icon={Clock} color="amber" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card p-8 flex flex-col items-center justify-center text-center space-y-6"
        >
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={552.92}
                strokeDashoffset={552.92 - (552.92 * completionRate) / 100}
                strokeLinecap="round"
                className="text-violet-600 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900 dark:text-white">{completionRate}%</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Completed</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Productivity Score</h3>
            <p className="text-sm text-slate-500 max-w-xs mt-1">
              You have completed {stats?.completed} out of your {stats?.total} total assigned tasks.
            </p>
          </div>
        </motion.div>

        <div className="card p-8 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Next Milestones</h3>
              <p className="text-sm text-slate-500">Keep up the great work and finish your pending tasks.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>In Progress</span>
                <span>{stats?.inProgress || 0}</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(stats?.inProgress / (stats?.total || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Pending</span>
                <span>{stats?.pending || 0}</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(stats?.pending / (stats?.total || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
