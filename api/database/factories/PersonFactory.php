<?php

namespace Database\Factories;

use App\Models\System;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Person>
 */
class PersonFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'nome'     => fake()->userName(),
            'tipo'     => fake()->randomElement([
                'cliente',
                'contador'
            ]),
            'email'    => fake()->unique()
                ->safeEmail(),
            'sistema'  =>
                System::inRandomOrder()->first()
                    ->nome ?? '',
            'situacao' => fake()->randomElement([
                'ativo',
                'inativo'
            ]),
        ];
    }
}
