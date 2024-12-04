import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    BellIcon,
    ClockIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    Cog6ToothIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import { base_Url } from '../../config';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        notifications: {
            email: {
                enabled: true,
                addresses: ['']
            },
            slack: {
                enabled: false,
                webhook: ''
            }
        },
        defaultCheckInterval: 5,
        timezone: 'UTC',
        theme: 'dark'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('notifications');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${base_Url}/api/settings`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSettings(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${base_Url}/api/settings`, settings, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Settings updated successfully');
        } catch (error) {
            console.error('Error updating settings:', error);
            toast.error('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    const addEmailField = () => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                email: {
                    ...prev.notifications.email,
                    addresses: [...prev.notifications.email.addresses, '']
                }
            }
        }));
    };

    const removeEmailField = (index) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                email: {
                    ...prev.notifications.email,
                    addresses: prev.notifications.email.addresses.filter((_, i) => i !== index)
                }
            }
        }));
    };

    const handleEmailChange = (index, value) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                email: {
                    ...prev.notifications.email,
                    addresses: prev.notifications.email.addresses.map((email, i) => 
                        i === index ? value : email
                    )
                }
            }
        }));
    };

    const tabs = [
        { id: 'notifications', name: 'Notifications', icon: BellIcon },
        { id: 'monitoring', name: 'Monitoring', icon: ClockIcon },
        { id: 'account', name: 'Account', icon: UserCircleIcon },
        { id: 'advanced', name: 'Advanced', icon: Cog6ToothIcon }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'notifications':
                return (
                    <div className="space-y-6">
                        {/* Email Notifications */}
                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <EnvelopeIcon className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.email.enabled}
                                        onChange={(e) => setSettings(prev => ({
                                            ...prev,
                                            notifications: {
                                                ...prev.notifications,
                                                email: {
                                                    ...prev.notifications.email,
                                                    enabled: e.target.checked
                                                }
                                            }
                                        }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                </label>
                            </div>

                            <div className="space-y-4">
                                {settings.notifications.email.addresses.map((email, index) => (
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
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addEmailField}
                                    className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add another email
                                </button>
                            </div>
                        </div>

                        {/* Slack Notifications */}
                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <svg className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                                    </svg>
                                    <h3 className="text-lg font-semibold text-white">Slack Integration</h3>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.slack.enabled}
                                        onChange={(e) => setSettings(prev => ({
                                            ...prev,
                                            notifications: {
                                                ...prev.notifications,
                                                slack: {
                                                    ...prev.notifications.slack,
                                                    enabled: e.target.checked
                                                }
                                            }
                                        }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                                </label>
                            </div>

                            {settings.notifications.slack.enabled && (
                                <div className="space-y-4">
                                    <input
                                        type="url"
                                        placeholder="Slack Webhook URL"
                                        className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                        value={settings.notifications.slack.webhook}
                                        onChange={(e) => setSettings(prev => ({
                                            ...prev,
                                            notifications: {
                                                ...prev.notifications,
                                                slack: {
                                                    ...prev.notifications.slack,
                                                    webhook: e.target.value
                                                }
                                            }
                                        }))}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'monitoring':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center space-x-3 mb-6">
                                <ClockIcon className="h-6 w-6 text-blue-400" />
                                <h3 className="text-lg font-semibold text-white">Default Check Interval</h3>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    min="1"
                                    max="1440"
                                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={settings.defaultCheckInterval}
                                    onChange={(e) => setSettings(prev => ({
                                        ...prev,
                                        defaultCheckInterval: parseInt(e.target.value)
                                    }))}
                                />
                                <p className="mt-2 text-sm text-gray-400">Time in minutes between each check</p>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center space-x-3 mb-6">
                                <GlobeAltIcon className="h-6 w-6 text-blue-400" />
                                <h3 className="text-lg font-semibold text-white">Timezone</h3>
                            </div>
                            <select
                                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={settings.timezone}
                                onChange={(e) => setSettings(prev => ({
                                    ...prev,
                                    timezone: e.target.value
                                }))}
                            >
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">Eastern Time</option>
                                <option value="America/Chicago">Central Time</option>
                                <option value="America/Denver">Mountain Time</option>
                                <option value="America/Los_Angeles">Pacific Time</option>
                            </select>
                        </div>
                    </div>
                );
            // Add more cases for other tabs
            default:
                return null;
        }
    };

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                }`}
                            >
                                <tab.icon className="h-5 w-5" />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit}>
                            {renderTabContent()}

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className={`px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                                        saving ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02]'
                                    }`}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage; 
 