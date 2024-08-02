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
            'loginTime' => date_format($this->loginTime, 'd/m/Y'),
            'situation' => $this->situation,
            'type' => $this->type,
            'person_id' => PersonResource::collection($this->whenLoaded('person_id')),
        ];
    }
}
