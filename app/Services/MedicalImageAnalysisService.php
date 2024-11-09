<?php
// app/Services/MedicalImageAnalysisService.php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Models\ImageAnalysis;
use App\Events\ImageAnalysisCompleted;

class MedicalImageAnalysisService
{
    private const ALLOWED_TYPES = ['brain', 'spine', 'chest'];
    private const DICOM_HEADERS = ['DICM'];
    private $newMriAnalysisService;

    public function __construct(NewMriAnalysisService $newMriAnalysisService)
    {
        $this->newMriAnalysisService = $newMriAnalysisService;
    }

    public function analyze(string $imagePath, string $type, int $userId): array 
    {
        $this->validateRequest($type);
        
        // Log analysis attempt for HIPAA compliance
        Log::channel('hipaa_audit')->info('Image analysis initiated', [
            'user_id' => $userId,
            'image_type' => $type,
            'timestamp' => now()
        ]);

        try {
            // Verify DICOM format for medical images
            $this->validateDicomFormat($imagePath);

            // Use the new analysis service
            $results = $this->newMriAnalysisService->analyze($imagePath, $type);

            // Store analysis results with PHI protection
            $analysis = ImageAnalysis::create([
                'user_id' => $userId,
                'image_type' => $type,
                'findings' => encrypt($results['findings']),
                'severity' => $results['severity'],
                'recommendations' => encrypt($results['recommendations'])
            ]);

            // Trigger event for audit trail
            event(new ImageAnalysisCompleted($analysis));

            return [
                'analysis_id' => $analysis->id,
                'disclaimer' => $this->getDisclaimerText(),
                'requires_review' => true,
                'findings' => $results['findings'],
                'severity' => $results['severity'],
                'recommendations' => $results['recommendations']
            ];

        } catch (\Exception $e) {
            Log::channel('hipaa_audit')->error('Image analysis failed', [
                'user_id' => $userId,
                'error' => $e->getMessage()
            ]);

            throw new \Exception('Image analysis failed. Please contact your healthcare provider.');
        }
    }

    private function validateRequest(string $type): void
    {
        if (!in_array($type, self::ALLOWED_TYPES)) {
            throw new \InvalidArgumentException('Invalid image type specified');
        }
    }

    private function validateDicomFormat(string $path): void 
    {
        // Validate DICOM format headers
        $handle = fopen($path, 'rb');
        $header = fread($handle, 132);
        fclose($handle);

        if (!str_contains($header, 'DICM')) {
            throw new \InvalidArgumentException('Invalid DICOM format');
        }
    }

    private function processImage(string $path, string $type): array
    {
        $this->validateDicomFormat($path);
        
        $analysisResult = $this->newMriAnalysisService->analyze($path, $type);
        
        return [
            'findings' => $analysisResult['analysis'] ?? 'Analysis pending',
            'severity' => $analysisResult['severity'] ?? 'pending_review',
            'recommendations' => $analysisResult['recommendations'] ?? ['Consult with healthcare provider for interpretation']
        ];
    }

    private function getDisclaimerText(): string
    {
        return "This analysis is preliminary and for informational purposes only. " .
               "All results must be reviewed by a qualified healthcare professional. " .
               "Do not make medical decisions based on these results without consulting your healthcare provider.";
    }
}