<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mri_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('health_assessment_id')->constrained()->onDelete('cascade');
            $table->date('scan_date');
            $table->text('analysis_results')->nullable();
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mri_analyses');
    }
};
