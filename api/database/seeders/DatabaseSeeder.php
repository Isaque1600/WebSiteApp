<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1)->create([
            "login" => "admin",
            "senha" => Crypt::encrypt("123"),
            "type" => "admin",
        ]);
        // User::factory(10)->create();
    }
}
