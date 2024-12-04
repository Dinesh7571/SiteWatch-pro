import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const Privacy = () => {
    const sections = [
        {
            title: 'Information We Collect',
            content: 'We collect information that you provide directly to us, including when you create an account, use our services, or contact us for support.'
        },
        {
            title: 'How We Use Your Information',
            content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to detect and prevent fraud.'
        },
        {
            title: 'Information Sharing',
            content: 'We do not sell your personal information. We share your information only with service providers who assist in providing our services.'
        },
        {
            title: 'Data Security',
            content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <ShieldCheckIcon className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                    <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </motion.div>

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
                                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                                <p className="text-gray-400">{section.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400">
                        If you have any questions about our Privacy Policy, please{' '}
                        <a href="#contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                            contact us
                        </a>
                        .
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy; 