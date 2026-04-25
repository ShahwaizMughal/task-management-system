import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'

const EmptyState = ({ title = 'No data found', description = 'Nothing to show here yet.', action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Inbox size={28} className="text-slate-400 dark:text-slate-600" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  )
}

export default EmptyState
