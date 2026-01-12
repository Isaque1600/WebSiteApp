<?php

namespace Database\Seeders;

use App\Models\System;
use Illuminate\Database\Seeder;

use function count;

class SystemSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $systems = ['GDOOR MEI', 'GDOOR PRO', 'GDOOR SLIM'];
        foreach ($systems as $_key => $value) {
            System::create(['nome' => $value]);
        }
    }
}
