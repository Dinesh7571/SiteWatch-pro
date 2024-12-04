import { useState, useEffect } from 'react';
import axios from 'axios';
import { XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { base_Url } from '../../../config';

const EditMonitorForm = ({ monitor, onSuccess, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        type: '',
        method: 'GET',
        interval: 5,
        notifications: {
            emails: [''],
            enabled: true,
            downtime: true,
            uptime: true
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (monitor) {
            setFormData({
                name: monitor.name,
                url: monitor.url,
                type: monitor.type,
                method: monitor.method || 'GET',
                interval: monitor.interval,
                notifications: {
                    emails: monitor.notifications?.emails || [''],
                    enabled: monitor.notifications?.enabled ?? true,
                    downtime: monitor.notifications?.downtime ?? true,
                    uptime: monitor.notifications?.uptime ?? true
                }
            });
        }
    }, [monitor]);

    const handleEmailChange = (index, value) => {
        const newEmails = [...formData.notifications.emails];
        newEmails[index] = value;
        setFormData({
            ...formData,
            notifications: {
                ...formData.notifications,
                emails: newEmails
            }
        });
    };

    const addEmailField = () => {
        setFormData({
            ...formData,
            notifications: {
                ...formData.notifications,
                emails: [...formData.notifications.emails, '']
            }
        });
    };

    const removeEmailField = (index) => {
        const newEmails = formData.notifications.emails.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            notifications: {
                ...formData.notifications,
                emails: newEmails
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.put(`${base_Url}/api/monitors/${monitor._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onSuccess();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update monitor');
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
                    <div className="relative bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white">Edit Monitor</h3>
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Monitor Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                />
                            </div>

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

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-300">Notification Emails</label>
                                {formData.notifications.emails.map((email, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="relative flex-1">
                                            <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                required
                                                className="pl-10 w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                placeholder="email@example.com"
                                                value={email}
                                                onChange={(e) => handleEmailChange(index, e.target.value)}
                                            />
                                        </div>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeEmailField(index)}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addEmailField}
                                    className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                    + Add another email
                                </button>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center space-x-3">
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
                                        className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                                    />
                                    <span className="text-sm text-gray-300">Enable notifications</span>
                                </label>

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

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Updating...' : 'Update Monitor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMonitorForm; 