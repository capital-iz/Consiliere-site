<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    protected $fillable = [
        'event_date',
        'city_country',
        'venue_promoter',
        'estimated_capacity',
        'offer_range',
        'contact_name',
        'contact_email',
        'notes',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];
}
