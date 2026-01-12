<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePersonRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'nome'         => [
                'required_if:tipo,contador',
                'unique:people,nome',
                'string'
            ],
            'razao'        => [
                'unique:people,razao',
                'string'
            ],
            'logradouro'   => [
                'nullable',
                'string'
            ],
            'numero'       => [
                'nullable',
                'string'
            ],
            'bairro'       => [
                'nullable',
                'string'
            ],
            'cidade'       => [
                'nullable',
                'string'
            ],
            'cep'          => [
                'nullable',
                'string'
            ],
            'uf'           => [
                'nullable',
                'string',
                'max:2',
                'uppercase'
            ],
            'cnpj'         => [
                'nullable',
                'string',
                'max:18'
            ],
            'ie'           => [
                'nullable',
                'string'
            ],
            'contato'      => [
                'nullable',
                'string'
            ],
            'sistema'      => [
                'nullable',
                'string'
            ],
            'serial'       => [
                'nullable',
                'string'
            ],
            'obs'          => [
                'nullable',
                'string'
            ],
            'ven_cert'     => [
                'nullable',
                'date'
            ],
            'email'        => [
                'nullable',
                'string'
            ],
            'situacao'     => [
                'nullable',
                'string',
                Rule::in([
                    'ativo',
                    'inativo'
                ])
            ],
            'tef'          => [
                'nullable',
                'string',
                Rule::in([
                    'sim',
                    'nao'
                ])
            ],
            'nfe'          => [
                'nullable',
                'string',
                Rule::in([
                    'sim',
                    'nao'
                ])
            ],
            'sped'         => [
                'nullable',
                'string',
                Rule::in([
                    'sim',
                    'nao'
                ])
            ],
            'contador'     => [
                'nullable',
                'string',
                Rule::exists('users', 'login')->where('type', 'contador')
            ],
            'email_backup' => [
                'nullable',
                'string'
            ],
            'senha_backup' => [
                'nullable',
                'string'
            ],
            'tipo'         => [
                'string',
                Rule::in([
                    'cliente',
                    'contador'
                ])
            ],
            ['senha' => [
                'required_if:tipo,contador',
                'string',
            ]]
        ];
    }
}