<?php

namespace Database\Seeders;

use App\Models\Person;
use App\Models\User;
use Crypt;
use Illuminate\Database\Seeder;

class PersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Person::factory()->count(10)->afterCreating(function (Person $person) {
            if ($person->tipo === 'contador') {
                User::factory()->create([
                    'login' => $person->nome,
                    'senha' => Crypt::encrypt('password'),
                    'type' => $person->tipo,
                    'situation' => fake()->randomElement(['active', 'inactive']),
                ]);
            }
        })->create();
    }
}
