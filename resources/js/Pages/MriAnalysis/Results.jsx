
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Results({ analysis }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Analysis Results</h2>}
        >
            <Head title="MRI Analysis Results" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 space-y-6">
                            {/* Analysis Status */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-900">Analysis Status</h3>
                                <p className="text-blue-800">
                                    {analysis.requires_review ? 'Pending Professional Review' : 'Complete'}
                                </p>
                            </div>

                            {/* Findings */}
                            <div className="border-b pb-6">
                                <h3 className="text-lg font-semibold mb-3">Findings</h3>
                                <p className="text-gray-700">{analysis.findings}</p>
                            </div>

                            {/* Severity */}
                            <div className="border-b pb-6">
                                <h3 className="text-lg font-semibold mb-3">Severity Level</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    analysis.severity === 'high' ? 'bg-red-100 text-red-800' :
                                    analysis.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {analysis.severity}
                                </span>
                            </div>

                            {/* Recommendations */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {analysis.recommendations.map((rec, index) => (
                                        <li key={index} className="text-gray-700">{rec}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Disclaimer */}
                            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">{analysis.disclaimer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}