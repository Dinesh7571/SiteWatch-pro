import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    BellAlertIcon,
    ClockIcon,
    ShieldCheckIcon,
    CogIcon,
    ChartPieIcon,
    DevicePhoneMobileIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const Features = () => {
    const features = [
        {
            title: 'Real-time Monitoring',
            description: 'Monitor your services 24/7 with instant status updates and alerts.',
            icon: ChartBarIcon,
            color: 'from-blue-500 to-indigo-500'
        },
        {
            title: 'Smart Notifications',
            description: 'Get instant alerts through email, Slack, or custom webhooks.',
            icon: BellAlertIcon,
            color: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Flexible Scheduling',
            description: 'Customize monitoring intervals to match your needs.',
            icon: ClockIcon,
            color: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Advanced Security',
            description: 'SSL certificate monitoring and security checks included.',
            icon: ShieldCheckIcon,
            color: 'from-red-500 to-orange-500'
        },
        {
            title: 'Custom Integration',
            description: 'Integrate with your existing tools and workflows.',
            icon: CogIcon,
            color: 'from-yellow-500 to-amber-500'
        },
        {
            title: 'Detailed Analytics',
            description: 'Get insights with comprehensive performance metrics.',
            icon: ChartPieIcon,
            color: 'from-cyan-500 to-blue-500'
        },
        {
            title: 'Mobile Friendly',
            description: 'Monitor your services on the go with our mobile app.',
            icon: DevicePhoneMobileIcon,
            color: 'from-teal-500 to-green-500'
        },
        {
            title: 'Automated Recovery',
            description: 'Automatic service recovery actions when issues are detected.',
            icon: ArrowPathIcon,
            color: 'from-pink-500 to-rose-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Powerful Features for Modern
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Monitoring Solutions
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Everything you need to monitor your services effectively and keep your systems running smoothly.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000`}></div>
                            <div className="relative bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-2.5 mb-4`}>
                                    <feature.icon className="w-full h-full text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="relative group inline-block">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                        <button className="relative px-8 py-4 bg-gray-800 rounded-lg text-white font-medium group-hover:bg-gray-700 transition duration-200">
                            Get Started Today
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Features; 