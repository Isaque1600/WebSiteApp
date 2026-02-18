<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSystemRequest;
use App\Http\Requests\UpdateSystemRequest;
use App\Http\Resources\PersonResource;
use App\Http\Resources\SystemResource;
use App\Http\Resources\UserResource;
use App\Models\Person;
use App\Models\System;

class SystemController {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $search   = $request->search ?? '';
        $filter   = $request->filter ?? 'nome';
        $per_page = $request->per_page ?? 25;
        $page     = $request->page ?? 1;

        $query = System::where($filter, 'like', "%$search%")
            ->orderBy($filter)
            ->paginate($per_page, page: $page);

        $res = SystemResource::collection($query);

        return $res->additional([
            'meta' => [
                'hasMore' => $query->hasMorePages(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSystemRequest $request) {
        $system = new System($request->validated());
        $system->save();

        return response()->json([
            'data'    => $system,
            'message' => 'success'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(System $system) {
        return new SystemResource($system);
    }

    public function showUsersCount(System $system) {
        return Person::where('sistema', '=', $system->nome)
            ->where('tipo', '=', 'cliente')
            ->where('situacao', '=', 'ativo')
            ->count();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSystemRequest $request, System $system) {
        $system->update($request->validated());

        return response()->json([
            'data'    => $system,
            'message' => 'success'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(System $system) {
        $system->deleteOrFail();

        return response()->json(['message' => 'success'], 204);
    }
}
