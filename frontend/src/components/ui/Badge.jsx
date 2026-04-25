const statusMap = {
  pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
}

const Badge = ({ status }) => {
  const cls = statusMap[status] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
  const label = status === 'in-progress' ? 'In Progress' : status?.charAt(0).toUpperCase() + status?.slice(1)
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {label}
    </span>
  )
}

export default Badge
