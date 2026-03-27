<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'intern_id',
        'date',
        'description',
        'duration',
        'status',
    ];
}
