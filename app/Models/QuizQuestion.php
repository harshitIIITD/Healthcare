<?php
// app/Models/QuizQuestion.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = ['question', 'category'];

    public function answers()
    {
        return $this->hasMany(QuizAnswer::class);
    }
}