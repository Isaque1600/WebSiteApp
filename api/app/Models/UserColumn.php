<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserColumn extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'columns',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}