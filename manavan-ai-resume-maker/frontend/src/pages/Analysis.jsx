import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Download,
    Printer,
    Layout,
    LayoutTemplate
} from 'lucide-react';
import { generateResumeContent, downloadPDF, downloadDOCX } from '../services/api';

const Analysis = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [template, setTemplate] = useState('modern');

    useEffect(() => {
        const fetchAnalysis = async () => {
            const rawData = sessionStorage.getItem('resumeData');
            const selectedTpl = sessionStorage.getItem('selectedTemplate') || 'modern';
            setTemplate(selectedTpl);

            if (!rawData) {
                setLoading(false);
                return;
            }

            try {
                const result = await generateResumeContent(JSON.parse(rawData));
                setData(result);
            } catch (error) {
                console.error(error);
                setData(JSON.parse(rawData));
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, []);

    const handleDownloadPDF = () => downloadPDF(template, data);
    const handleDownloadDOCX = () => downloadDOCX(data);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border-4 border-slate-200 border-t-blue-600 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BarChart3 size={32} className="text-blue-600" />
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-slate-800">Analyzing with Llama3</h2>
                    <p className="text-slate-400 font-medium">Optimizing keywords and formatting for ATS compatibility...</p>
                </div>
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center text-slate-400 font-medium">No content found. Please upload a resume first.</div>;

    return (
        <div className="space-y-8">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">AI Resume Analysis</h1>
                    <p className="text-slate-500 mt-1 font-medium">Insights generated based on your profile and industry standards.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-200"
                    >
                        <Download size={18} /> PDF
                    </button>
                    <button
                        onClick={handleDownloadDOCX}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition shadow-lg shadow-slate-200"
                    >
                        <Download size={18} /> DOCX
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="p-3 bg-white text-slate-600 border border-slate-200 rounded-2xl hover:bg-slate-50 transition shadow-sm"
                    >
                        <Printer size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score & Insights Column */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm opacity-60">ATS Match Score</h3>
                        <div className="relative w-40 h-40 mx-auto mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" className="stroke-slate-100 fill-none" strokeWidth="12" />
                                <motion.circle
                                    cx="80" cy="80" r="70"
                                    className="stroke-blue-600 fill-none"
                                    strokeWidth="12"
                                    strokeDasharray="440"
                                    initial={{ strokeDashoffset: 440 }}
                                    animate={{ strokeDashoffset: 440 - (440 * 0.85) }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-slate-800">85%</span>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Excellent</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 font-medium px-4">
                            Your resume is highly compatible with most Applicant Tracking Systems.
                        </p>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Lightbulb className="text-amber-400" size={20} /> AI Suggestions
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <BarChart3 size={14} className="text-blue-500" /> Impact
                                </div>
                                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                    "Llama3 improved your experience section by adding stronger action verbs like 'Architected' and 'Spearheaded'."
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <CheckCircle2 size={14} className="text-emerald-500" /> Keywords
                                </div>
                                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                    "We've highlighted your core technical competencies to ensure visibility by automated scanners."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-slate-600 font-bold">
                            <LayoutTemplate size={20} />
                            <span>Live Resume Preview</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">AI Optimized Content</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl min-h-[800px] overflow-auto list-none">
                        <div className="max-w-[700px] mx-auto">
                            <div className="text-center pb-8 border-b-2 border-slate-800 mb-8">
                                {data.photo && (
                                    <div className="flex justify-center mb-6">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                                            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                )}
                                <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight">{data.fullName}</h2>
                                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 font-semibold mt-4">
                                    <span>{data.email}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span>{data.phone}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-blue-600">{data.linkedin?.replace('https://', '')}</span>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {data.summary && (
                                    <section>
                                        <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Professional Profile</h4>
                                        <div className="text-slate-600 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.summary }} />
                                    </section>
                                )}
                                {data.skills && (
                                    <section>
                                        <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Skills</h4>
                                        <div className="text-slate-600 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.skills }} />
                                    </section>
                                )}
                                {data.experience && (
                                    <section>
                                        <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Experience</h4>
                                        <div className="text-slate-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.experience }} />
                                    </section>
                                )}
                                {data.projects && (
                                    <section>
                                        <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Projects</h4>
                                        <div className="text-slate-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.projects }} />
                                    </section>
                                )}
                                {data.education && (
                                    <section>
                                        <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Education</h4>
                                        <div className="text-slate-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.education }} />
                                    </section>
                                )}
                                {data.achievements && (
                                    <section>
                                        <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Achievements</h4>
                                        <div className="text-slate-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.achievements }} />
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
