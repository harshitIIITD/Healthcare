<?php
// app/Models/MriAnalysis.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MriAnalysis extends Model
{
    protected $fillable = [
        'health_assessment_id',
        // other fields
    ];

    public function healthAssessment()
    {
        return $this->belongsTo(HealthAssessment::class);
    }
}