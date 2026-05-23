import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await axios.post(`${API_BASE_URL}/upload`, formData);
    return response.data;
};

export const generateResumeContent = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/generate`, userData);
    return response.data;
};

export const downloadPDF = async (template, data) => {
    const response = await axios.post(`${API_BASE_URL}/export/pdf`, { template, data }, {
        responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();
};

export const downloadDOCX = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/export/docx`, { data }, {
        responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.docx');
    document.body.appendChild(link);
    link.click();
};
