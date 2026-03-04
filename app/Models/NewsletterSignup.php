<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsletterSignup extends Model
{
    protected $fillable = [
        'email',
        'opted_in_at',
    ];

    protected $casts = [
        'opted_in_at' => 'datetime',
    ];
}
