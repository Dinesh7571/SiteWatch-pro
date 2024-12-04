import { motion } from 'framer-motion';
import { ScaleIcon, ShieldCheckIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const Terms = () => {
    const sections = [
        {
            title: 'Terms of Service',
            icon: DocumentTextIcon,
            content: [
                {
                    heading: 'Acceptance of Terms',
                    text: 'By accessing and using SiteWatch Pro, you accept and agree to be bound by the terms and conditions of this agreement.'
                },
                {
                    heading: 'User Responsibilities',
                    text: 'You are responsible for maintaining the security of your account and ensuring all login credentials remain confidential.'
                },
                {
                    heading: 'Service Usage',
                    text: 'Our services must be used in accordance with applicable laws and regulations. Any misuse may result in immediate termination.'
                }
            ]
        },
        {
            title: 'Subscription Terms',
            icon: ScaleIcon,
            content: [
                {
                    heading: 'Billing',
                    text: 'Subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable unless required by law.'
                },
                {
                    heading: 'Cancellation',
                    text: 'You may cancel your subscription at any time. Access will continue until the end of your billing period.'
                }
            ]
        },
        {
            title: 'Data Usage',
            icon: ShieldCheckIcon,
            content: [
                {
                    heading: 'Data Collection',
                    text: 'We collect and process data as described in our Privacy Policy to provide and improve our services.'
                },
                {
                    heading: 'Data Security',
                    text: 'We implement industry-standard security measures to protect your data and monitoring information.'
                }
            ]
        },
        {
            title: 'Service Updates',
            icon: ClockIcon,
            content: [
                {
                    heading: 'Modifications',
                    text: 'We reserve the right to modify or discontinue the service with reasonable notice to subscribers.'
                },
                {
                    heading: 'Updates',
                    text: 'Terms may be updated periodically. Continued use of the service constitutes acceptance of any changes.'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <DocumentTextIcon className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                    <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </motion.div>

                {/* Terms Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center mb-6">
                                    <section.icon className="h-8 w-8 text-blue-400 mr-3" />
                                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                </div>
                                <div className="space-y-6">
                                    {section.content.map((item, idx) => (
                                        <div key={idx} className="border-l-2 border-blue-500 pl-4">
                                            <h3 className="text-lg font-semibold text-white mb-2">{item.heading}</h3>
                                            <p className="text-gray-400">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400">
                        Questions about our terms? {' '}
                        <a href="#contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Contact our legal team
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms; 