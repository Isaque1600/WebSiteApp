<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Person extends Model
{
    use HasFactory;

    protected $primaryKey = "cod_pes";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'razao',
        'logradouro',
        'numero',
        'bairro',
        'cidade',
        'cep',
        'uf',
        'cnpj',
        'ie',
        'contato',
        'sistema',
        'serial',
        'obs',
        'ven_cert',
        'email',
        'situacao',
        'tef',
        'nfe',
        'sped',
        'contador',
        'email_backup',
        'senha_backup',
        'tipo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     * 
     * @var array<int,string>
     */
    protected $hidden = [
        'created_at',
        'updated_at'
    ];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'ven_cert' => 'date',
        ];
    }

    /**
     * Get the User associated with the Person.
     *
     * @return array<string, string>
     */
    protected function user(): HasOne
    {
        return $this->hasOne(User::class, "person_id", "cod_pes");
    }
}
