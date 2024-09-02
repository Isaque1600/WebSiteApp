<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'login' => ['string', 'unique:users,login'],
            'password' => ['string'],
            'loginTime' => ['datetime'],
            'situation' => ['string', Rule::in(['ativo', 'inativo'])],
            'type' => ['string', Rule::in(['admin', 'contador'])],
        ];
    }
}
