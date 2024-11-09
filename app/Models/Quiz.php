<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'questions', // Stored as JSON
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'questions' => 'array', // Automatically cast JSON to array
    ];

    /**
     * Get the quizzes associated with a user (if applicable).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    // Uncomment and modify if quizzes are related to users
    /*
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    */
}
