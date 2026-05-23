import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Briefcase, Code, Award, Sparkles, ArrowRight } from 'lucide-react';

const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 mb-8 overflow-hidden relative">
        <div className="flex items-center mb-8 relative z-10">
            <div className="p-3 bg-blue-50 rounded-2xl mr-4 shadow-sm">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        </div>
        <div className="relative z-10">{children}</div>

        {/* Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
    </div>
);

const QuestionsPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', linkedin: '', portfolio: '',
        education: '', skills: '', experience: '', projects: '', achievements: ''
    });

    useEffect(() => {
        const saved = sessionStorage.getItem('resumeData');
        if (saved) {
            const data = JSON.parse(saved);
            setFormData(prev => ({ ...prev, ...data }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Include the profile photo if it exists
        const profilePhoto = sessionStorage.getItem('profilePhoto');
        const finalData = { ...formData };
        if (profilePhoto) {
            finalData.photo = profilePhoto;
        }

        sessionStorage.setItem('resumeData', JSON.stringify(finalData));
        navigate('/resume-result');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-slate-800">Final Details</h1>
                    <p className="text-slate-500 max-w-lg font-medium">
                        Fill in any missing details or edit the extracted information. Llama3 will then professionally rewrite it.
                    </p>
                </div>
                <button
                    onClick={handleSubmit}
                    className="flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 hover:scale-105"
                >
                    Generate Resume <Sparkles className="ml-2 w-4 h-4" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Section title="Personal Information" icon={User}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                            <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">LinkedIn</label>
                            <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                        </div>
                    </div>
                </Section>

                <Section title="Education" icon={GraduationCap}>
                    <textarea name="education" value={formData.education} onChange={handleChange} placeholder="Bachelor of Science in CS, Stanford University, 2023..." className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px] font-medium" />
                </Section>

                <Section title="Expertise & Skills" icon={Code}>
                    <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Python, AWS, Docker..." className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px] font-medium" />
                </Section>

                <Section title="Work Experience" icon={Briefcase}>
                    <textarea name="experience" value={formData.experience} onChange={handleChange} placeholder="Software Engineer at Google, led the development of..." className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all min-h-[180px] font-medium" />
                </Section>

                <div className="pt-8 pb-12 flex justify-center">
                    <button
                        type="submit"
                        className="group flex items-center gap-3 px-12 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200"
                    >
                        Finish & Analyze <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuestionsPage;
