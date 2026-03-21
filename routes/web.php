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
Route::put('/interns/{intern}', [Intern_Controller::class, 'update'])
    ->name('interns.update');
Route::delete('/interns/{intern}', [Intern_Controller::class, 'destroy'])
    ->name('intern.destroy');

require __DIR__.'/settings.php';
