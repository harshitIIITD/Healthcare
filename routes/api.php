<?php

$this->baseUrl = 'https://api.vultrinference.com/v1';
Route::get('/health-insights', 'App\Http\Controllers\HealthInsightsController@index');
use App\Http\Controllers\ChatController;

Route::post('/chat', [ChatController::class, 'message']);
Route::post('/chat/content', [ChatController::class, 'addContent']);

