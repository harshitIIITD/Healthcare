import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function QuizzesIndex({ quizzes }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quizzes</h2>}
        >
            <Head title="Quizzes" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ul className="space-y-4">
                                {quizzes.data.map(quiz => (
                                    <li key={quiz.id} className="border-b pb-4">
                                        <Link href={route('quizzes.show', quiz.id)} className="text-xl font-semibold text-indigo-600">
                                            {quiz.title}
                                        </Link>
                                        <p className="text-gray-600 mt-2">{quiz.description.substring(0, 150)}...</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                {quizzes.links.map(link => (
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