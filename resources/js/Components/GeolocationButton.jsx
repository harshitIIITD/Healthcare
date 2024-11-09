import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function GeolocationButton({ onLocationUpdate }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getLocation = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                onLocationUpdate({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setLoading(false);
            },
            (error) => {
                setError('Unable to retrieve your location');
                setLoading(false);
            }
        );
    };

    return (
        <div className="space-y-2">
            <PrimaryButton
                onClick={getLocation}
                disabled={loading}
                className="flex items-center gap-2"
            >
                <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                {loading ? 'Getting location...' : 'Get My Location'}
            </PrimaryButton>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}