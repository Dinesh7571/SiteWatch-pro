import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    HomeIcon, 
    ChartBarIcon, 
    CogIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
        { name: 'Settings', href: '/settings', icon: CogIcon },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-full md:w-64 bg-gray-900 md:h-screen flex flex-col">
            {/* Main Navigation */}
            <nav className="mt-4 px-2 flex-1">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 mb-1 ${
                            isActive(item.href)
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-150"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;