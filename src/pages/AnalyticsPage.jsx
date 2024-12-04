import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { base_Url } from '../../config';

const AnalyticsPage = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('24h');
    const [error, setError] = useState(null);

    const COLORS = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B'];

    const fetchStats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${base_Url}/api/analytics/uptime?range=${timeRange}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setError('Failed to load analytics data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [timeRange]);

    const StatCard = ({ title, value, icon: Icon, color, secondaryValue }) => (
        <div className="relative group">
            <div className={`absolute -inset-0.5 ${color} rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000`}></div>
            <div className="relative bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Icon className="h-6 w-6 text-gray-400 mr-3" />
                        <h3 className="text-lg font-medium text-gray-300">{title}</h3>
                    </div>
                </div>
                <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-white">{value}</p>
                    {secondaryValue && (
                        <p className="ml-2 text-sm text-gray-400">{secondaryValue}</p>
                    )}
                </div>
            </div>
        </div>
    );

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

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-400">Monitor your services performance and uptime</p>
                </div>

                {/* Time Range Selector */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {['24h', '7d', '30d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                timeRange === range
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Uptime"
                        value={`${stats.uptime || 0}%`}
                        icon={ArrowUpIcon}
                        color="bg-gradient-to-r from-green-500 to-emerald-500"
                    />
                    <StatCard
                        title="Average Response"
                        value={`${stats.avgResponse || 0}ms`}
                        icon={ClockIcon}
                        color="bg-gradient-to-r from-blue-500 to-indigo-500"
                    />
                    <StatCard
                        title="Incidents"
                        value={stats.incidents || 0}
                        icon={ExclamationCircleIcon}
                        color="bg-gradient-to-r from-red-500 to-pink-500"
                        secondaryValue="Last 24h"
                    />
                    <StatCard
                        title="Monitors"
                        value={stats.totalMonitors || 0}
                        icon={ArrowDownIcon}
                        color="bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Response Time Chart */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-medium text-white mb-6">Response Time Trend</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.responseTimeTrend || []}>
                                    <defs>
                                        <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="time" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3B82F6"
                                        fill="url(#responseTimeGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Uptime Distribution Chart */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-medium text-white mb-6">Uptime Distribution</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.uptimeDistribution || []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {(stats.uptimeDistribution || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage; 