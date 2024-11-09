<?php

namespace App\Http\Controllers;

use App\Models\MriAnalysis;
use App\Services\MedicalImageAnalysisService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MriAnalysisController extends Controller
{
    protected $analysisService;

    public function __construct(MedicalImageAnalysisService $analysisService)
    {
        $this->analysisService = $analysisService;
    }

    public function create()
    {
        return Inertia::render('MriAnalysis/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'brain_mri' => 'nullable|file|max:102400',
                'spine_mri' => 'nullable|file|max:102400',
                'chest_mri' => 'nullable|file|max:102400',
                'notes' => 'nullable|string',
            ]);

            // Create initial analysis record
            $analysis = MriAnalysis::create([
                'scan_date' => now(),
                'status' => 'pending',
            ]);

            // Process each uploaded MRI
            $results = [];
            foreach (['brain_mri', 'spine_mri', 'chest_mri'] as $type) {
                if ($request->hasFile($type)) {
                    $file = $request->file($type);
                    $path = $file->path();
                    $analysisType = str_replace('_mri', '', $type);
                    $results[$type] = $this->analysisService->analyze($path, $analysisType, 0); // Use 0 as guest user ID
                }
            }

            // Update analysis record with results
            $analysis->update([
                'analysis_results' => json_encode($results),
                'status' => 'completed'
            ]);

            return Inertia::render('MriAnalysis/Results', [
                'success' => true,
                'analysis' => [
                    'analysis_id' => $analysis->id,
                    'status' => 'completed',
                    'findings' => $results['findings'] ?? 'Analysis completed',
                    'severity' => $results['severity'] ?? 'normal',
                    'recommendations' => $results['recommendations'] ?? ['Please consult with your healthcare provider'],
                    'requires_review' => true,
                    'disclaimer' => $this->analysisService->getDisclaimerText(),
                ]
            ]);

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function results($id)
    {
        $analysis = ImageAnalysis::findOrFail($id);
        
        return Inertia::render('MriAnalysis/Results', [
            'analysis' => [
                'findings' => decrypt($analysis->findings),
                'severity' => $analysis->severity,
                'recommendations' => decrypt($analysis->recommendations),
                'requires_review' => true,
                'disclaimer' => $this->analysisService->getDisclaimerText()
            ]
        ]);
    }
}