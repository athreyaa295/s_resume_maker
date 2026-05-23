import { useState, useEffect } from 'react';
import { Download, FileText, Printer, RefreshCw, Loader2 } from 'lucide-react';
import { generateResumeContent, downloadPDF, downloadDOCX } from '../services/api';

const ResultPage = () => {
    const [loading, setLoading] = useState(true);
    const [finalData, setFinalData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    useEffect(() => {
        const prepareResume = async () => {
            const rawData = sessionStorage.getItem('resumeData');
            const template = sessionStorage.getItem('selectedTemplate') || 'modern';
            setSelectedTemplate(template);

            if (!rawData) {
                setLoading(false);
                return;
            }

            try {
                const aiData = await generateResumeContent(JSON.parse(rawData));
                setFinalData(aiData);
            } catch (error) {
                console.error(error);
                setFinalData(JSON.parse(rawData)); // Fallback
            } finally {
                setLoading(false);
            }
        };

        prepareResume();
    }, []);

    const handleDownloadPDF = () => downloadPDF(selectedTemplate, finalData);
    const handleDownloadDOCX = () => downloadDOCX(finalData);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mb-4" />
                <h2 className="text-xl font-bold">Llama3 is writing your resume...</h2>
                <p className="text-gray-500">Wait a few seconds for professional formatting.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Control Panel */}
                <div className="w-full md:w-1/3">
                    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
                        <h2 className="text-2xl font-bold mb-6">Your Resume is Ready!</h2>

                        <div className="space-y-4">
                            <button onClick={handleDownloadPDF} className="w-full flex items-center justify-center p-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-bold">
                                <FileText className="mr-2" /> Download PDF
                            </button>
                            <button onClick={handleDownloadDOCX} className="w-full flex items-center justify-center p-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition font-bold">
                                <Download className="mr-2" /> Download DOCX (Basic)
                            </button>

                            <hr className="my-6" />

                            <div className="bg-blue-50 p-4 rounded-xl">
                                <h4 className="font-bold text-blue-800 mb-2">AI Summary</h4>
                                <p className="text-sm text-blue-700">Llama3 has optimized your bullet points for ATS scanners and professional impact.</p>
                            </div>

                            <button onClick={() => window.print()} className="w-full flex items-center justify-center p-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                                <Printer className="mr-2" /> Print Preview
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="w-full md:w-2/3 bg-white shadow-2xl rounded-xl p-8 min-h-[1000px] border border-gray-100 overflow-auto">
                    {finalData ? (
                        <div id="resume-preview" className="resume-container">
                            <div className="text-center border-b-2 border-blue-500 pb-4 mb-6">
                                <h1 className="text-4xl font-bold text-gray-800">{finalData.fullName}</h1>
                                <div className="text-sm text-gray-500 mt-2">
                                    {finalData.email} | {finalData.phone} | {finalData.linkedin}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-blue-600 uppercase mb-2 border-b border-gray-100">Professional Summary</h3>
                                <p>{finalData.summary}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-blue-600 uppercase mb-2 border-b border-gray-100">Skills</h3>
                                <p>{finalData.skills}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-blue-600 uppercase mb-2 border-b border-gray-100">Experience</h3>
                                <div dangerouslySetInnerHTML={{ __html: finalData.experience }} />
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-blue-600 uppercase mb-2 border-b border-gray-100">Projects</h3>
                                <div dangerouslySetInnerHTML={{ __html: finalData.projects }} />
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-blue-600 uppercase mb-2 border-b border-gray-100">Education</h3>
                                <div dangerouslySetInnerHTML={{ __html: finalData.education }} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400">No data found. Please go back and fill the form.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
