// resources/js/Components/Navigation.jsx
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const GamesDropdown = () => {
    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Games
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            href={route('games.daily-challenge')}
                            className={`${
                                active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                        >
                            Daily Challenge
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            href={route('games.health-quiz')}
                            className={`${
                                active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                        >
                            Health Quiz
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            href={route('games.fitness-journey')}
                            className={`${
                                active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                        >
                            Fitness Journey
                        </Link>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}

<Link
    href={route('games.index')}
    className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors"
>
    Games
</Link>