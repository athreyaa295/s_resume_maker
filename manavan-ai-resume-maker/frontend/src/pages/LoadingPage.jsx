import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/resume-upload');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
            <h1 className="text-4xl font-bold mb-2">Manavan 001</h1>
            <h2 className="text-xl mb-8 opacity-90">AI Resume Analyzer</h2>

            <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="text-lg animate-pulse">Preparing AI Resume Builder...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
