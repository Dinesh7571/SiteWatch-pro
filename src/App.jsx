import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'
import Navbar from './components/layout/Navbar'

// Pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import MonitorDetails from './components/monitors/MonitorDetails'
import Documentation from './pages/Documentation'
import Features from './pages/Features'
import Blog from './pages/Blog'
import About from './pages/About'
import Careers from './pages/Careers'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Security from './pages/Security'
import Slides from './pages/Slides'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <div className="h-[7px]"></div>
          <main className="pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                } 
              />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/monitorDetails/:id" 
                element={
                  <ProtectedRoute>
                    <MonitorDetails />
                  </ProtectedRoute>
                } 
              />
              <Route path="/documentation" element={<Documentation />} />

              {/* Footer Pages */}
              <Route path="/features" element={<Features />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/slides" element={<Slides />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App