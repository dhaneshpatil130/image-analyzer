import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { handleError, handleSuccess } from './utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = `http://localhost:5000/auth/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });
            const result = await response.json();
console.log('Server Response:', result); // Add this line to see the entire response

const { success, message, token, name, error } = result;
            if (success) {
                console.log('JWT Token:', result.token);
                console.log('User Name:',result.name);
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', name);

                // Show success toast
                toast.success('Login successful! Redirecting...', {
                    position: 'top-right',
                    autoClose: 1000, // Close after 1 second
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    navigate('/main');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-xy">
            <style>
                {`
                @keyframes gradient-xy {
                    0% { background-position: 0% 0%; }
                    25% { background-position: 50% 50%; }
                    50% { background-position: 100% 0%; }
                    75% { background-position: 50% 100%; }
                    100% { background-position: 0% 0%; }
                }
                .animate-gradient-xy {
                    background-size: 300% 300%;
                    animation: gradient-xy 6s ease infinite;
                }
                `}
            </style>
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg backdrop-blur-lg"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
                >
                    Login
                </button>
                <span className="block text-center text-sm">
                    Doesn't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
                </span>
            </form>
            {/* ToastContainer for displaying toasts */}
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Login;