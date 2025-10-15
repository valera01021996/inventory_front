import React from 'react';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex bg-blue-50 min-h-screen">
            <Sidebar />
            <div className="flex-grow ml-56 pt-4">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;