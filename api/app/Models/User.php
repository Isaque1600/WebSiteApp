<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Crypt;
use Laravel\Sanctum\HasApiTokens;
use Log;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'login',
        'senha',
        'loginTime',
        'situation',
        'type',
        'person_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'loginTime',
        'person_id',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'loginTime' => 'datetime',
        ];
    }

    public function person()
    {
        return $this->belongsTo(Person::class, "person_id", "cod_pes");
    }

    public function userColumns()
    {
        return $this->hasOne(UserColumn::class, 'user_id', 'id');
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Try to authenticate user by login and password.
     * 
     * @return
     */
    public function validatePassword($password)
    {
        if (Crypt::decrypt($this->senha) == $password) {
            return true;
        }

        return false;
    }
}
