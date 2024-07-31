<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id("cod_pes");
            $table->string("nome", 60)->nullable();
            $table->string("razao", 60)->nullable();
            $table->string("logradouro", 60)->nullable();
            $table->string("numero", 8)->nullable();
            $table->string("bairro", 60)->nullable();
            $table->string("cidade", 60)->nullable();
            $table->string("cep", 9)->nullable();
            $table->string("uf", 2)->nullable();
            $table->string("cnpj", 18)->nullable();
            $table->string("ie", 12)->nullable();
            $table->string("contato", 30)->nullable();
            $table->string("sistema", 11)->nullable();
            $table->string("serial", 15)->nullable();
            $table->string("obs", 250)->nullable();
            $table->date("ven_cert")->nullable();
            $table->string("email", 100)->nullable();
            $table->string("situacao", 7)->nullable();
            $table->string("tef", 3)->nullable()->default("não");
            $table->string("nfe", 3)->nullable()->default("não");
            $table->string("sped", 3)->nullable()->default("não");
            $table->string("contador", 40)->nullable();
            $table->string("email_backup", 120)->nullable();
            $table->string("senha_backup", 300)->nullable();
            $table->string("tipo", 10)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('people');
    }
};
