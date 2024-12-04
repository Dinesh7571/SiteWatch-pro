import { motion } from 'framer-motion';
import { BriefcaseIcon, GlobeAltIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Careers = () => {
    const positions = [
        {
            title: 'Senior Backend Developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            description: 'Join our core team to build and scale our monitoring infrastructure.'
        },
        {
            title: 'Frontend Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            description: 'Create beautiful and intuitive interfaces for our monitoring platform.'
        },
        {
            title: 'DevOps Engineer',
            department: 'Operations',
            location: 'Remote',
            type: 'Full-time',
            description: 'Help us maintain and improve our cloud infrastructure.'
        }
    ];

    const benefits = [
        {
            title: 'Remote First',
            description: 'Work from anywhere in the world',
            icon: GlobeAltIcon
        },
        {
            title: 'Great Team',
            description: 'Collaborate with talented individuals',
            icon: UserGroupIcon
        },
        {
            title: 'Growth',
            description: 'Continuous learning and development',
            icon: SparklesIcon
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
                        Join Our Team at
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            SiteWatch Pro
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Help us build the future of website monitoring and make the web more reliable.
                    </p>
                </motion.div>

                {/* Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <benefit.icon className="h-12 w-12 text-blue-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Open Positions</h2>
                    <div className="space-y-6">
                        {positions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative bg-gray-800 rounded-lg p-6 border border-gray-700">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{position.title}</h3>
                                            <p className="text-gray-400 mb-4">{position.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                                    {position.department}
                                                </span>
                                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                                    {position.location}
                                                </span>
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                                    {position.type}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Careers; 