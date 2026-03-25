<?php

namespace App\Http\Controllers\Intern;

use App\Models\Intern;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

use App\Imports\InternsImport;
use Maatwebsite\Excel\Facades\Excel;

class Intern_Controller extends Controller
{

    private function getStatus($completion)
    {
        return match (true) {
            $completion >= 80 => 'ON-TRACK',
            $completion >= 50 => 'EVALUATION PENDING',
            default => 'AT RISK',
        };
    }


    public function index(Request $request)
    {
        $interns = Intern::all();

        $totalInterns = $interns->count();

        $activeOjt = $interns->filter(function ($intern) {
            $completion = $intern->overallhours > 0
                ? ($intern->renderedhours / $intern->overallhours) * 100
                : 0;

            $status = $this->getStatus($completion);

            return in_array($status, ['ON-TRACK', 'EVALUATION PENDING']);
        })->count();        

        $pendingDocs = $interns->where('docAudit', '<', 4)->count();

        $totalRendered = $interns->sum('renderedhours');
        $totalRequired = $interns->sum('overallhours');

        $avgCompletion = $totalRequired > 0 
            ? round(($totalRendered / $totalRequired) * 100)
            : 0;

        $currentYear = now()->year;
        $lastYear = $currentYear - 1;

        $currentInterns = Intern::whereYear('created_at', $currentYear)->count();

        $lastSemesterTotal = Intern::whereYear('created_at', $lastYear)->count();

        $growth = $lastSemesterTotal > 0
            ? round((($currentInterns - $lastSemesterTotal) / $lastSemesterTotal) * 100)
            : 0;

        return Inertia::render('OJT-Interns/Interns', [
            'interns' => $interns,
            'stats' => [
                'totalInterns' => $totalInterns,
                'activeOjt' => $activeOjt,
                'pendingDocs' => $pendingDocs,
                'avgCompletion' => $avgCompletion,
                'growth' => $growth, 
            ]
        ]);
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

    public function update(Request $request, Intern $intern)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'studentid' => [
                'required',
                'regex:/^[0-9]{6,9}$/',
                Rule::unique('interns', 'studentid')->ignore($intern->id),
            ],
            'company' => ['required', 'string'],
            'overallhours' => ['required', 'integer'],
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

    

    public function import(Request $request)
{
    $request->validate([
        'file' => 'required|mimes:xlsx,xls'
    ]);

    $file = $request->file('file');

    if ($file) {
        try {
            Excel::import(new InternsImport, $file);

            return back()->with('message', 'Students imported successfully!');
        } catch (\Exception $e) {
            return back()->withErrors([
                'file' => 'Import failed: ' . $e->getMessage()
            ]);
        }
    }

    return back()->withErrors([
        'file' => 'No file uploaded'
    ]);
}
    
    public function show(Intern $intern)
    {
        $completion = $intern->overallhours > 0
            ? round(($intern->renderedhours / $intern->overallhours) * 100)
            : 0;

        $status = match (true) {
            $completion >= 80 => 'ON-TRACK',
            $completion >= 50 => 'EVALUATION PENDING',
            default => 'AT RISK',
        };

        return Inertia::render('OJT-Interns/View-Details', [
            'student' => [
                'name' => $intern->name,
                'studentId' => $intern->studentid,
                'role' => 'Intern',
                'course' => 'BSIT',

                'totalHours' => $intern->overallhours,
                'tasksLogged' => $intern->tasks_logged ?? 0,
                'aiPerformance' => $intern->ai_performance ?? 0,
                'milestoneProgress' => $completion,

                'status' => $status,
                'executiveSummary' => $intern->executive_summary ?? 'No summary available.'
            ]
        ]);
    }

}