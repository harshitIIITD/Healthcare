import React from 'react';

export default function HealthRecommendations({ assessmentData }) {
    // Generate recommendations based on assessment data
    const getRecommendations = () => {
        const recommendations = [];
        
        if (assessmentData) {
            // BMI Recommendation
            const bmi = assessmentData.weight / ((assessmentData.height/100) * (assessmentData.height/100));
            if (bmi > 25) {
                recommendations.push({
                    type: 'exercise',
                    title: 'Weight Management',
                    description: 'Consider increasing physical activity and maintaining a balanced diet.',
                    icon: '🏃'
                });
            }
            if (bmi < 18.5) {
                recommendations.push({
                    type: 'exercise',
                    title: 'Weight Management',
                    description: 'Consider increasing caloric intake and strength training.', 
                    icon: '🏋️'
                });
            }


            // Blood Pressure Recommendation
            const systolic = parseInt(assessmentData.blood_pressure_systolic);
            const diastolic = parseInt(assessmentData.blood_pressure_diastolic);
            if (systolic > 120 || diastolic > 80) {
                recommendations.push({
                    type: 'blood-pressure',
                    title: 'Blood Pressure Management',
                    description: 'Monitor your blood pressure regularly and consider lifestyle modifications.',
                    icon: '❤️'
                });
            }

            if (systolic > 140 || diastolic > 90) {
                recommendations.push({
                    type: 'blood-pressure',
                    title: 'Blood Pressure Management',
                    description: 'Consult with a healthcare professional for further evaluation.',
                    icon: '❤️'
                });
            }

            // Sleep Recommendation
            if (assessmentData.sleep_hours < 7) {
                recommendations.push({
                    type: 'sleep',
                    title: 'Sleep Hygiene',
                    description: 'Aim for 7-9 hours of sleep per night for optimal health.',
                    icon: '😴'
                });
            }
            if (assessmentData.sleep_hours > 9) {
                recommendations.push({
                    type: 'sleep',
                    title: 'Sleep Hygiene',
                    description: 'Consider reducing sleep duration to 7-9 hours per night.',
                    icon: '😴'
                });
            }



            // Exercise Recommendation
            if (assessmentData.exercise_minutes < 150) {
                recommendations.push({
                    type: 'exercise',
                    title: 'Physical Activity',
                    description: 'Try to achieve at least 150 minutes of moderate exercise per week.',
                    icon: '💪'
                });
            }
        }

        return recommendations;
    };

    const recommendations = getRecommendations();

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Health Recommendations</h2>
            
            {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((rec, index) => (
                        <div 
                            key={index}
                            className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-lg border border-blue-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="text-3xl mb-3">{rec.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {rec.title}
                            </h3>
                            <p className="text-gray-600">
                                {rec.description}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">
                    Complete your health assessment to receive personalized recommendations.
                </p>
            )}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                    <span className="font-semibold">Note:</span> These recommendations are based on your assessment data. 
                    Always consult with healthcare professionals before making significant changes to your health routine.
                </p>
            </div>
        </div>
    );
}