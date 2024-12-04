import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Slides = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "SiteWatch Pro",
            subtitle: "Website Monitoring System",
            content: "College Major Project Presentation",
            type: "title"
        },
        {
            title: "Project Overview",
            content: [
                "A comprehensive website monitoring system",
                "Real-time monitoring of websites and services",
                "Instant notifications for downtime",
                "Beautiful, modern UI with responsive design"
            ]
        },
        {
            title: "Key Features",
            content: [
                {
                    subtitle: "Multiple Monitor Types",
                    points: [
                        "HTTP/HTTPS Monitoring",
                        "Ping Monitoring",
                        "Port Monitoring",
                        "Keyword Monitoring"
                    ]
                },
                {
                    subtitle: "Real-time Dashboard",
                    points: [
                        "Status overview",
                        "Response time graphs",
                        "Uptime statistics",
                        "Beautiful animations"
                    ]
                }
            ]
        },
        {
            title: "Technical Stack",
            content: [
                {
                    subtitle: "Frontend:",
                    points: [
                        "React.js",
                        "Tailwind CSS",
                        "Framer Motion",
                        "Recharts for graphs"
                    ]
                },
                {
                    subtitle: "Backend:",
                    points: [
                        "Node.js",
                        "Express.js",
                        "MongoDB",
                        "JWT Authentication"
                    ]
                }
            ]
        },
        // ... Add more slides following the same pattern
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const renderSlideContent = (slide) => {
        if (slide.type === "title") {
            return (
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {slide.title}
                    </h1>
                    <h2 className="text-3xl text-white mb-8">{slide.subtitle}</h2>
                    <p className="text-xl text-gray-400">{slide.content}</p>
                </div>
            );
        }

        return (
            <>
                <h2 className="text-4xl font-bold text-white mb-8">{slide.title}</h2>
                {Array.isArray(slide.content) ? (
                    <ul className="space-y-4">
                        {slide.content.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-xl text-gray-300"
                            >
                                {typeof item === 'string' ? (
                                    item
                                ) : (
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                                            {item.subtitle}
                                        </h3>
                                        <ul className="space-y-2 pl-6">
                                            {item.points.map((point, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (index + idx) * 0.1 }}
                                                    className="text-xl text-gray-300"
                                                >
                                                    • {point}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-xl text-gray-300">{slide.content}</p>
                )}
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto px-4 py-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-12 border border-gray-700 relative"
                    >
                        {renderSlideContent(slides[currentSlide])}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={prevSlide}
                        className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="text-gray-400">
                        {currentSlide + 1} / {slides.length}
                    </div>
                    <button
                        onClick={nextSlide}
                        className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slides; 