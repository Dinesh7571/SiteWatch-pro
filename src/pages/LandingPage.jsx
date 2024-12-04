import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { 
    GlobeAltIcon, 
    SignalIcon, 
    ServerIcon, 
    MagnifyingGlassIcon,
    ChartBarIcon,
    BellAlertIcon,
    ClockIcon
} from '@heroicons/react/24/outline'
import DemoMonitor from '../assets/DemoMonitor.png'
import { motion } from 'framer-motion'
import AnimatedBackground from '../components/common/AnimatedBackground';
import GlassmorphicShapes from '../components/common/GlassmorphicShapes';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useAuth();
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const monitorTypes = [
    {
      title: 'HTTP/HTTPS Monitoring',
      description: 'Monitor your websites and web applications with advanced HTTP checks.',
      icon: GlobeAltIcon,
      features: ['Status code validation', 'Response time tracking', 'SSL certificate monitoring']
    },
    {
      title: 'Ping Monitoring',
      description: 'Check server availability using ICMP ping requests.',
      icon: SignalIcon,
      features: ['Server uptime tracking', 'Network latency monitoring', 'Real-time availability stats']
    },
    {
      title: 'Port Monitoring',
      description: 'Monitor specific ports to ensure your services are accessible.',
      icon: ServerIcon,
      features: ['Custom port checking', 'Service availability', 'Connection time tracking']
    },
    {
      title: 'Keyword Monitoring',
      description: 'Monitor web content for specific keywords or changes.',
      icon: MagnifyingGlassIcon,
      features: ['Content change detection', 'Keyword presence/absence', 'HTML content monitoring']
    }
  ]

  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Get instant updates on your services status with real-time monitoring.',
      icon: ChartBarIcon
    },
    {
      title: 'Instant Notifications',
      description: 'Receive immediate alerts via email when issues are detected.',
      icon: BellAlertIcon
    },
    {
      title: 'Flexible Intervals',
      description: 'Customize monitoring intervals to suit your needs.',
      icon: ClockIcon
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechCorp",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "UptimeMonitor has transformed how we handle our service monitoring. The instant alerts have helped us reduce downtime by 80%."
    },
    {
      name: "Michael Chen", 
      role: "DevOps Lead at CloudScale",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "The multi-channel alerts are a game-changer. Our team gets notified instantly through their preferred channels."
    },
    {
      name: "Emma Davis",
      role: "Engineering Manager at StartupX", 
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: "Best monitoring solution we've used. The custom dashboards and detailed analytics help us make data-driven decisions."
    }
  ]

  const plans = [
    {
      name: "Starter",
      price: "$29",
      features: [
        "Up to 10 monitors",
        "5 minute check intervals",
        "Email notifications", 
        "24/7 monitoring",
        "Basic reporting"
      ]
    },
    {
      name: "Professional",
      price: "$99",
      popular: true,
      features: [
        "Up to 50 monitors",
        "1 minute check intervals",
        "All notification channels",
        "Advanced analytics",
        "API access",
        "Custom dashboards"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited monitors",
        "30 second check intervals",
        "Priority support",
        "Custom integrations", 
        "SLA guarantees",
        "Dedicated account manager"
      ]
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <GlassmorphicShapes />

      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />

      <div className="relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8">
                Monitor Your Services with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  SiteWatch Pro
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-10">
                Comprehensive monitoring solution for your websites, servers, and services.
                Get instant alerts when issues arise.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {!user ? (
                      <>
                          <Link
                              to="/signup"
                              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                          >
                              Get Started
                          </Link>
                          <Link
                              to="/login"
                              className="px-8 py-3 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-all duration-300 hover:text-white hover:border-gray-500"
                          >
                              Sign In
                          </Link>
                      </>
                  ) : (
                      <Link
                          to="/dashboard"
                          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      >
                          Go to Dashboard
                      </Link>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Image Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative group"
          >
              {/* Gradient Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              
              {/* Image Container */}
              <div className="relative">
                  <img
                      src={DemoMonitor}
                      alt="Dashboard Demo"
                      className="w-full rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2"
                  />
                  
                  {/* Reflection/Glare Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 left-10 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-xl transform transition-all duration-500 group-hover:-translate-y-2 border border-gray-700/50">
                  <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-white font-medium">100% Uptime</span>
                  </div>
              </div>

              <div className="absolute -bottom-6 right-10 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-xl transform transition-all duration-500 group-hover:-translate-y-2 border border-gray-700/50">
                  <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-white font-medium">Real-time Monitoring</span>
                  </div>
              </div>
          </motion.div>

          {/* Caption */}
          <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-white mb-4">
                  Beautiful & Intuitive Dashboard
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                  Monitor all your services in one place with our modern, easy-to-use dashboard.
                  Get real-time insights and instant notifications.
              </p>
          </div>
        </div>

        {/* Monitor Types Section */}
        <div className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Monitoring Services</h2>
              <p className="text-gray-400">Choose from our comprehensive range of monitoring solutions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {monitorTypes.map((type, index) => (
                <div 
                  key={index}
                  className="relative group bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <type.icon className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                    <p className="text-gray-400 mb-4">{type.description}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <svg className="h-4 w-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
              <p className="text-gray-400">Everything you need to monitor your services effectively</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-gray-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-gray-400">Trusted by developers and companies worldwide</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="relative transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-30"></div>
                  <div className="relative bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full border-2 border-blue-500"
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-gray-400">Choose the perfect plan for your needs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => {
                        const cardClass = `relative transform hover:scale-105 transition-all duration-300 ${
                            plan.popular ? 'scale-105 md:scale-110' : ''
                        }`;
                        
                        const gradientClass = `absolute -inset-0.5 rounded-lg blur opacity-30 ${
                            plan.popular 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                                : 'bg-gradient-to-r from-blue-500/50 to-purple-500/50'
                        }`;

                        const buttonClass = `w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                            plan.popular
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`;

                        return (
                            <div key={index} className={cardClass}>
                                <div className={gradientClass}></div>
                                <div className="relative bg-gray-800 p-8 rounded-lg border border-gray-700">
                                    {plan.popular && (
                                        <div className="absolute top-0 right-6 transform -translate-y-1/2">
                                            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 rounded-full px-4 py-1 text-sm font-semibold text-white shadow-lg">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                                    </div>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-gray-300">
                                                <svg className="h-5 w-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={buttonClass}>
                                        {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Add a CTA section before footer */}
        <div className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Monitoring?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of companies who trust SiteWatch Pro for their monitoring needs
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Get Started Now
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900/50 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  SiteWatch Pro
                </h3>
                <p className="text-gray-400">
                  Comprehensive monitoring solution for modern web services.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/documentation" className="text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/security" className="text-gray-400 hover:text-white transition-colors">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} SiteWatch Pro. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage