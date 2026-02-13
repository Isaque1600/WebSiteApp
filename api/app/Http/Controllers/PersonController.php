<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Http\Resources\PersonResource;
use App\Http\Resources\UserResource;
use App\Models\Person;
use App\Models\User;
use Crypt;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PersonController extends Controller implements HasMiddleware {

    /**
     * Display a listing of the resource.
     * 
     */
    public function index(Request $request, string $type) {
        $search   = $request->search ?? '';
        $filter   = $request->filter ?? 'nome';
        $per_page = $request->per_page ?? 25;
        $page     = $request->page ?? 1;
        $stats    = $request->status ?? null;

        $query = Person::where('tipo', '=', $type)
            ->where($filter, 'like', "%$search%")
            ->where(function (Builder $query) use ($stats) {
                if ($stats !== 'null') {
                    $query->where('situacao', '=', $stats);
                }
            })
            ->with('user')
            ->orderBy($filter)
            ->paginate($per_page, page: $page);

        $res = match ($type) {
            'cliente'  => PersonResource::collection($query),
            'contador' => PersonResource::collection($query),
        };

        return $res->additional([
            'meta' => [
                'hasMore' => $query->hasMorePages(),
            ],
        ]);
    }

    public function getClients(Request $request, int $userId) {
        $search = $request->search ?? '';
        $filter = $request->filter ?? 'nome';

        $user = User::findOrFail($userId);

        $clients = Person::where('tipo', '=', 'cliente')
            ->where('contador', '=', $user->login)
            ->where($filter, 'like', "%$search%")
            ->orderBy($filter)
            ->get();

        return PersonResource::collection($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonRequest $request, string $type) {
        $person       = new Person($request->validated());
        $person->tipo = $type;
        $person->save();

        if ($type == "contador") {
            $user            = new User();
            $user->login     = $request->nome;
            $user->senha     = Crypt::encrypt($request->senha);
            $user->type      = "contador";
            $user->situation = $request->situacao;
            $user->person()
                ->associate($person);
            $user->save();
        }

        return response()->json([
            'data'    => $person,
            'message' => 'success'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $person = Person::findOrFail($id);

        if ($person->tipo == 'contador') {
            $person->load('user');
        }

        return new PersonResource($person);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonRequest $request, string $type, string $id) {
        switch ($type) {
            case 'cliente':
                $person = Person::findOrFail($id);
                $person->update($request->validated());
                $person->save();
                return new PersonResource($person);

            case 'contador':
                $person = Person::findOrFail($id);
                $person->update($request->validated());
                $person->user->update([
                    'situation' => $person->situacao,
                    'login'     => $person->nome,
                    'loginTime' => now()
                ]);

                if ($request->senha) {
                    $person->user->update(['senha' => Crypt::encrypt($request->senha)]);
                }

                return new UserResource($person->user);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        Person::findOrFail($id)->deleteOrFail();

        return response()->json(['message' => 'success'], 204);
    }

    /**
     * @inheritDoc
     */
    public static function middleware() {
        return [
            new Middleware('auth:api'),
        ];
    }
}
