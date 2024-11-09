import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ error }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        brain_mri: null,
        spine_mri: null,
        chest_mri: null,
        notes: '',
        analysis_results: null,
        error: ''
    });

    const mriTypes = [
        {
            id: 'brain_mri',
            label: 'Brain MRI',
            description: 'Upload brain MRI images for analysis'
        },
        {
            id: 'spine_mri',
            label: 'Spine MRI',
            description: 'Upload spine MRI images for analysis'
        },
        {
            id: 'chest_mri',
            label: 'Chest MRI',
            description: 'Upload chest MRI images for analysis'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create FormData for file upload
        const formData = new FormData();
        if (data.brain_mri) formData.append('brain_mri', data.brain_mri);
        if (data.spine_mri) formData.append('spine_mri', data.spine_mri);
        if (data.chest_mri) formData.append('chest_mri', data.chest_mri);
        if (data.notes) formData.append('notes', data.notes);

        post(route('mri.store'), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.success) {
                    window.location.href = route('mri.results', { id: page.props.analysis.analysis_id });
                }
            },
        });
    };

    return (
        <div>
            <Head title="MRI Analysis" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-6">MRI Analysis</h2>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {mriTypes.map((mriType) => (
                                    <div key={mriType.id} className="border rounded-lg p-6">
                                        <div className="mb-4">
                                            <InputLabel htmlFor={mriType.id} value={mriType.label} />
                                            <p className="text-sm text-gray-500 mt-1">{mriType.description}</p>
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500">DICOM, PNG, JPEG or PDF (MAX. 100MB)</p>
                                                    </div>
                                                    <input
                                                        id={mriType.id}
                                                        type="file"
                                                        className="hidden"
                                                        accept=".dcm,.png,.jpg,.jpeg,.pdf"
                                                        onChange={e => setData(mriType.id, e.target.files[0])}
                                                    />
                                                </label>
                                            </div>
                                            <InputError message={errors[mriType.id]} className="mt-2" />
                                        </div>

                                        {data[mriType.id] && (
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-600">
                                                    Selected file: {data[mriType.id].name}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div>
                                    <InputLabel htmlFor="notes" value="Additional Notes" />
                                    <textarea
                                        id="notes"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        rows="4"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        placeholder="Add any relevant information about the MRI scans..."
                                    />
                                </div>

                                {progress && (
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                            <div
                                                style={{ width: `${progress}%` }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-300"
                                            />
                                        </div>
                                        <div className="text-center text-sm text-gray-600">
                                            Uploading: {progress}%
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Upload MRI Images
                                    </PrimaryButton>
                                </div>
                            </form>

                            {data.error && (
                                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                                    {data.error}
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}

                            {data.analysis_results && (
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
                                    <div className="space-y-2">
                                        <p><strong>Findings:</strong> {data.analysis_results.findings}</p>
                                        <p><strong>Severity:</strong> {data.analysis_results.severity}</p>
                                        <p><strong>Recommendations:</strong></p>
                                        <ul className="list-disc pl-5">
                                            {data.analysis_results.recommendations.map((rec, index) => (
                                                <li key={index}>{rec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}