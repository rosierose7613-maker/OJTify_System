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
        ]);

        Intern::create(array_merge($request->all(), [
            'renderedhours' => 0,
        ]));

        return redirect()->back();
    }

    // 🔹 Add this method exactly like this
    public function update(Request $request, Intern $intern)
    {
        $request->validate([
            'name' => 'required|string',
            'studentid' => ['required', 'regex:/^[0-9]{6,9}$/'],
            'company' => 'required|string',
            'overallhours' => 'required|integer',
        ]);

        $intern->update([
            'name' => $request->name,
            'studentid' => $request->studentid,
            'company' => $request->company,
            'overallhours' => $request->overallhours,
        ]);

        return redirect()->back()->with('message', 'Updated successfully');
    }

    public function destroy(Intern $intern)
    {
        $intern->delete();
        return redirect()->route('interns.index')->with('message', 'Intern deleted Successfully');
    }
}