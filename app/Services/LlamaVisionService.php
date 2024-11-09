<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class LlamaVisionService
{
    private const API_ENDPOINT = 'https://api.llama.ai/v1/vision';
    private const AUTH_TOKEN = 'LLAMA_VISION_API_KEY';

    public function analyzeMedicalImage(string $imagePath): array
    {
        $imageData = base64_encode(file_get_contents($imagePath));

        $response = Http::withToken(self::AUTH_TOKEN)
            ->post(self::API_ENDPOINT, [
                'image' => $imageData,
                'model' => 'medical-vision-v1',
                'prompt' => 'Analyze this brain MRI for any abnormalities or concerns.'
            ]);

        if (!$response->successful()) {
            throw new \Exception('Failed to analyze image with Llama Vision API');
        }

        return $response->json();
    }
}
