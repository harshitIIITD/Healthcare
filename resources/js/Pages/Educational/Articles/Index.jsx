import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function GamesIndex({ auth, stats }) {
    const games = [
        {
            title: 'Step Challenge',
            icon: '🏃',
            route: 'games.steps',
            color: 'bg-blue-500'
        },
        {
            title: 'Meditation',
            icon: '🧘',
            route: 'games.meditation', 
            color: 'bg-purple-500'
        },
        {
            title: 'Health Quiz',
            icon: '🧠',
            route: 'games.quiz',
            color: 'bg-green-500'
        }
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Health Games" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <StatsCard title="Total Points" value={stats.points} icon="🎯" />
                        <StatsCard title="Current Streak" value={stats.streak} icon="🔥" />
                        <StatsCard title="Level" value={stats.level} icon="⭐" />
                    </div>

                    {/* Games Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {games.map((game) => (
                            <Link
                                key={game.title}
                                href={route(game.route)}
                                className="block"
                            >
                                <div className={`rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
                                    <div className={`${game.color} p-8 text-center`}>
                                        <span className="text-6xl">{game.icon}</span>
                                    </div>
                                    <div className="bg-white p-4">
                                        <h3 className="text-lg font-semibold text-center">{game.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const StatsCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
            <span className="text-3xl">{icon}</span>
            <div className="text-right">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-gray-600">{title}</div>
            </div>
        </div>
    </div>
);