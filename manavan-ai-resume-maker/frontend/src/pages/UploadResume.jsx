import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UploadCloud,
    Image as ImageIcon,
    Check,
    X,
    ArrowRight,
    Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadPhoto = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    };

    const processFile = (selectedFile) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            alert("Please upload a valid image file (JPG, PNG).");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        processFile(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        processFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        try {
            // Assuming you might want to save the photo locally or in sessionStorage
            if (previewUrl) {
                sessionStorage.setItem('profilePhoto', previewUrl);
            }
            setTimeout(() => {
                navigate('/resume-template');
            }, 1000);
        } catch (error) {
            console.error(error);
            navigate('/resume-template');
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-800">Upload Your Profile Photo</h1>
                <p className="text-slate-500 max-w-lg mx-auto">
                    Add a professional headshot to your resume to make a strong first impression.
                </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${isDragging
                            ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                >
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        accept="image/*"
                        title=""
                    />

                    <div className="flex flex-col items-center">
                        {previewUrl ? (
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 relative z-10">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all bg-blue-50 text-blue-600`}>
                                <UploadCloud size={40} className="animate-bounce" />
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-slate-700 mb-2">
                            {file ? file.name : 'Click to upload or drag & drop'}
                        </h3>
                        <p className="text-sm text-slate-400 mb-8">
                            {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Supported formats: JPG, PNG (Max 5MB)'}
                        </p>

                        <AnimatePresence>
                            {file && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-4 relative z-20"
                                >
                                    <button
                                        onClick={removeFile}
                                        className="px-6 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition text-sm flex items-center gap-2"
                                    >
                                        <X size={16} /> Remove
                                    </button>
                                    <button
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                        className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-sm flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
                                    >
                                        {isUploading ? (
                                            <>Processing...</>
                                        ) : (
                                            <>Continue to Templates <ArrowRight size={16} /></>
                                        )}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-50">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <ImageIcon size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-700">Perfect Fit</p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Automatically cropped and adjusted to fit perfectly in your chosen template.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Check size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-700">High Resolution</p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Maintains quality for both PDF exports and printing.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <Check size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-700">Professional Look</p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Enhances your personal brand and makes your resume stand out.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 text-slate-500 border border-slate-100">
                <Info size={24} className="text-blue-600 shrink-0" />
                <p className="text-sm leading-relaxed">
                    <span className="font-bold text-slate-700">Privacy Note:</span> Your photo is processed locally and not stored permanently on any server.
                </p>
            </div>
        </div>
    );
};

export default UploadPhoto;
