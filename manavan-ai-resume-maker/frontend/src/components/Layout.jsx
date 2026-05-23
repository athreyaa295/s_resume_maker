import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <Navbar />
            <main className="pl-64 pt-16 min-h-screen">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
