import { useNavigate } from 'react-router-dom';
import { Layout, CheckCircle } from 'lucide-react';

const templates = [
    { id: 'modern', name: 'Modern Professional', desc: 'Sleek design for tech & creative roles', color: 'bg-blue-500' },
    { id: 'corporate', name: 'Corporate ATS', desc: 'Standard business layout, highly readable', color: 'bg-slate-700' },
    { id: 'minimal', name: 'Minimal Clean', desc: 'Simple and elegant minimalism', color: 'bg-emerald-500' },
    { id: 'executive', name: 'Executive Premium', desc: 'Bold design for leadership positions', color: 'bg-amber-600' }
];

const TemplatePage = () => {
    const navigate = useNavigate();

    const selectTemplate = (id) => {
        sessionStorage.setItem('selectedTemplate', id);
        navigate('/resume-questions');
    };

    return (
        <div className="max-w-6xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold text-center mb-4">Choose Your Template</h1>
            <p className="text-gray-600 text-center mb-12">Select a layout that best fits your professional goals.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((t) => (
                    <div key={t.id} onClick={() => selectTemplate(t.id)} className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:ring-4 hover:ring-blue-400 transition-all">
                        <div className={`h-40 ${t.color} flex items-center justify-center p-8`}>
                            <Layout className="w-16 h-16 text-white/50 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-1">{t.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{t.desc}</p>
                            <div className="flex items-center text-blue-600 font-semibold text-sm">
                                Select Template <CheckCircle className="ml-2 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatePage;
