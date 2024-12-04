import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
    HomeIcon,
    ChartBarIcon,
    CogIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    BookOpenIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import Logo from '../common/Logo'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    }

    const authLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
        { name: 'Settings', href: '/settings', icon: CogIcon }
    ]

    const publicLinks = [
        { name: 'Features', href: '#features', icon: BookOpenIcon },
        { name: 'Pricing', href: '#pricing', icon: CurrencyDollarIcon }
    ]

    return (
        <nav className="backdrop-blur-lg bg-gray-900/80 fixed top-0 left-0 right-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link 
                            to="/" 
                            className="transform transition-all duration-300 hover:scale-105"
                        >
                            <Logo />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                {authLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px] relative group"
                                    >
                                        <link.icon className="h-5 w-5 mr-2" />
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                ))}
                                {/* Profile Circle */}
                                <div className="relative group">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform duration-200">
                                        {getInitials(user.name)}
                                    </div>
                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                        <div className="py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                            >
                                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {publicLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px] relative group"
                                    >
                                        <link.icon className="h-5 w-5 mr-2" />
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                ))}
                                <Link
                                    to="/login"
                                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex items-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none transition-all duration-300 hover:scale-110"
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-4 rounded-xl backdrop-blur-lg bg-gray-800/50 p-4 border border-white/10">
                    <div className="flex flex-col space-y-4">
                        {user ? (
                            <>
                                {/* Profile Info for Mobile */}
                                <div className="flex items-center space-x-3 px-4 py-2 border-b border-gray-700 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="text-white">{user.name}</div>
                                </div>
                                {authLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <link.icon className="h-5 w-5 mr-2" />
                                        {link.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {publicLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <link.icon className="h-5 w-5 mr-2" />
                                        {link.name}
                                    </a>
                                ))}
                                <Link
                                    to="/login"
                                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:translate-x-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar