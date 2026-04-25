import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/Dashboard'
import Employees from './pages/admin/Employees'
import AdminTasks from './pages/admin/Tasks'
import EmployeeDashboard from './pages/employee/Dashboard'
import MyTasks from './pages/employee/MyTasks'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth()

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="tasks" element={<AdminTasks />} />
        </Route>

        {/* Protected Employee Routes */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
        </Route>

        {/* Root Redirect */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
