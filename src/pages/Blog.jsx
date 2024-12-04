import { motion } from 'framer-motion';

const Blog = () => {
    const posts = [
        {
            title: 'Monitoring Best Practices for 2024',
            excerpt: 'Learn about the latest monitoring trends and how to implement them effectively.',
            author: 'Sarah Johnson',
            date: 'March 15, 2024',
            category: 'Best Practices',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'The Future of Website Monitoring',
            excerpt: 'Discover how AI and machine learning are transforming website monitoring.',
            author: 'Michael Chen',
            date: 'March 10, 2024',
            category: 'Technology',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        // Add more blog posts...
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Latest Updates & Insights
                    </h1>
                    <p className="text-xl text-gray-400">
                        Stay up to date with the latest monitoring trends and tips
                    </p>
                </motion.div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <span className="text-sm text-blue-400">{post.category}</span>
                                    <h2 className="text-xl font-bold text-white mt-2 mb-3">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{post.author}</span>
                                        <span className="text-sm text-gray-500">{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog; 