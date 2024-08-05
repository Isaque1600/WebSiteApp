<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? '';
        $filter = $request->filter ?? 'nome';
        $per_page = $request->per_page ?? 25;

        if (!empty($search)) {
            return PersonResource::collection(Person::where($filter, 'like', "%{$search}%")->orderBy($filter)->paginate($per_page));
        }

        return PersonResource::collection(Person::orderBy('nome')->paginate($per_page));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonRequest $request)
    {
        $person = new Person($request->validated());
        $person->save();

        return response()->json(['data' => $person->nome, 'message' => 'success'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new PersonResource(Person::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonRequest $request, string $id)
    {
        $person = Person::findOrFail($id);
        $person->update($request->validated());
        $person->save();

        return new PersonResource($person);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Person::findOrFail($id)->delete();

        return response()->json(['message' => 'success'], 204);
    }
}
