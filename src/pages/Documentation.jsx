import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpenIcon,
    CodeBracketIcon,
    CommandLineIcon,
    CogIcon,
    BellIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const Documentation = () => {
    const [activeSection, setActiveSection] = useState('getting-started');

    const sections = [
        {
            id: 'getting-started',
            name: 'Getting Started',
            icon: BookOpenIcon,
            content: [
                {
                    title: 'Introduction',
                    text: 'SiteWatch Pro is a comprehensive monitoring solution that helps you keep track of your websites and services. Get started with basic setup and configuration.'
                },
                {
                    title: 'Quick Start Guide',
                    text: '1. Create an account\n2. Add your first monitor\n3. Configure notifications\n4. View your dashboard'
                }
            ]
        },
        {
            id: 'monitors',
            name: 'Monitor Types',
            icon: CodeBracketIcon,
            content: [
                {
                    title: 'HTTP/HTTPS Monitoring',
                    text: 'Monitor web applications with advanced HTTP checks, including status code validation and response time tracking.'
                },
                {
                    title: 'Ping Monitoring',
                    text: 'Check server availability using ICMP ping requests to ensure your servers are responsive.'
                },
                {
                    title: 'Port Monitoring',
                    text: 'Monitor specific ports to verify service availability and connection times.'
                },
                {
                    title: 'Keyword Monitoring',
                    text: 'Track specific content on web pages by monitoring for keywords or phrases.'
                }
            ]
        },
        {
            id: 'notifications',
            name: 'Notifications',
            icon: BellIcon,
            content: [
                {
                    title: 'Email Notifications',
                    text: 'Configure email alerts for downtime and recovery events.'
                },
                {
                    title: 'Slack Integration',
                    text: 'Receive instant notifications in your Slack channels.'
                },
                {
                    title: 'Custom Webhooks',
                    text: 'Integrate with other services using custom webhooks.'
                }
            ]
        },
        {
            id: 'api',
            name: 'API Reference',
            icon: CommandLineIcon,
            content: [
                {
                    title: 'Authentication',
                    text: 'Use JWT tokens for API authentication. Include the token in the Authorization header.'
                },
                {
                    title: 'Endpoints',
                    text: 'Access monitors, analytics, and settings through our RESTful API endpoints.'
                }
            ]
        },
        {
            id: 'settings',
            name: 'Settings',
            icon: CogIcon,
            content: [
                {
                    title: 'Account Settings',
                    text: 'Manage your account preferences, timezone, and notification settings.'
                },
                {
                    title: 'Team Management',
                    text: 'Add team members and configure access permissions.'
                }
            ]
        },
        {
            id: 'faq',
            name: 'FAQ',
            icon: QuestionMarkCircleIcon,
            content: [
                {
                    title: 'Common Issues',
                    text: 'Find solutions to common monitoring and configuration issues.'
                },
                {
                    title: 'Best Practices',
                    text: 'Learn about monitoring best practices and optimization tips.'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-white mb-4"
                    >
                        Documentation
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400"
                    >
                        Everything you need to know about SiteWatch Pro
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-64 flex-shrink-0"
                    >
                        <nav className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        activeSection === section.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <section.icon className="h-5 w-5 mr-3" />
                                    {section.name}
                                </button>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex-1"
                    >
                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                            {sections.find(s => s.id === activeSection)?.content.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="mb-8 last:mb-0"
                                >
                                    <h2 className="text-xl font-bold text-white mb-4">{item.title}</h2>
                                    <p className="text-gray-300 whitespace-pre-line">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Documentation; 