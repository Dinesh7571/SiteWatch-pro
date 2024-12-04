import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PublicRoute