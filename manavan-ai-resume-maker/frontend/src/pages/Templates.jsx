import React from 'react';
import { motion } from 'framer-motion';
import { Layout, CheckCircle2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const templates = [
    {
        id: 'modern',
        name: 'Modern Professional',
        desc: 'Perfect for tech and design roles with a clean, grid-based layout.',
        stats: { ats: '98%', focus: 'Visual' },
        color: 'from-blue-500 to-indigo-600',
        image: 'https://images.unsplash.com/photo-1586281380349-631531a3d242?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'corporate',
        name: 'Corporate ATS',
        stats: { ats: '100%', focus: 'Readability' },
        desc: 'High-visibility layout optimized for traditional firms and ATS scanners.',
        color: 'from-slate-700 to-slate-900',
        image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'minimal',
        name: 'Minimal Clean',
        stats: { ats: '95%', focus: 'Elegance' },
        desc: 'Stripped-back design for those who want their experience to speak for itself.',
        color: 'from-emerald-500 to-teal-600',
        image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'executive',
        name: 'Executive Premium',
        stats: { ats: '96%', focus: 'Leadership' },
        desc: 'Sophisticated typography and spacing for senior leadership roles.',
        color: 'from-amber-600 to-orange-700',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop'
    }
];

const Templates = () => {
    const navigate = useNavigate();

    const selectTemplate = (id) => {
        sessionStorage.setItem('selectedTemplate', id);
        navigate('/resume-questions');
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-slate-800">Select a Template</h1>
                    <p className="text-slate-500 max-w-lg font-medium">
                        Choose a professional framework for your resume. You can change this later without losing your content.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm border border-emerald-100">
                    <CheckCircle2 size={16} /> All templates are ATS-optimized
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {templates.map((tpl, idx) => (
                    <motion.div
                        key={tpl.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={tpl.image}
                                alt={tpl.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${tpl.color} opacity-20`}></div>

                            <div className="absolute top-4 left-4">
                                <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1 shadow-sm">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tpl.color}`}></div>
                                    {tpl.stats.focus}
                                </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <button
                                    onClick={() => selectTemplate(tpl.id)}
                                    className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:bg-blue-50 transition-colors"
                                >
                                    <Layout size={18} /> Select <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {tpl.name}
                                </h3>
                                <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                                    {tpl.desc}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">ATS Score</span>
                                    <span className="text-lg font-black text-slate-800">{tpl.stats.ats}</span>
                                </div>
                                <button
                                    onClick={() => selectTemplate(tpl.id)}
                                    className="p-3 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-xl transition-all shadow-sm"
                                >
                                    <Layout size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Templates;
