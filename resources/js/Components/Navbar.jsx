import { usePage } from '@inertiajs/react';
import NavLink from './NavLink';

export default function Navbar() {
    const { component } = usePage();

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex">
                        <a href={route('dashboard')} className="flex-shrink-0 flex items-center">
                            <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
                        </a>
                        {/* Primary Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink href={route('dashboard')} active={component === 'Dashboard'}>
                                Dashboard
                            </NavLink>
                            <NavLink href={route('articles.index')} active={component === 'Educational/Articles/Index' || component === 'Educational/Articles/Show'}>
                                Articles
                            </NavLink>
                            <NavLink href={route('videos.index')} active={component === 'Educational/Videos/Index' || component === 'Educational/Videos/Show'}>
                                Videos
                            </NavLink>
                            <NavLink href={route('quizzes.index')} active={component === 'Educational/Quizzes/Index' || component === 'Educational/Quizzes/Show'}>
                                Quizzes
                            </NavLink>
                        </div>
                    </div>

                    {/* Secondary Navigation (e.g., Profile, Logout) */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        {/* Add your profile dropdown or other secondary links here */}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        {/* Add mobile menu button if needed */}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {/* Add mobile navigation menu if needed */}
        </nav>
    );
}