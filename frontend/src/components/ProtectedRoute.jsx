import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) return null // wait for rehydration

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (role && user?.role !== role) {
    // Redirect to correct dashboard
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/employee'} replace />
  }

  return children
}

export default ProtectedRoute
