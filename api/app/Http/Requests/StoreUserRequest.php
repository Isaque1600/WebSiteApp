<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
            'login' => ['required', 'string', 'max:255', 'unique:users'],
            'senha' => ['required', 'string', 'max:255'],
            'loginTime' => ['date_format:d/m/Y,d-m-Y,Y-m-d'],
            'situacao' => ['string', Rule::in(['ativo', 'inativo'])],
            'type' => ['string', Rule::in(['admin', 'contador'])],
            'person_id' => ['required', 'integer', 'exists:people,id'],
        ];
    }

    /**
     * Get the error messages for the failed validations
     * 
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'login.required' => "O login é obrigatório",
            'login.unique' => "O login deve ser único",
            'senha' => "A senha é obrigatória",
        ];
    }
}
