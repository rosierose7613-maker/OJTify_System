<?php

namespace App\Imports;

use App\Models\Intern;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Log;

class InternsImport implements ToModel
{
    public function model(array $row)
    {
        return new Intern([
            'name' => $row [0],
            'studentid' => $row [1],
            'company' => $row [2],
            'overallhours' => $row [3],
            'renderedhours' => $row [4]
        ]);
    }
}