import { useState, useEffect } from 'react'
import axios from 'axios'
import MonitorCard from '../components/monitors/MonitorCard'
import MonitorForm from '../components/monitors/MonitorForm'
import Sidebar from '../components/layout/Sidebar'
import { motion } from 'framer-motion'
import { base_Url } from '../../config'
import { 
    ArrowUpIcon, 
    ArrowDownIcon, 
    ClockIcon, 
    ServerIcon,
    ChartBarIcon,
    PlusIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [monitors, setMonitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddMonitor, setShowAddMonitor] = useState(false)
  const [error, setError] = useState(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const fetchMonitors = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${base_Url}/api/monitors`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMonitors(response.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching monitors:', error)
      setError('Failed to fetch monitors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMonitors()
  }, [])

  const handleAddSuccess = () => {
    setShowAddMonitor(false)
    fetchMonitors()
  }

  const handleDeleteSuccess = () => {
    fetchMonitors()
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const StatCard = ({ title, value, icon: Icon, gradient, border }) => (
    <motion.div 
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`absolute -inset-0.5 ${gradient} rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000`}></div>
      <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${border} bg-opacity-10`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block md:w-64 min-h-screen">
        <div className="fixed h-full w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <main className="min-h-screen pt-16 md:pt-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                  <p className="text-gray-400">Monitor and manage your services</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddMonitor(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Monitor
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
            >
              <StatCard
                title="Total Monitors"
                value={monitors.length}
                icon={ServerIcon}
                gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
                border="bg-blue-500"
              />
              <StatCard
                title="Up Monitors"
                value={monitors.filter(m => m.status === 'up').length}
                icon={ArrowUpIcon}
                gradient="bg-gradient-to-r from-green-600 to-emerald-600"
                border="bg-green-500"
              />
              <StatCard
                title="Down Monitors"
                value={monitors.filter(m => m.status === 'down').length}
                icon={ArrowDownIcon}
                gradient="bg-gradient-to-r from-red-600 to-pink-600"
                border="bg-red-500"
              />
              <StatCard
                title="Overall Uptime"
                value={`${(monitors.filter(m => m.status === 'up').length / monitors.length * 100).toFixed(1)}%`}
                icon={ChartBarIcon}
                gradient="bg-gradient-to-r from-purple-600 to-pink-600"
                border="bg-purple-500"
              />
            </motion.div>

            {/* Monitors Grid */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                  <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin absolute top-0 left-0 rotate-45"></div>
                </div>
              </div>
            ) : monitors.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">No monitors found</div>
                <button
                  onClick={() => setShowAddMonitor(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Create your first monitor
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {monitors.map((monitor, index) => (
                  <motion.div
                    key={monitor._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MonitorCard
                      monitor={monitor}
                      onDelete={handleDeleteSuccess}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {showAddMonitor && (
        <MonitorForm 
          onSuccess={handleAddSuccess} 
          onClose={() => setShowAddMonitor(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;