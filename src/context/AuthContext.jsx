import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { base_Url } from '../../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('token');
        if (token) {
            checkAuthStatus();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${base_Url}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${base_Url}/api/auth/login`, {
                email,
                password
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data);
                return response.data;
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        const response = await axios.post(`${base_Url}/api/auth/register`, userData);
        localStorage.setItem('token', response.data.token);
        setUser(response.data);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 