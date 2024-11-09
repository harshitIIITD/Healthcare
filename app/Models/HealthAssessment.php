<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthAssessment extends Model
{
    protected $fillable = [
        'user_id',
        'age',
        'height',
        'weight',
        'blood_pressure_systolic',
        'blood_pressure_diastolic',
        'heart_rate',
        'sleep_hours',
        'exercise_minutes',
        'smoking',
        'alcohol_consumption',
        'family_history',
        'chronic_conditions'
    ];

    protected $casts = [
        'family_history' => 'array',
        'chronic_conditions' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mriAnalysis()
    {
        return $this->hasOne(MriAnalysis::class);
    }
}
