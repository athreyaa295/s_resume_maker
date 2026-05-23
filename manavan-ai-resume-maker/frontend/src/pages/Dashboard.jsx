import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    CheckCircle2,
    Clock,
    ArrowRight,
    Image as ImageIcon,
    BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const stats = [
        { label: 'Total Resumes', value: '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Analyses Done', value: '8', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Recent Score', value: '84%', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Last Activity', value: '2h ago', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                <div className="relative z-10 max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-4"
                    >
                        Welcome back, Atheesh! 👋
                    </motion.h1>
                    <p className="text-blue-100 text-lg mb-8 opacity-90">
                        Ready to optimize your professional presence? Upload your professional photo and pick a template.
                    </p>
                    <Link
                        to="/resume-upload"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-blue-900/20"
                    >
                        <ImageIcon size={20} />
                        Upload Profile Photo
                    </Link>
                </div>

                {/* Abstract shapes for premium look */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/2 blur-3xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Recent Analyses</h3>
                        <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                            View all <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Software_Engineer_Resume_v{item}.pdf</p>
                                        <p className="text-xs text-slate-400 font-medium">Modified Oct {12 + item}, 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-blue-600">{75 + item * 5}%</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ATS Score</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Tips Card */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="text-blue-400" size={20} />
                        Optimization Tips
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Use <span className="text-white font-medium">quantifiable metrics</span> like "increased efficiency by 30%".
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Include relevant <span className="text-white font-medium">keywords</span> found in the job description to pass ATS.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Avoid complex <span className="text-white font-medium">graphics or tables</span> that might confuse automated scanners.
                            </p>
                        </li>
                    </ul>

                    <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-xs text-slate-400 font-medium italic">
                            "A premium resume isn't just about what you say, but how you present it."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
