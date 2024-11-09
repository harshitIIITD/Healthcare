import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';

export default function QuizShow({ quiz }) {
    const { data, setData, post, errors } = useForm({
        answers: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('quizzes.submit', quiz.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quiz: {quiz.title}</h2>}
        >
            <Head title={quiz.title} />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
                        <p className="text-gray-700 mb-6">{quiz.description}</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {quiz.questions.map((question, index) => (
                                <div key={index}>
                                    <label className="block text-gray-700">
                                        {index + 1}. {question.question}
                                    </label>
                                    {question.type === 'multiple-choice' && (
                                        <div className="mt-2">
                                            {question.options.map((option, optIndex) => (
                                                <label key={optIndex} className="inline-flex items-center mr-4">
                                                    <input
                                                        type="radio"
                                                        name={`answers[${index}]`}
                                                        value={option}
                                                        className="form-radio"
                                                        onChange={e => setData(`answers.${index}`, e.target.value)}
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    {/* Handle other question types if needed */}
                                    {errors[`answers.${index}`] && (
                                        <span className="text-red-600 text-sm">{errors[`answers.${index}`]}</span>
                                    )}
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Submit Quiz
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}