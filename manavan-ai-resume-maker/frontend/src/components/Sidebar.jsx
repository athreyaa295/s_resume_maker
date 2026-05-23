import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Image as ImageIcon,
    LayoutTemplate,
    BarChart3,
    Settings,
    HelpCircle
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Upload Photo', icon: ImageIcon, path: '/resume-upload' },
        { name: 'Templates', icon: LayoutTemplate, path: '/resume-template' },
        { name: 'Analysis', icon: BarChart3, path: '/resume-result' },
    ];

    const secondaryItems = [
        { name: 'Help', icon: HelpCircle, path: '/help' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Manavan AI
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Main Menu</p>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`
                        }
                    >
                        <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}

                <div className="pt-8">
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Preference</p>
                    {secondaryItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`
                            }
                        >
                            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80">Free Plan</p>
                    <p className="text-xs mt-1 opacity-60">5 analyses left this month</p>
                    <button className="w-full mt-3 py-2 bg-blue-600 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">
                        Upgrade Pro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
