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
            'course' => $row[2],
            'company' => $row[3],
            'overallhours' => $row[4],
            'renderedhours' => $row[5] ?? 0,
            'documentaudit' => $row[6] ?? 0,
            'total_documents' => 4,
            'batchyear' => $row[7],
        ]
    );
    }
}