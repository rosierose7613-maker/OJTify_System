<?php

namespace App\Imports;

use App\Models\Intern;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class InternsImport implements ToModel, WithStartRow
{
    // Start importing from row 2 (skip header)
    public function startRow(): int
    {
        return 2;
    }

    // Map each row to the Intern model
    public function model(array $row)
    {
        return new Intern([
            'name' => $row[0],
            'studentid' => $row[1],
            'company' => $row[2],
            'overallhours' => $row[3],
            'renderedhours' => $row[4] ?? 0, // optional
        ]);
    }
}