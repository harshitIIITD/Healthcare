import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ArticleShow({ article }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Article Detail</h2>}
        >
            <Head title={article.title} />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                        <p className="text-gray-700 mb-6">{article.content}</p>
                        {article.author && <p className="text-sm text-gray-500">Author: {article.author}</p>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}