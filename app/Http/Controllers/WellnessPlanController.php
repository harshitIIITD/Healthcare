<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HealthAssessment;

class WellnessPlanController extends Controller
{
    public function show(Request $request)
    {
        $latestAssessment = HealthAssessment::where('user_id', auth()->id())
            ->with(['mriAnalysis'])
            ->latest()
            ->first();

        $plan = $this->generatePlan($latestAssessment);

        return response()->json(['plan' => $plan]);
    }

    private function generateExerciseRoutine($assessment)
    {
        return [
            'activities' => [
                'Walking',
                'Yoga',
                'Cycling'
            ],
            // ... other exercise details ...
        ];
    }

    private function calculateIntensity($assessment)
    {
        // Calculate based on health metrics
        if ($assessment->blood_pressure_systolic > 140 || 
            $assessment->blood_pressure_diastolic > 90) {
            return 'Low to Moderate';
        }
        return 'Moderate';
    }

    private function getCardioActivities($assessment)
    {
        return [
            'Walking',
            'Swimming',
            'Cycling',
            'Low-impact aerobics'
        ];
    }

    private function generateNutritionPlan($assessment)
    {
        return [
            'breakfast' => $this->getBreakfastOptions($assessment),
            'lunch' => $this->getLunchOptions($assessment),
            'dinner' => $this->getDinnerOptions($assessment),
            'snacks' => $this->getSnackOptions($assessment)
        ];
    }

    private function getBreakfastOptions($assessment)
    {
        return ['Oatmeal', 'Smoothie', 'Eggs'];
    }

    private function getLunchOptions($assessment)
    {
        return ['Salad', 'Grilled chicken', 'Vegetable soup'];
    }

    private function getDinnerOptions($assessment)
    {
        return ['Fish', 'Steamed vegetables', 'Quinoa'];
    }

    private function getSnackOptions($assessment)
    {
        return ['Nuts', 'Fruit', 'Yogurt'];
    }

    private function generatePlan($assessment)
    {
        return [
            'exercise' => $this->generateExerciseRoutine($assessment),
            'nutrition' => $this->generateNutritionPlan($assessment),
            'lifestyle' => $this->generateLifestyleRecommendations($assessment)
        ];
    }

    private function generateLifestyleRecommendations($assessment)
    {
        return [
            'tips' => [
                'Maintain consistent sleep schedule',
                'Reduce screen time before bed',
                'Practice stress management techniques'
            ]
        ];
    }
}