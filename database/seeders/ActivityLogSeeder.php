<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ActivityLog;
use App\Models\Intern;

class ActivityLogSeeder extends Seeder
{
    public function run(): void
    {
        $interns = Intern::all();

        if ($interns->isEmpty()) {
            $this->command->info('No interns found. Seed interns first.');
            return;
        }

        foreach ($interns as $intern) {
    $intern->activityLogs()->create([
        'date'        => '2026-03-15',
        'description' => 'Final API deployment & validation',
        'duration'    => '8h 00m',
        'status'      => 'Verified',
    ]);

    $intern->activityLogs()->create([
        'date'        => '2026-03-14',
        'description' => 'CORS policy debugging & Auth fix',
        'duration'    => '8h 30m',
        'status'      => 'Verified',
    ]);

    $intern->activityLogs()->create([
        'date'        => '2026-03-13',
        'description' => 'Legacy codebase performance audit',
        'duration'    => '7h 45m',
        'status'      => 'Verified',
    ]);
}

        $this->command->info('Activity logs seeded successfully!');
    }
}