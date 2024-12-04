import { useState } from 'react';
import axios from 'axios';
import { XMarkIcon, PlusIcon, EnvelopeIcon, GlobeAltIcon, ServerIcon, SignalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { base_Url } from '../../../config';

const MONITOR_TYPES = {
    http: {
        name: 'HTTP/HTTPS',
        icon: GlobeAltIcon,
        description: 'Monitor websites and HTTP/HTTPS endpoints',
        fields: ['url', 'method', 'headers', 'expectedStatus']
    },
    ping: {
        name: 'Ping',
        icon: SignalIcon,
        description: 'Monitor server availability using ICMP ping',
        fields: ['host']
    },
    port: {
        name: 'Port',
        icon: ServerIcon,
        description: 'Monitor specific port on a server',
        fields: ['host', 'port']
    },
    keyword: {
        name: 'Keyword',
        icon: MagnifyingGlassIcon,
        description: 'Monitor for specific keywords on a webpage',
        fields: ['url', 'keywords', 'shouldExist']
    }
};

const MonitorForm = ({ onSuccess, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        url: '',
        host: '',
        port: '',
        method: 'GET',
        headers: '',
        expectedStatus: '200',
        keywords: [''],
        shouldExist: true,
        notifications: {
            emails: [''],
            enabled: false,
            downtime: true,
            uptime: true
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    const handleTypeSelect = (type) => {
        setFormData(prev => ({ ...prev, type }));
        setStep(2);
    };

    const renderTypeSelection = () => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(MONITOR_TYPES).map(([type, details]) => (
                <button
                    key={type}
                    onClick={() => handleTypeSelect(type)}
                    className="relative group p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                    <div className="relative">
                        <details.icon className="w-8 h-8 text-blue-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">{details.name}</h3>
                        <p className="text-sm text-gray-400">{details.description}</p>
                    </div>
                </button>
            ))}
        </div>
    );

    const renderMonitorFields = () => {
        const fields = MONITOR_TYPES[formData.type]?.fields || [];
        
        return (
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Monitor Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter monitor name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                {fields.includes('url') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
                        <input
                            type="url"
                            required
                            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="https://example.com"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        />
                    </div>
                )}

                {fields.includes('host') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Host</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="example.com or IP address"
                            value={formData.host}
                            onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                        />
                    </div>
                )}

                {fields.includes('port') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Port</label>
                        <input
                            type="number"
                            required
                            min="1"
                            max="65535"
                            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Port number (e.g., 80, 443)"
                            value={formData.port}
                            onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                        />
                    </div>
                )}

                {fields.includes('method') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">HTTP Method</label>
                        <select
                            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.method}
                            onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                        >
                            {['GET', 'POST', 'PUT', 'DELETE', 'HEAD'].map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Check Interval (minutes)</label>
                    <input
                        type="number"
                        required
                        min="1"
                        max="1440"
                        className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.interval}
                        onChange={(e) => setFormData({ ...formData, interval: parseInt(e.target.value) })}
                    />
                </div>

                {fields.includes('keywords') && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Keywords to Monitor</label>
                        {formData.keywords.map((keyword, index) => (
                            <div key={index} className="flex gap-2">
                                <div className="relative flex-1">
                                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter keyword to monitor"
                                        className="pl-10 w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={keyword}
                                        onChange={(e) => {
                                            const newKeywords = [...formData.keywords];
                                            newKeywords[index] = e.target.value;
                                            setFormData({
                                                ...formData,
                                                keywords: newKeywords
                                            });
                                        }}
                                    />
                                </div>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newKeywords = formData.keywords.filter((_, i) => i !== index);
                                            setFormData({
                                                ...formData,
                                                keywords: newKeywords
                                            });
                                        }}
                                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    ...formData,
                                    keywords: [...formData.keywords, '']
                                });
                            }}
                            className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                            <PlusIcon className="h-4 w-4 mr-1" />
                            Add another keyword
                        </button>

                        <div className="mt-4">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={formData.shouldExist}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        shouldExist: e.target.checked
                                    })}
                                    className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                                />
                                <span className="text-sm text-gray-300">
                                    Alert when keywords {formData.shouldExist ? 'disappear' : 'appear'}
                                </span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Notification Settings */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-300">
                            Email Notifications
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.notifications.enabled}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    notifications: {
                                        ...formData.notifications,
                                        enabled: e.target.checked
                                    }
                                })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    {formData.notifications.enabled && (
                        <>
                            {formData.notifications.emails.map((email, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter email for notifications"
                                            className="pl-10 w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            value={email}
                                            onChange={(e) => {
                                                const newEmails = [...formData.notifications.emails];
                                                newEmails[index] = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    notifications: {
                                                        ...formData.notifications,
                                                        emails: newEmails
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newEmails = formData.notifications.emails.filter((_, i) => i !== index);
                                                setFormData({
                                                    ...formData,
                                                    notifications: {
                                                        ...formData.notifications,
                                                        emails: newEmails
                                                    }
                                                });
                                            }}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        notifications: {
                                            ...formData.notifications,
                                            emails: [...formData.notifications.emails, '']
                                        }
                                    });
                                }}
                                className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Add another email
                            </button>

                            <div className="space-y-3 mt-4">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.notifications.downtime}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            notifications: {
                                                ...formData.notifications,
                                                downtime: e.target.checked
                                            }
                                        })}
                                        className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                                    />
                                    <span className="text-sm text-gray-300">Notify on downtime</span>
                                </label>

                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.notifications.uptime}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            notifications: {
                                                ...formData.notifications,
                                                uptime: e.target.checked
                                            }
                                        })}
                                        className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                                    />
                                    <span className="text-sm text-gray-300">Notify when service is restored</span>
                                </label>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const monitorData = { ...formData };

            // Filter out empty email addresses
            monitorData.notifications.emails = monitorData.notifications.emails.filter(email => email.trim() !== '');

            // Transform data based on monitor type
            if (formData.type === 'ping' || formData.type === 'port') {
                monitorData.url = `${formData.host}${formData.type === 'port' ? `:${formData.port}` : ''}`;
            }

            await axios.post(`${base_Url}/api/monitors`, monitorData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onSuccess();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create monitor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-700">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-white">
                                        {step === 1 ? 'Select Monitor Type' : 'Configure Monitor'}
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {error && (
                                    <div className="mb-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {step === 1 ? renderTypeSelection() : renderMonitorFields()}

                                    <div className="mt-6 flex justify-between">
                                        {step === 2 && (
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                                            >
                                                Back
                                            </button>
                                        )}
                                        {step === 2 && (
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                {loading ? 'Creating...' : 'Create Monitor'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitorForm; 