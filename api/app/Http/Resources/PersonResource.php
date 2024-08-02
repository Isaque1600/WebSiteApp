<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'cod_pes' => $this->cod_pes,
            'nome' => mb_convert_case($this->nome, MB_CASE_TITLE, "UTF-8"),
            'razao' => $this->razao,
            'logradouro' => $this->logradouro,
            'numero' => $this->numero,
            'bairro' => $this->bairro,
            'cidade' => $this->cidade,
            'cep' => $this->cep,
            'uf' => $this->uf,
            'cnpj' => $this->cnpj,
            'ie' => $this->ie,
            'contato' => $this->contato,
            'sistema' => $this->sistema,
            'serial' => $this->serial,
            'obs' => $this->obs,
            'ven_cert' => date_format($this->ven_cert, 'd/m/Y'),
            'email' => $this->email,
            'situacao' => $this->situacao,
            'tef' => $this->tef,
            'nfe' => $this->nfe,
            'sped' => $this->sped,
            'contador' => $this->contador,
            'email_backup' => $this->email_backup,
            'senha_backup' => $this->senha_backup,
        ];
    }
}
