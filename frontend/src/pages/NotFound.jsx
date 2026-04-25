import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileQuestion, Home } from 'lucide-react'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400 mb-8"
      >
        <FileQuestion size={48} />
      </motion.div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">404 - Not Found</h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mb-8">
        Oops! The page you're looking for doesn't exist or has been moved to a different location.
      </p>
      <Link to="/">
        <Button icon={Home}>Back to Dashboard</Button>
      </Link>
    </div>
  )
}

export default NotFound
