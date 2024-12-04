import { motion } from 'framer-motion';
import { 
    ShieldCheckIcon, 
    LockClosedIcon, 
    ServerIcon, 
    KeyIcon,
    EyeSlashIcon,
    CloudIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

const Security = () => {
    const features = [
        {
            title: 'Data Encryption',
            description: 'All data is encrypted in transit and at rest using industry-standard encryption protocols.',
            icon: LockClosedIcon,
            color: 'from-blue-500 to-indigo-500'
        },
        {
            title: 'Secure Infrastructure',
            description: 'Our infrastructure is hosted in SOC 2 compliant data centers with 24/7 security.',
            icon: ServerIcon,
            color: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Access Control',
            description: 'Role-based access control and multi-factor authentication for enhanced security.',
            icon: KeyIcon,
            color: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Privacy Protection',
            description: 'Your monitoring data is kept private and never shared with third parties.',
            icon: EyeSlashIcon,
            color: 'from-red-500 to-orange-500'
        },
        {
            title: 'Regular Audits',
            description: 'Continuous security assessments and penetration testing by third-party experts.',
            icon: ShieldCheckIcon,
            color: 'from-yellow-500 to-amber-500'
        },
        {
            title: 'Backup & Recovery',
            description: 'Automated backups and disaster recovery procedures to ensure data safety.',
            icon: CloudIcon,
            color: 'from-teal-500 to-cyan-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <ShieldCheckIcon className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Security First Approach
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Your security is our top priority. We implement multiple layers of protection to keep your data safe.
                    </p>
                </motion.div>

                {/* Security Features Grid */}
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
                                <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Security Badge Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-900/30 border border-green-500/50 rounded-full">
                        <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                        <span className="text-green-400">SOC 2 Type II Certified</span>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="#security-whitepaper"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        Download Security Whitepaper
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Security; 