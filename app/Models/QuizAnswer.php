<?php
// app/Models/QuizAnswer.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAnswer extends Model 
{
    protected $fillable = ['answer', 'is_correct'];

    protected $casts = [
        'is_correct' => 'boolean'
    ];
}