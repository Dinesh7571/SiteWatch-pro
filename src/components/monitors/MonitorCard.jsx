import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { PencilIcon } from '@heroicons/react/24/outline';
import EditMonitorForm from './EditMonitorForm';
import {useState }from 'react'
import {base_Url} from '../../../config';
const MonitorCard = ({ monitor, onDelete }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        onDelete();
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this monitor?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${base_Url}/api/monitors/${monitor._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                onDelete();
            } catch (error) {
                console.error('Error deleting monitor:', error);
                alert('Failed to delete monitor. Please try again.');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'up':
                return 'bg-green-900/30 text-green-400 border-green-500/50';
            case 'down':
                return 'bg-red-900/30 text-red-400 border-red-500/50';
            default:
                return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/50';
        }
    };

    const getStatusDot = (status, responseTime) => {
        // Define response time threshold (e.g., 1000ms = 1 second)
        const SLOW_THRESHOLD = 1000;

        if (status === 'up') {
            if (responseTime > SLOW_THRESHOLD) {
                return "bg-yellow-400 shadow-yellow-500/50"; // Yellow for slow response
            }
            return "bg-green-400 shadow-green-500/50"; // Green for good status
        }
        return "bg-red-400 shadow-red-500/50"; // Red for down status
    };

    return (
        <div className="relative group w-full">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700/50 backdrop-blur-xl hover:border-gray-700 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-0 justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {/* Pulsating Status Dot */}
                        <div className="relative flex">
                            <div className={`h-3 w-3 rounded-full ${getStatusDot(monitor.status, monitor.responseTime)} animate-pulse`}></div>
                            <div className={`absolute inset-0 h-3 w-3 rounded-full ${getStatusDot(monitor.status, monitor.responseTime)} animate-ping`}></div>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 break-all">
                            {monitor.name}
                        </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(monitor.status)} shadow-lg w-fit`}>
                        {monitor.status}
                    </span>
                </div>

                {/* Status Message */}
                <div className="text-sm mb-2">
                    {monitor.status === 'up' && monitor.responseTime > 1000 ? (
                        <span className="text-yellow-400">Slow Response Time</span>
                    ) : monitor.status === 'up' ? (
                        <span className="text-green-400">Operational</span>
                    ) : (
                        <span className="text-red-400">Down</span>
                    )}
                </div>

                <p className="text-gray-400 text-sm mb-4 break-all">{monitor.url}</p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="break-all">Last checked: {monitor.lastChecked ? moment(monitor.lastChecked).fromNow() : 'Never'}</span>
                    </div>
                    {monitor.responseTime && (
                        <div className="flex items-center text-sm text-gray-400">
                            <svg className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Response time: {monitor.responseTime}ms</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                    <Link
                        to={`/monitorDetails/${monitor._id}`}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base"
                    >
                        <span>View Details</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleEdit}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
                        >
                            <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <EditMonitorForm
                    monitor={monitor}
                    onSuccess={handleEditSuccess}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </div>
    );
};

export default MonitorCard;