import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HealthDashboard from '@/Components/HealthDashboard';

export default function Dashboard({ latestAssessment }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <HealthDashboard initialAssessment={latestAssessment} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
