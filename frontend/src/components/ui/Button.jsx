import { motion } from 'framer-motion'

const variantMap = {
  primary: 'bg-violet-600 hover:bg-violet-700 text-white disabled:bg-violet-400',
  secondary: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200',
  danger: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300',
  ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
}

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: props.disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled || loading ? 1 : 0.97 }}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
        disabled:cursor-not-allowed
        ${variantMap[variant]} ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </motion.button>
  )
}

export default Button
