<?php

namespace App\Http\Controllers\Intern;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Intern_Controller extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('OJT-Interns/Interns');
    }
}
