<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\NewMriAnalysisService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(NewMriAnalysisService::class, function ($app) {
            return new NewMriAnalysisService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
