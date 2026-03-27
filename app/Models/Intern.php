<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Intern extends Model
{
    protected $fillable = [
    'name',
    'studentid',
    'course',
    'company',
    'overallhours',
    'renderedhours',
    'documentaudit',
    'batchyear',
    ];

     public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }
}