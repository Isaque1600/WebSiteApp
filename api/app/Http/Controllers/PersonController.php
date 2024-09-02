<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\PersonResource;
use App\Http\Resources\UserResource;
use App\Models\Person;
use App\Models\User;
use Crypt;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $type)
    {
        $search = $request->search ?? '';
        $filter = $request->filter ?? 'nome';
        $per_page = $request->per_page ?? 25;

        switch ($type) {
            case "cliente":
                if (!empty($search)) {
                    return PersonResource::collection(Person::where($filter, 'like', "%{$search}%")->where('tipo', '=', 'cliente')->orderBy($filter)->paginate($per_page));
                }

                return PersonResource::collection(Person::orderBy('nome')->paginate($per_page)->where('tipo', '=', 'cliente'));
            case "contador":
                if (!empty($search)) {
                    return UserResource::collection(User::where($filter, 'like', "%{$search}%")->where('tipo', '=', 'cliente')->orderBy($filter)->paginate($per_page));
                }

                return UserResource::collection(User::paginate($per_page)->where('type', '=', 'contador'));
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonRequest $request, string $type)
    {
        $person = new Person($request->validated());
        $person->tipo = $type;
        $person->save();

        if ($type == "contador") {
            $user = new User();
            $user->login = $request->nome;
            $user->senha = Crypt::encrypt($request->senha);
            $user->type = "contador";
            $user->situation = $request->situacao;
            $user->person()->associate($person);
            $user->save();
        }

        return response()->json(['data' => $person, 'message' => 'success'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $type, string $id)
    {
        return new PersonResource(Person::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonRequest $request, string $type, string $id)
    {
        switch ($type) {
            case 'cliente':
                $person = Person::findOrFail($id);
                $person->update($request->validated());
                $person->save();
                return new PersonResource($person);

            case 'contador':
                $person = Person::findOrFail($id);
                $person->update($request->validated());
                $person->user->update(['situation' => $person->situacao, 'login' => $person->nome, 'loginTime' => now()]);

                if ($request->senha) {
                    $person->user->update(['senha' => encrypt($request->senha)]);
                }

                return new UserResource($person->user);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $type, string $id)
    {
        $person = Person::findOrFail($id)->deleteOrFail();

        return response()->json(['message' => 'success'], 204);
    }
}
