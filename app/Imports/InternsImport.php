<?php

namespace App\Imports;

use App\Models\Intern;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class InternsImport implements ToModel, WithStartRow
{
    public function startRow(): int
    {
        return 2;
    }

    public function model(array $row)
    {
        return Intern::updateOrCreate(
        ['studentid' => $row[0]],
        [
            'name' => $row[1],
            'role' => $row[2],
            'course' => $row[3],
            'company' => $row[4],
            'overallhours' => $row[5],
            'renderedhours' => $row[6] ?? 0,
            'documentaudit' => $row[7] ?? 0,
            'total_documents' => 4,
            'batchyear' => $row[8],
        ]
    );
    }
}