<?php

namespace App\Http\Controllers;

use App\Models\BookingRequest;
use App\Models\NewsletterSignup;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PublicInteractionController extends Controller
{
    public function storeBooking(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_date' => ['required', 'date'],
            'city_country' => ['required', 'string', 'max:255'],
            'venue_promoter' => ['required', 'string', 'max:255'],
            'estimated_capacity' => ['required', 'string', 'max:50'],
            'offer_range' => ['required', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'contact_email' => ['required', 'email', 'max:255'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $booking = BookingRequest::create($validated);

        return response()->json([
            'message' => 'Booking request received.',
            'reference' => $booking->id,
        ], 201);
    }

    public function subscribeNewsletter(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        $signup = NewsletterSignup::firstOrCreate(
            ['email' => $validated['email']],
            ['opted_in_at' => now()]
        );

        return response()->json([
            'message' => 'Subscription saved.',
            'id' => $signup->id,
        ], 201);
    }
}
