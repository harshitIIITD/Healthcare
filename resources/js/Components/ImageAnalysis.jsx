import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function ImageAnalysis() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageType, setImageType] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        async function loadModel() {
            const loadedModel = await mobilenet.load();
            setModel(loadedModel);
        }
        loadModel();
    }, []);

    useEffect(() => {
        return () => {
            // Cleanup object URL when component unmounts
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    const imageTypes = [
        { id: 'brain', label: 'Brain MRI', description: 'Brain scan analysis' },
        { id: 'spine', label: 'Spine MRI', description: 'Spine examination' },
        { id: 'chest', label: 'Chest MRI', description: 'Chest scan analysis' }
    ];

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', imageType);

        setLoading(true);
        try {
            const response = await axios.post(route('image.analyze'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAnalysis(response.data);
        } catch (error) {
            console.error('Error analyzing image:', error);
        }
        setLoading(false);
    };

    const analyzeImage = async (imageElement) => {
        if (!model) return;
        
        setIsAnalyzing(true);
        try {
            const tfImage = tf.browser.fromPixels(imageElement);
            const results = await model.classify(tfImage);
            setPredictions(results);
            tfImage.dispose(); // Cleanup
        } catch (error) {
            console.error('Error analyzing image:', error);
        }
        setIsAnalyzing(false);
    };


    const ResultsDisplay = ({ predictions }) => (
        <div className="mt-4">
            <h3 className="text-lg font-medium">Analysis Results:</h3>
            <div className="mt-2 space-y-2">
                {predictions.map((pred, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>{pred.className}</span>
                        <span className="font-medium">
                            {(pred.probability * 100).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-gray-900">Medical Image Analysis</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Upload your medical images for AI-powered analysis and recommendations.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {imageTypes.map((type) => (
                    <div 
                        key={type.id}
                        className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                            imageType === type.id 
                                ? 'border-indigo-600 bg-indigo-50' 
                                : 'border-gray-200 hover:border-indigo-400'
                        }`}
                        onClick={() => setImageType(type.id)}
                    >
                        <div className="flex flex-col items-center p-4">
                            <svg 
                                className={`w-8 h-8 ${
                                    imageType === type.id ? 'text-indigo-600' : 'text-gray-400'
                                }`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                />
                            </svg>
                            <h3 className="mt-4 font-medium text-gray-900">{type.label}</h3>
                            <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {imageType && (
                <div className="mt-6">
                    <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-400">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="mt-2 text-sm text-gray-600">Upload your {imageType} scan</span>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center p-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            )}

            {analysis && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis Results</h3>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                {analysis.severity === 'normal' ? (
                                    <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <svg className="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-900">
                                    {analysis.finding}
                                </h4>
                                <p className="mt-1 text-sm text-gray-600">
                                    {analysis.description}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h4 className="text-sm font-medium text-gray-900">Recommendations</h4>
                            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                                {analysis.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {predictions.length > 0 && <ResultsDisplay predictions={predictions} />}

            <div className="mt-6">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                
                <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200"
                >
                    {isLoading ? 'Uploading...' : 'Upload Image'}
                </button>

                {imageUrl && (
                    <div className="mt-4">
                        <img
                            src={imageUrl}
                            alt="Selected medical image"
                            className="max-w-full h-auto rounded-lg"
                        />
                        <button
                            onClick={() => {
                                setSelectedImage(null);
                                setImageUrl('');
                            }}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                            Remove Image
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}