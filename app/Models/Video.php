<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'url', // YouTube, Vimeo, or other video platform URLs
        'description',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        // Add any hidden fields if necessary
    ];

    /**
     * Get the videos associated with a user (if applicable).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    // Uncomment and modify if videos are related to users
    /*
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    */
}
