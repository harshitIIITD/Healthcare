import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function VideosIndex({ videos }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Videos</h2>}
        >
            <Head title="Videos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ul className="space-y-4">
                                {videos.data.map(video => (
                                    <li key={video.id} className="border-b pb-4">
                                        <Link href={route('videos.show', video.id)} className="text-xl font-semibold text-indigo-600">
                                            {video.title}
                                        </Link>
                                        <p className="text-gray-600 mt-2">{video.description.substring(0, 150)}...</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                {videos.links.map(link => (
                                    <Link
                                        key={link.url}
                                        href={link.url}
                                        className={`mx-1 px-3 py-1 border rounded ${link.active ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-600'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}