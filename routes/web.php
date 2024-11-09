<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HealthAssessmentController;
use App\Http\Controllers\GamificationController;
use App\Models\HealthAssessment;
use App\Http\Controllers\EducationalContentController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\Games\MeditationController;
use App\Http\Controllers\Games\StepChallengeController;
use App\Http\Controllers\Games\HealthQuizController;
use App\Http\Controllers\WellnessPlanController;
use App\Http\Controllers\MriAnalysisController;
use App\Http\Controllers\ChatController;

// Public routes (place these before auth middleware routes)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'features' => [
            'Health Assessment Tools',
            'MRI Analysis',
            'Educational Content',
            'Personalized Recommendations',
            'Expert Chat Support'
        ]
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/dashboard', function () {
    $latestAssessment = HealthAssessment::where('user_id', auth()->id())
        ->latest()
        ->first();

    return Inertia::render('Dashboard', [
        'latestAssessment' => $latestAssessment
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/test-weather-api', function () {
    $weatherService = new \App\Services\WeatherService();
    return ['connected' => $weatherService->testConnection()];
});

Route::get('/mri/create', [MriAnalysisController::class, 'create'])->name('mri.create');
Route::post('/mri', [MriAnalysisController::class, 'store'])->name('mri.store');
Route::get('/mri/results/{id}', [MriAnalysisController::class, 'results'])->name('mri.results');

Route::post('/chat/message', [ChatController::class, 'message'])->name('chat.message');
Route::post('/chat/content', [ChatController::class, 'addContent'])->name('chat.content');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/health-assessment', [HealthAssessmentController::class, 'create'])->name('health.create');
    Route::post('/health-assessment', [HealthAssessmentController::class, 'store'])->name('health.store');
    Route::get('/mri-analysis', [HealthAssessmentController::class, 'mriAnalysis'])->name('mri.analysis');
    Route::post('/mri-analysis', [HealthAssessmentController::class, 'storeMriAnalysis'])->name('mri.storeMriAnalysis');
    Route::post('/update-location', [HealthAssessmentController::class, 'updateLocation'])->name('location.update');
    Route::post('/analyze-image', [HealthAssessmentController::class, 'analyzeImage'])->name('image.analyze');

    // Educational Content Routes
    Route::get('/articles', [EducationalContentController::class, 'index'])->name('articles.index');
    Route::get('/articles/{article}', [EducationalContentController::class, 'show'])->name('articles.show');

    Route::get('/videos', [EducationalContentController::class, 'videos'])->name('videos.index');
    Route::get('/videos/{video}', action: [EducationalContentController::class, 'showVideo'])->name('videos.show');

    Route::get('/quizzes', [EducationalContentController::class, 'quizzes'])->name('quizzes.index');
    Route::get('/quizzes/{quiz}', [EducationalContentController::class, 'showQuiz'])->name('quizzes.show');
    Route::post('/quizzes/{quiz}/submit', [EducationalContentController::class, 'submitQuiz'])->name('quizzes.submit');

    // Add these new routes within the existing auth middleware group
    Route::get('/wellness-plan', [WellnessPlanController::class, 'show'])->name('wellness.show');
    Route::post('/wellness-plan/generate', [WellnessPlanController::class, 'generate'])->name('wellness.generate');

    // Add this new route
    Route::get('/exercise-plan', [HealthAssessmentController::class, 'generateExercisePlan'])->name('exercise.plan');
    Route::get('/mri/results/{analysis}', [MriAnalysisController::class, 'results'])->name('mri.results');

    // Add these new routes
    Route::get('/mri/results/{id}', [MriAnalysisController::class, 'resultsById'])->name('mri.resultsById');
});

require __DIR__.'/auth.php';
