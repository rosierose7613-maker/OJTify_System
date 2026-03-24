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
Route::get('/interns/{intern}', [Intern_Controller::class, 'show'])
    ->name('interns.show');
Route::post('/interns/import', [Intern_Controller::class, 'import'])
    ->name('interns.import');

    Route::get('/api/check-studentid/{id}', function ($id) {
    return response()->json([
        'exists' => \App\Models\Intern::where('studentid', $id)->exists()
    ]);
});


require __DIR__.'/settings.php';
