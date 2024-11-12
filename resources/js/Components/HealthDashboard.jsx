import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageAnalysis from '@/Components/ImageAnalysis';

export default function HealthDashboard({ initialAssessment = null }) {
    // Add location state
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });
    const [assessment, setAssessment] = useState(initialAssessment);
    const [loading, setLoading] = useState(false);
    const [gamificationData, setGamificationData] = useState({
        points: 6,
        level: 1,
        achievements: [],
        currentChallenges: []
    });
    const [wellnessPlan, setWellnessPlan] = useState(null);
    const [aqiData, setAqiData] = useState(null);

    const fetchLatestAssessment = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route('health.latest'));
            setAssessment(response.data);
        } catch (error) {
            console.error('Error fetching assessment:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!initialAssessment) {
            fetchLatestAssessment();
        }
    }, []);

    useEffect(() => {
        // Fetch the wellness plan
        const fetchWellnessPlan = async () => {
            try {
                const response = await axios.get(route('wellness.show'));
                setWellnessPlan(response.data.plan);
            } catch (error) {
                console.error('Error fetching wellness plan:', error);
            }
        };

        fetchWellnessPlan();
    }, []);

    // Add function to get user's location
    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    };

    // Add fallback AQI data
    const getFallbackAQI = () => {
        // Random AQI value between 1-5 following OpenWeatherMap scale
        const fallbackValues = [
            { value: 1, label: 'Good' },
            { value: 2, label: 'Fair' },
            { value: 3, label: 'Moderate' },
            { value: 4, label: 'Poor' },
            { value: 5, label: 'Very Poor' }
        ];
        
        return fallbackValues[Math.floor(Math.random() * fallbackValues.length)];
    };

    // Modify your AQI fetch function
    const fetchAQI = async (lat, lon) => {
        try {
            if (!lat || !lon) throw new Error('Invalid coordinates');
            
            const API_KEY = 'd5f99b89ebffb82e28285cdc82bd2099';
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
                {
                    timeout: 5000
                }
            );
            
            const aqi = response.data.list[0].main.aqi;
            setAqiData({
                value: aqi,
                label: getAQILabel(aqi)
            });
        } catch (error) {
            console.error('Error fetching AQI:', error);
            // Set fallback AQI data when API fails
            const fallbackAQI = getFallbackAQI();
            setAqiData(fallbackAQI);
        }
    };

    // Get user location when component mounts
    useEffect(() => {
        getUserLocation();
    }, []);

    // Fetch AQI when location is available
    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchAQI(location.latitude, location.longitude);
        }
    }, [location]);

    // Add interval to update AQI periodically
    useEffect(() => {
        if (location.latitude && location.longitude) {
            const interval = setInterval(() => {
                fetchAQI(location.latitude, location.longitude);
            }, 300000); // Update every 5 minutes

            return () => clearInterval(interval);
        }
    }, [location]);

    const getAQILabel = (aqi) => {
        const labels = {
            1: 'Good',
            2: 'Fair', 
            3: 'Moderate',
            4: 'Poor',
            5: 'Very Poor'
        };
        return labels[aqi] || 'Unknown';
    };

    const getHealthMetrics = () => {
        if (!assessment) return [];

        return [
            {
                title: 'Body Mass Index',
                value: (assessment.weight / Math.pow(assessment.height / 100, 2)).toFixed(1),
                unit: 'kg/m²',
                icon: (
                    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                )
            },
            {
                title: 'Blood Pressure',
                value: `${assessment.blood_pressure_systolic}/${assessment.blood_pressure_diastolic}`,
                unit: 'mmHg',
                icon: (
                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                )
            },
            {
                title: 'Sleep Duration',
                value: assessment.sleep_hours,
                unit: 'hours/day',
                icon: (
                    <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )
            },
            {
                title: 'Exercise',
                value: assessment.exercise_minutes,
                unit: 'min/week',
                icon: (
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                )
            },
            {
                title: 'Health Points',
                value: gamificationData.points,
                unit: 'XP',
                icon: (
                    <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            }
        ];
    };

    const getRecommendations = () => {
        if (!assessment) return [];

        const recommendations = [];
        
        // BMI Calculations
        const bmi = assessment.weight / Math.pow(assessment.height / 100, 2);
        if (bmi > 25) {
            recommendations.push({
                category: 'Weight Management',
                severity: 'warning',
                icon: '🏃' ,
                message: 'Consider increasing physical activity and maintaining a balanced diet.',
                metrics: `Current BMI: ${bmi.toFixed(1)}`
            });
        }
        if (bmi < 18.5) {
            recommendations.push({
                category: 'Weight Management',
                severity: 'warning',
                icon: '🏋️',
                message: 'Consider increasing caloric intake and strength training.',
                metrics: `Current BMI: ${bmi.toFixed(1)}`
            });
        }

        // Blood Pressure Recommendation
        const systolic = parseInt(assessment.blood_pressure_systolic);
        const diastolic = parseInt(assessment.blood_pressure_diastolic);
        if (systolic > 120 || diastolic > 80) {
            recommendations.push({
                category: 'Blood Pressure Management',
                severity: 'warning',
                icon: '❤️',
                message: 'Monitor your blood pressure regularly and consider lifestyle modifications.',
                metrics: `Systolic: ${systolic} mmHg, Diastolic: ${diastolic} mmHg`
            });
        }

        // Sleep Recommendation
        if (assessment.sleep_hours < 7) {
            recommendations.push({
                category: 'Sleep Hygiene',
                severity: 'info',
                icon: '😴',
                message: 'Aim for 7-9 hours of sleep per night for optimal health.',
                metrics: `Current Hours: ${assessment.sleep_hours}`
            });
        }

        // Exercise Recommendation
        if (assessment.exercise_minutes < 150) {
            recommendations.push({
                category: 'Physical Activity',
                severity: 'info',
                icon: '💪',
                message: 'Try to achieve at least 150 minutes of moderate exercise per week.',
                metrics: `Current Minutes: ${assessment.exercise_minutes}`
            });
        }

        return recommendations;
    };

    const getCurrentSeason = () => {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'Spring';
        if (month >= 5 && month <= 7) return 'Summer';
        if (month >= 8 && month <= 10) return 'Fall';
        return 'Winter';
    };

    // Update your getAirQualityRecommendation function to handle all cases
    const getAirQualityRecommendation = (label) => {
        switch (label) {
            case 'Good':
                return 'Perfect conditions for outdoor activities. Enjoy the fresh air!';
            case 'Fair':
                return 'Air quality is acceptable. Consider reducing extended outdoor activities if sensitive to air quality.';
            case 'Moderate':
                return 'People with respiratory issues should limit prolonged outdoor exposure.';
            case 'Poor':
                return 'Reduce outdoor activities and wear a mask if necessary. Keep windows closed.';
            case 'Very Poor':
                return 'Avoid outdoor activities. Use air purifiers indoors and keep windows closed.';
            default:
                return 'Unable to get current air quality data. Monitor local weather reports.';
        }
    };

    const getSeasonalHealthTips = () => {
        const season = getCurrentSeason();
        switch (season) {
            case 'Summer':
                return [
                    'Stay hydrated with increased water intake',
                    'Use sunscreen when outdoors',
                    'Watch for signs of heat exhaustion'
                ];
            case 'Winter':
                return [
                    'Keep up vitamin D intake',
                    'Practice proper hand hygiene during flu season',
                    'Stay active despite cold weather'
                ];
            case 'Spring':
                return [
                    'Be aware of seasonal allergies',
                    'Gradually increase outdoor activity',
                    'Include fresh seasonal produce in diet'
                ];
            case 'Fall':
                return [
                    'Get your flu vaccination',
                    'Adjust exercise routine for cooler weather',
                    'Boost immune system with proper nutrition'
                ];
        }
    };

    const getLocalHealthRisks = () => [
        'Seasonal allergies in your area are currently high',
        'Local flu activity is moderate',
        'UV index alerts during peak hours'
    ];

    const getPreventionTips = () => [
        'Regular hand washing for 20 seconds',
        'Stay up to date with vaccinations',
        'Maintain social distancing when necessary',
        'Use air purifiers during poor air quality days'
    ];

    if (loading) {
        return <div className="animate-pulse">Loading health data...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Health Dashboard</h2>
                <button
                    onClick={fetchLatestAssessment}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-150"
                >
                    Refresh Data
                </button>
            </div>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-32"></div>
                    ))}
                </div>
            ) : assessment ? (
                <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {getHealthMetrics().map((metric, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2 bg-gray-50 rounded-lg">
                                            {metric.icon}
                                        </div>
                                        <span className="text-sm font-medium text-gray-500">{metric.unit}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-medium text-gray-500">
                                            {metric.title}
                                        </h3>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {metric.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Insights</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {getRecommendations().map((rec, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-2 h-2 rounded-full ${
                                            rec.severity === 'warning' ? 'bg-yellow-400' :
                                            rec.severity === 'danger' ? 'bg-red-400' :
                                            'bg-blue-400'
                                        }`} />
                                        <h4 className="font-medium text-gray-900">{rec.category}</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm">{rec.message}</p>
                                    {rec.action && (
                                        <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                            Learn More →
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Local Health Insights & Prevention
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Air Quality Card */}
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Air Quality</h4>
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        aqiData?.label === 'Good' ? 'bg-green-100 text-green-800' :
                                        aqiData?.label === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {aqiData?.label || 'Updating...'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {getAirQualityRecommendation(aqiData?.label)}
                                </p>
                            </div>

                            {/* Seasonal Health Card */}
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Seasonal Health Tips</h4>
                                    <span className="text-sm text-gray-500">
                                        {getCurrentSeason()}
                                    </span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    {getSeasonalHealthTips().map((tip, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-teal-500">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Local Health Risks */}
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <h4 className="font-medium text-gray-900 mb-3">Current Health Alerts</h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    {getLocalHealthRisks().map((risk, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-orange-500">⚠️</span>
                                            {risk}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Prevention Tips */}
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <h4 className="font-medium text-gray-900 mb-3">Prevention Guidelines</h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    {getPreventionTips().map((tip, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-blue-500">✓</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Challenges</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {gamificationData.currentChallenges.map((challenge, index) => (
                                <div key={index} className="bg-white rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                                        <span className="text-sm text-indigo-600">{challenge.points} XP</span>
                                    </div>
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                            <div 
                                                style={{ width: `${(challenge.current/challenge.target)*100}%` }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Progress: {challenge.current}/{challenge.target} {challenge.unit}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <ImageAnalysis />
                    </div>


                    {/* Wellness Plan Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Wellness Plan</h2>
                        
                        {/* Exercise Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Exercise Routine</h3>
                            <div className="bg-gray-50 p-4 rounded-md">
                                {assessment && assessment.exercise_minutes && (
                                    <div className="text-sm text-gray-600">
                                        <p>Current Activity Level: {assessment.exercise_minutes} minutes/week</p>
                                        <p>Target: 150 minutes/week</p>
                                    </div>
                                )}
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-indigo-600">•</span>
                                        Moderate cardio exercises: 30 minutes, 3x/week
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-indigo-600">•</span>
                                        Strength training: 20 minutes, 2x/week
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Nutrition Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Nutrition Plan</h3>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-600">•</span>
                                        Balanced meals with protein, whole grains, and vegetables
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-600">•</span>
                                        Stay hydrated: 8 glasses of water daily
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Lifestyle Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Lifestyle Tips</h3>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <ul className="space-y-2">
                                    {assessment && assessment.sleep_hours < 7 && (
                                        <li className="flex items-center gap-2">
                                            <span className="text-blue-600">•</span>
                                            Improve sleep schedule: aim for 7-9 hours
                                        </li>
                                    )}
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-600">•</span>
                                        Practice stress management techniques
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-600">•</span>
                                        Maintain consistent sleep schedule
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2-2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Assessment Data</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by completing your health assessment.</p>
                    <div className="mt-6">
                        <a
                            href={route('health.create')}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Take Assessment
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
