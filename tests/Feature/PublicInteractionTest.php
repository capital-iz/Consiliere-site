<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicInteractionTest extends TestCase
{
    use RefreshDatabase;

    public function test_booking_request_is_stored(): void
    {
        $response = $this->postJson('/bookings/request', [
            'event_date' => '2026-09-12',
            'city_country' => 'Frankfurt, DE',
            'venue_promoter' => 'Main Club',
            'estimated_capacity' => '500-1000',
            'offer_range' => '5000-8000',
            'contact_name' => 'John Doe',
            'contact_email' => 'john@venue.com',
            'notes' => 'Sunrise slot preferred.',
        ]);

        $response
            ->assertCreated()
            ->assertJsonStructure(['message', 'reference']);

        $this->assertDatabaseHas('booking_requests', [
            'contact_email' => 'john@venue.com',
            'venue_promoter' => 'Main Club',
        ]);
    }

    public function test_newsletter_signup_is_saved_without_duplicates(): void
    {
        $responseOne = $this->postJson('/newsletter/subscribe', [
            'email' => 'fan@example.com',
        ]);

        $responseTwo = $this->postJson('/newsletter/subscribe', [
            'email' => 'fan@example.com',
        ]);

        $responseOne->assertCreated();
        $responseTwo->assertCreated();
        $this->assertDatabaseCount('newsletter_signups', 1);
    }
}
