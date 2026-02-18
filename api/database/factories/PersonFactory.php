<?php

namespace Database\Factories;

use App\Models\Person;
use App\Models\System;
use App\Models\User;
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
            'nome'         => fake()->userName(),
            'razao'        => fake()->name(),
            'logradouro'   => fake()->streetName(),
            'numero'       => fake()->buildingNumber(),
            'bairro'       => fake()->streetSuffix(),
            'cidade'       => fake()->city(),
            'cep'          => fake()->postcode(),
            'uf'           => fake()->stateAbbr(),
            'cnpj'         => fake()->numerify('##.###.###/####-##'),
            'ie'           => fake()->numerify('#########'),
            'contato'      => fake()->phoneNumber(),
            'sistema'      => System::inRandomOrder()->first()
                ->nome ?? '',
            'serial'       => fake()->numerify('SN-########'),
            'obs'          => fake()->sentence(),
            'ven_cert'     => fake()->date(),
            'email'        => fake()->unique()
                ->safeEmail(),
            'contador'     => function (array $attr) {
                if ($attr['tipo'] === 'contador') {
                    return null;
                }
                return User::inRandomOrder()->firstWhere('type', 'contador')
                    ->id ?? null;
            },
            'email_backup' => fake()->unique()
                ->safeEmail(),
            'senha_backup' => fake()->password(),
            'tipo'         => fake()->randomElement([
                'cliente',
                'contador'
            ]),
            'situacao'     => fake()->randomElement([
                'ativo',
                'inativo'
            ]),
        ];
    }
}
