<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePersonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => ['unique:people,nome', 'string'],
            'razao' => ['unique:people,razao', 'string'],
            'logradouro' => ['string'],
            'numero' => ['string'],
            'bairro' => ['string'],
            'cidade' => ['string'],
            'cep' => ['string'],
            'uf' => ['string', 'max:2', 'uppercase'],
            'cnpj' => ['string', 'max:18'],
            'ie' => ['string'],
            'contato' => ['string'],
            'sistema' => ['string'],
            'serial' => ['string'],
            'obs' => ['string'],
            'ven_cert' => ['date_format:d/m/Y'],
            'email' => ['string'],
            'situacao' => ['string', Rule::in(['ativo', 'inativo'])],
            'tef' => ['string', Rule::in(['sim', 'nao'])],
            'nfe' => ['string', Rule::in(['sim', 'nao'])],
            'sped' => ['string', Rule::in(['sim', 'nao'])],
            'contador' => ['string', Rule::exists('users', 'login')->where('type', 'contador')],
            'email_backup' => ['string'],
            'senha_backup' => ['string'],
            'tipo' => ['string', Rule::in(['cliente', 'contador'])],
        ];
    }
}
