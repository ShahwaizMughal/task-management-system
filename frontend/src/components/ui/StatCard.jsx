import { motion } from 'framer-motion'

const colorMap = {
  violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400',
  blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  green: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
  amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
  red: 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400',
}

const StatCard = ({ label, value, icon: Icon, color = 'violet', delay = 0 }) => {
  const colorClass = colorMap[color] || colorMap.violet
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow duration-300"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
      </div>
    </motion.div>
  )
}

export default StatCard
