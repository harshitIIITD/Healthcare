<?php

namespace App\Http\Controllers;

use App\Models\HealthAssessment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Services\MedicalImageAnalysisService;
use Illuminate\Support\Facades\Log;

class HealthAssessmentController extends Controller
{
    private $analysisService;

    public function __construct(MedicalImageAnalysisService $analysisService)
    {
        $this->analysisService = $analysisService;
    }

    public function create()
    {
        return Inertia::render('HealthAssessment/Create');
    }

    public function mriAnalysis()
    {
        return Inertia::render('MriAnalysis/Create');
    }

    public function storeMriAnalysis(Request $request)
    {
        // Validation and storage logic will be implemented later
        $request->validate([
            'image' => 'required|file|max:10240', // Max 10MB
            'type' => 'required|in:brain,spine,chest'
        ]);
        $file = $request->file('image');
        $file->move(storage_path('
        /app/public'), $file->getClientOriginalName());
        return redirect()->route('dashboard');

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'age' => 'required|numeric',
            'sex' => 'required|string',
            'height' => 'required|numeric|min:50|max:300', // Add height validation
            'weight' => 'required|numeric',
            'blood_pressure_systolic' => 'required|numeric',
            'blood_pressure_diastolic' => 'required|numeric',
            'heart_rate' => 'required|numeric',
            'sleep_hours' => 'required|numeric',
            'exercise_minutes' => 'required|numeric',
            'smoking' => 'required|boolean',
            'alcohol_consumption' => 'required|string',
            'family_history' => 'required|array',
            'chronic_conditions' => 'required|array',
        ]);

        $assessment = HealthAssessment::create([
            'user_id' => auth()->id(),
            ...$validated
        ]);

        return redirect()->route('dashboard');
    }

    public function latestAssessment()
    {
        $assessment = HealthAssessment::where('user_id', auth()->id())
            ->latest()
            ->first();

        return response()->json($assessment);
    }

    public function analyzeImage(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'image' => 'required|file|max:10240|mimes:dcm,png,jpg,jpeg,pdf', 
                'type' => 'required|in:brain,spine,chest'
            ]);

            // Attempt file upload to Vultr
            try {
                $path = Storage::disk('s3')->put('images', $request->file('image'));
                $fullPath = Storage::disk('s3')->url($path);
            } catch (\Exception $uploadError) {
                Log::error('File upload failed', [
                    'error' => $uploadError->getMessage(),
                    'user_id' => auth()->id()
                ]);
                
                return response()->json([
                    'error' => 'File upload failed. Please try again.',
                    'details' => $uploadError->getMessage()
                ], 422);
            }

            // Process image analysis
            $results = $this->analysisService->analyze(
                $fullPath, 
                $request->type,
                auth()->id()
            );

            return response()->json($results);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Image analysis failed', [
                'error' => $e->getMessage(),
                'user_id' => auth()->id()
            ]);

            return response()->json([
                'error' => 'Image analysis failed. Please contact support.',
                'requires_review' => true
            ], 500);
        }
    }
}
