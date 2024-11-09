<?php
// app/Services/WeatherService.php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherService
{
    private $apiKey;
    private $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.openweathermap.key');
        $this->baseUrl = config('services.openweathermap.url');
    }

    public function testConnection()
    {
        try {
            $response = Http::get("{$this->baseUrl}/air_pollution", [
                'lat' => 40.7128,
                'lon' => -74.0060,
                'appid' => $this->apiKey
            ]);
            
            return $response->successful();
        } catch (\Exception $e) {
            return false;
        }
    }
}