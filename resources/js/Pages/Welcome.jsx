import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="HealthApp - Your Health Companion" />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Navigation */}
                <nav className="fixed w-full bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    HealthApp
                                </span>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-center space-x-4">
                                    {auth?.user ? (
                                        <Link
                                            href="/dashboard"
                                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                Get Started
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                Take Control of Your Health Journey
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Track your fitness, monitor your diet, and achieve your health goals
                                with our comprehensive health tracking platform.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href="/register"
                                    className="rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Start Free Trial
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="relative rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-shadow"
                            >
                                <div className="text-blue-600 dark:text-blue-400 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

const features = [
    {
        icon: '📊',
        title: 'Health Analytics',
        description: 'Track your vital statistics and health metrics with detailed analytics and insights.'
    },
    {
        icon: '🏃',
        title: 'Fitness Tracking',
        description: 'Monitor your workouts, steps, and physical activities in real-time.'
    },
    {
        icon: '🥗',
        title: 'Nutrition Planning',
        description: 'Get personalized meal plans and track your dietary habits for better health.'
    }
];
