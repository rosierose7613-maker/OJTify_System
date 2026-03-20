<?php
use App\Http\Controllers\Intern\Intern_Controller;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/interns',[Intern_Controller::class, 'index'])
->name('interns.index');
Route::post('/interns',[Intern_Controller::class, 'store'])
->name('interns.store');

require __DIR__.'/settings.php';
