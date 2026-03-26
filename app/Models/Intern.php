<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Intern extends Model
{
    protected $fillable = [
    'name',
    'role',
    'studentid',
    'course',
    'company',
    'overallhours',
    'renderedhours',
    'documentaudit',
    'batchyear',
    ];
}