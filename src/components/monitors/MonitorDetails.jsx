import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Line } from 'recharts';
import {
    ClockIcon,
    GlobeAltIcon,
    CheckCircleIcon,
    XCircleIcon,
    BellIcon,
    ChartBarIcon,
    ArrowLeftIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { motion } from 'framer-motion';
import { base_Url } from '../../../config';

const styles = {
    statusBar: {
        height: '60px',
        minWidth: '30px',
        flex: '1'
    }
};

const MonitorDetails = () => {
    const { id } = useParams();
    const [monitor, setMonitor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState('24h');
    const [graphData, setGraphData] = useState([]);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${base_Url}/api/monitors/${id}/history`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setGraphData(response.data);
                console.log('History data:', response.data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        if (monitor) {
            fetchHistory();
        }
    }, [monitor, id]);

    useEffect(() => {
        const fetchMonitorDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${base_Url}/api/monitors/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMonitor(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch monitor details');
            } finally {
                setLoading(false);
            }
        };

        fetchMonitorDetails();
    }, [id]);

    useEffect(() => {
        const fetchMonitorHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${base_Url}/api/monitors/${id}/history`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                const formattedData = response.data.map(record => ({
                    time: moment(record.timestamp).format('HH:mm DD/MM'),
                    responseTime: record.responseTime,
                    status: record.status
                })).slice(-30);

                setHistoryData(formattedData);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        if (monitor) {
            fetchMonitorHistory();
        }
    }, [monitor]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                    <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin absolute top-0 left-0 rotate-45"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-red-400">{error}</div>
            </div>
        );
    }

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

    const StatusIndicator = ({ status }) => (
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(status)}`}>
            {status === 'up' ? (
                <CheckCircleIcon className="w-5 h-5" />
            ) : (
                <XCircleIcon className="w-5 h-5" />
            )}
            <span className="font-medium capitalize">{status}</span>
        </div>
    );

    const DetailCard = ({ title, value, icon: Icon, className = "" }) => (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3 mb-2">
                <Icon className="w-5 h-5 text-gray-400" />
                <h3 className="text-gray-400 font-medium">{title}</h3>
            </div>
            <p className={`text-lg font-semibold ${className}`}>{value}</p>
        </div>
    );

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg">
                    <p className="text-gray-300 mb-2">{`Time: ${label}`}</p>
                    <p className="text-blue-400">{`Response Time: ${payload[0].value}ms`}</p>
                    <p className={payload[0].payload.status === 'up' ? 'text-green-400' : 'text-red-400'}>
                        Status: {payload[0].payload.status}
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderResponseTimeGraph = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Response Time History</h2>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-400">Up</span>
                    </div>
                    <div className="flex items-center ml-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-400">Down</span>
                    </div>
                </div>
            </div>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historyData}>
                        <defs>
                            <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                            dataKey="time" 
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                            interval="preserveStartEnd"
                        />
                        <YAxis 
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                            label={{ 
                                value: 'Response Time (ms)', 
                                angle: -90, 
                                position: 'insideLeft',
                                fill: '#9CA3AF'
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="responseTime"
                            stroke="#3B82F6"
                            fill="url(#responseTimeGradient)"
                            strokeWidth={2}
                            dot={{ 
                                fill: '#3B82F6',
                                stroke: '#1E40AF',
                                strokeWidth: 2,
                                r: 4,
                                fillOpacity: 1
                            }}
                            activeDot={{ 
                                r: 8,
                                fill: '#3B82F6',
                                stroke: '#1E40AF',
                                strokeWidth: 2
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
                Showing last 30 monitoring results
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors duration-200"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{monitor.name}</h1>
                            <p className="text-gray-400 break-all">{monitor.url}</p>
                        </div>
                        <StatusIndicator status={monitor.status} />
                    </div>
                </div>

                {/* Status History - More Compact */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-white">Status History</h2>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                                <span className="text-xs text-gray-400">Up</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
                                <span className="text-xs text-gray-400">Down</span>
                            </div>
                        </div>
                    </div>
                    
                    {graphData.length > 0 ? (
                        <>
                            <div className="relative">
                                <div className="flex space-x-0.5 overflow-x-auto">
                                    {graphData.map((record, index) => (
                                        <div 
                                            key={index} 
                                            className="relative group"
                                            style={{ height: '40px', minWidth: '20px', flex: '1' }}
                                        >
                                            <div 
                                                className={`h-full rounded transition-all duration-300 ${
                                                    record.status === 'up' 
                                                        ? 'bg-green-500/20 border-green-500/50' 
                                                        : 'bg-red-500/20 border-red-500/50'
                                                } border`}
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div 
                                                        className={`w-1.5 h-1.5 rounded-full ${
                                                            record.status === 'up' 
                                                                ? 'bg-green-400' 
                                                                : 'bg-red-400'
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Smaller Tooltip */}
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                                                <div className="bg-gray-800 text-xs rounded py-1 px-2 shadow-lg border border-gray-700 whitespace-nowrap">
                                                    <p className="text-gray-300">{record.time}</p>
                                                    <p className={record.status === 'up' ? 'text-green-400' : 'text-red-400'}>
                                                        {record.responseTime}ms
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline Labels */}
                            <div className="flex justify-between mt-1 text-xs text-gray-400">
                                <span>30 checks ago</span>
                                <span>Now</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-sm text-gray-400 py-4">
                            No history data available yet
                        </div>
                    )}
                </div>

                {/* Stats Grid - More Compact */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <DetailCard
                        title="Response Time"
                        value={monitor.responseTime ? `${monitor.responseTime}ms` : 'N/A'}
                        icon={ClockIcon}
                        className="text-blue-400"
                    />
                    <DetailCard
                        title="Last Checked"
                        value={monitor.lastChecked ? moment(monitor.lastChecked).fromNow() : 'Never'}
                        icon={ChartBarIcon}
                        className="text-purple-400"
                    />
                    <DetailCard
                        title="Monitor Type"
                        value={monitor.type?.toUpperCase() || 'HTTP'}
                        icon={GlobeAltIcon}
                        className="text-indigo-400"
                    />
                    <DetailCard
                        title="Check Interval"
                        value="Every 3 min"
                        icon={ClockIcon}
                        className="text-blue-400"
                    />
                </div>

                {/* Response Time Graph - More Compact */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
                    <h2 className="text-lg font-bold text-white mb-3">Response Time Trend</h2>
                    <div className="h-[200px]"> {/* Reduced height */}
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historyData}>
                                <defs>
                                    <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis 
                                    dataKey="time" 
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#9CA3AF' }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis 
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#9CA3AF' }}
                                    label={{ 
                                        value: 'Response Time (ms)', 
                                        angle: -90, 
                                        position: 'insideLeft',
                                        fill: '#9CA3AF'
                                    }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="responseTime"
                                    stroke="#3B82F6"
                                    fill="url(#responseTimeGradient)"
                                    strokeWidth={2}
                                    dot={{ 
                                        fill: '#3B82F6',
                                        stroke: '#1E40AF',
                                        strokeWidth: 2,
                                        r: 4,
                                        fillOpacity: 1
                                    }}
                                    activeDot={{ 
                                        r: 8,
                                        fill: '#3B82F6',
                                        stroke: '#1E40AF',
                                        strokeWidth: 2
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Notification Settings - More Compact */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-3">
                        <BellIcon className="w-5 h-5 text-gray-400" />
                        <h2 className="text-lg font-bold text-white">Notifications</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white">Email Alerts</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    monitor.notifications?.enabled 
                                        ? 'bg-green-900/30 text-green-400' 
                                        : 'bg-gray-700 text-gray-400'
                                }`}>
                                    {monitor.notifications?.enabled ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                        {monitor.notifications?.emails?.map((email, index) => (
                            <div key={index} className="bg-gray-700/30 rounded-lg p-3">
                                <span className="text-sm text-gray-400 break-all">{email}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Response Details with Enhanced Styling */}
                {monitor.responseCode && (
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                            <h2 className="text-xl font-bold text-white mb-4">Response Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-700/30 rounded-lg">
                                    <h3 className="text-gray-400 font-medium mb-2">Response Code</h3>
                                    <p className="text-white text-lg">{monitor.responseCode}</p>
                                </div>
                                <div className="p-4 bg-gray-700/30 rounded-lg">
                                    <h3 className="text-gray-400 font-medium mb-2">Response Size</h3>
                                    <p className="text-white text-lg">
                                        {monitor.responseSize ? `${(monitor.responseSize / 1024).toFixed(2)} KB` : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonitorDetails;
