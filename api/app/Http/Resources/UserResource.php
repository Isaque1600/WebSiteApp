<?php

namespace App\Http\Resources;

use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'login' => $this->login,
            'senha' => decrypt($this->senha),
            'loginTime' => $this->loginTime?->format('d/m/Y H:i:s'),
            'situation' => $this->situation,
            'type' => $this->type,
            'person' => PersonResource::collection($this->person()->get()),
        ];
    }
}
