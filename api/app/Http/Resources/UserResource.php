<?php

namespace App\Http\Resources;

use Crypt;
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
            'cod_pes' => $this->id,
            'nome' => $this->login,
            'senha' => Crypt::decrypt($this->senha),
            'loginTime' => $this->loginTime?->format('d/m/Y H:i:s'),
            'situacao' => $this->situacao,
            'tipo' => $this->type,
            'person' => PersonResource::collection($this->person()->get()),
        ];
    }
}
