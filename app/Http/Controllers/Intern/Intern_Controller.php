<?php

namespace App\Http\Controllers\Intern;

use App\Models\Intern;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\ActivityLog;

use App\Imports\InternsImport;
use Maatwebsite\Excel\Facades\Excel;

class Intern_Controller extends Controller
{

    private function getStatus($completion, $docAudit = 0, $totalDocs = 4)
        {
            return match (true) {
                $completion >= 100 && $docAudit == $totalDocs => 'COMPLETED',
                $completion >= 50 => 'ON-GOING',
                $completion > 0 => 'AT RISK',
                default => 'INACTIVE',
            };
        }


    public function index(Request $request)
    {
        $interns = Intern::all();

        $formattedInterns = $interns->map(function ($intern) {

            $hoursRendered = is_numeric($intern->renderedhours) ? $intern->renderedhours : 0;
            $totalHours = is_numeric($intern->overallhours) ? $intern->overallhours : 0;

            $completion = $totalHours > 0 ? round(($hoursRendered / $totalHours) * 100) : 0;

            $status = $this->getStatus(
                $completion,
                $intern->documentaudit,
                $intern->total_documents
            );
            return [
                'id' => $intern->id,
                'name' => $intern->name,
                'studentId' => $intern->studentid,
                'company' => $intern->company,
                
                'role' => $intern->role,
                'course' => $intern->course,

                'hoursRendered' => $intern->renderedhours,
                'totalHours' => $intern->overallhours,
                'completion' => $completion,

                'docAudit' => $intern->documentaudit,
                'totalDocs' => $intern->total_documents,
                
                'tasksLogged' => $intern->tasks_logged ?? 0,
                'aiPerformance' => $completion,

                'status' => $status,

                'batchyear' => $intern->batchyear,
            ];
        });

        $pendingDocs = $interns->sum(function ($intern) {
            $totalDocs = is_numeric($intern->total_documents) ? $intern->total_documents : 0;
            $docAudit = is_numeric($intern->documentaudit) ? $intern->documentaudit : 0;

            return $totalDocs - $docAudit;
        });

        $totalInterns = $interns->count();

        $activeOjt = $formattedInterns->filter(fn($i) =>
            in_array($i['status'], [
                'COMPLETED',
                'ON-GOING',
            ])
        )->count();

        $totalRendered = $interns->sum('renderedhours');
        $totalRequired = $interns->sum('overallhours');

        $avgCompletion = $totalRequired > 0
            ? round(($totalRendered / $totalRequired) * 100)
            : 0;

        $batchYears = $interns
            ->pluck('batchyear')
            ->filter()
            ->unique()
            ->values()
            ->toArray();

        return Inertia::render('OJT-Interns/Interns', [
            'interns' => $formattedInterns,
            'batchYears' => $batchYears, 
            'stats' => [
                'totalInterns' => $totalInterns,
                'activeOjt' => $activeOjt,
                'pendingDocs' => $pendingDocs, 
                'avgCompletion' => $avgCompletion,
                'growth' => 0,
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
             'batchyear' => 'required|string',
        ]);

        Intern::create([
        'name' => $request->name,
        'studentid' => $request->studentid,
        'company' => $request->company,
        'overallhours' => $request->overallhours,
        'renderedhours' => 0,
        'batchyear' => $request->batchyear, 
    ]);


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
            dd($e->getMessage()); 
        }
    }

    return back()->withErrors([
        'file' => 'No file uploaded'
    ]);
}
    
    public function show(Intern $intern)
    {
        $logs = ActivityLog::where('intern_id', $intern->id)->get();

        $completion = $intern->overallhours > 0
            ? round(($intern->renderedhours / $intern->overallhours) * 100)
            : 0;

        $status = $this->getStatus(
            $completion,
            $intern->documentaudit,
            $intern->total_documents
        );
        return Inertia::render('OJT-Interns/View-Details', [
            'student' => [
                'name' => $intern->name,
                'studentId' => $intern->studentid,
                'role' => $intern->role ?? 'N/A',
                'course' => $intern->course ?? 'N/A',

                'totalHours' => $intern->overallhours,
                'tasksLogged' => $logs->count(),
                'aiPerformance' => $completion,
                'milestoneProgress' => $completion,
                
                'status' => $status,
                'executiveSummary' => $intern->executive_summary ?? 'No summary available.',
            ],
            'logs' => $logs,
        ]);
    }

}