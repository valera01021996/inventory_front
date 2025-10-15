import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLoginMutation } from 'services/index';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setCredentials } from 'store/slices/authSlice';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    const [login, { isLoading }] = useLoginMutation();
    const onUsernameChange = (value: string) => setUsername(value);
    const onPasswordChange = (value: string) => setPassword(value);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const values = { username, password };

        login(values)
            .unwrap()
            .then((response) => {                
                setError(null);
                dispatch(setCredentials(response));
                navigate('/');
            })
            .catch(() => setError("Invalid username or password"));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border-3 border-gray-200">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <h2 className="w-full text-2xl font-bold text-gray-900 text-center mb-4">
                        System Login
                    </h2>

                    <div>
                        <div className="mb-1 block">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">
                                Login <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                            required
                            id="username"
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm transition duration-150"
                            placeholder="Enter login"
                            value={username}
                            onChange={e => onUsernameChange(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                            required
                            id="password"
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm transition duration-150"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => onPasswordChange(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-300 font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        color="primary"
                        disabled={isLoading}
                        className={`mt-2 flex items-center justify-center py-2.5 px-5 text-sm font-medium rounded-lg text-white transition-colors duration-150 shadow-md ${
                            isLoading 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                        }`}
                    >
                        <span className={isLoading ? 'pl-2' : ''}>Login</span>
                    </button>
                </form>
            </div>
        </div>
    );
}