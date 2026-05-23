import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, ArrowRight, Loader2 } from 'lucide-react';
import { uploadResume } from '../services/api';

const UploadPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const data = await uploadResume(file);
            sessionStorage.setItem('resumeData', JSON.stringify(data));
            navigate('/resume-template');
        } catch (error) {
            console.error(error);
            alert("Upload failed. Continuing with manual input.");
            navigate('/resume-template');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-20 px-4">
            <h1 className="text-3xl font-bold text-center mb-12">How would you like to start?</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <label className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.jpg,.png" />
                    <Upload className="w-16 h-16 text-blue-600 mb-4" />
                    <span className="text-xl font-semibold">Upload Resume</span>
                    <span className="text-sm text-gray-500 mt-2">PDF, DOCX, IMG</span>
                </label>

                <div className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500 opacity-50 cursor-not-allowed">
                    <Camera className="w-16 h-16 text-indigo-600 mb-4" />
                    <span className="text-xl font-semibold">Take Photo</span>
                    <span className="text-sm text-gray-500 mt-2">Coming Soon</span>
                </div>

                <div onClick={() => navigate('/resume-template')} className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
                    <ArrowRight className="w-16 h-16 text-slate-600 mb-4" />
                    <span className="text-xl font-semibold">Skip & Manual</span>
                    <span className="text-sm text-gray-500 mt-2">Enter details manually</span>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl flex flex-col items-center">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                        <p className="font-medium">AI is extracting your details...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadPage;
