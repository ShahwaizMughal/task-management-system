const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <div className="card overflow-hidden">
      <div className="p-6 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full w-2/3" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-full w-1/2" />
            </div>
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonLoader
