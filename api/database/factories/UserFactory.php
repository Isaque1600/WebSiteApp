<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(string $userName = '', string $password = '', string $situation = '', string $type = ''): array
    {
        return [
            'login' => $userName ?: fake()->userName(),
            'senha' => static::$password ??= Crypt::encrypt($password ?: 'password'),
            'situation' => $situation ?: fake()->randomElement(['active', 'inactive']),
            'type' => $type ?: fake()->randomElement(['contador', 'admin']),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
        ]);
    }
}
