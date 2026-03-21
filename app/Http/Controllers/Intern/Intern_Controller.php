<?php

namespace App\Http\Controllers\Intern;

use App\Models\Intern;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Intern_Controller extends Controller
{
    public function index(Request $request)
    {
        $interns = Intern::all();
        return Inertia::render('OJT-Interns/Interns', compact('interns'));
    }

    public function store(Request $request)
    {
    $request->validate([
    'name' => 'required|string',
    'studentid' => ['required', 'regex:/^[0-9]{6,9}$/'],
    'company' => 'required|string',
    'overallhours' => 'required|integer',
    'renderedhours' => 'required|integer',
    ]);

     Intern::create($request->all());

    return redirect()->back();
}
}
