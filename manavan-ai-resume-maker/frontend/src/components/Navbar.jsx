import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-40 px-8 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for templates, analysis..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-700">Atheesh B.</p>
                        <p className="text-[10px] font-medium text-slate-400">Standard Member</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
