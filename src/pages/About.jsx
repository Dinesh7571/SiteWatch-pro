import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    UserGroupIcon,
    GlobeAltIcon,
    SparklesIcon,
    RocketLaunchIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

const About = () => {
    const stats = [
        { label: 'Active Users', value: '10,000+' },
        { label: 'Websites Monitored', value: '50,000+' },
        { label: 'Countries', value: '150+' },
        { label: 'Uptime Rate', value: '99.9%' }
    ];

    const values = [
        {
            icon: RocketLaunchIcon,
            title: 'Innovation',
            description: 'Constantly pushing boundaries to provide cutting-edge monitoring solutions.'
        },
        {
            icon: HeartIcon,
            title: 'Customer Focus',
            description: 'Your success and satisfaction are at the heart of everything we do.'
        },
        {
            icon: UserGroupIcon,
            title: 'Collaboration',
            description: 'Working together to create better monitoring solutions for everyone.'
        }
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            name: 'Emma Davis',
            role: 'Head of Product',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
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
                        About
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            SiteWatch Pro
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We're on a mission to make website monitoring simple, reliable, and accessible to everyone.
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
                                    <value.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-400">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
                                    />
                                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                    <p className="text-gray-400">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

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
                            Join Our Team
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About; 