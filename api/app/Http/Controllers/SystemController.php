<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSystemRequest;
use App\Http\Requests\UpdateSystemRequest;
use App\Http\Resources\SystemResource;
use App\Models\System;

class SystemController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SystemResource::collection(System::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSystemRequest $request)
    {
        $system = new System($request->validated());
        $system->save();

        return response()->json(['data' => $system, 'message' => 'success'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(System $system)
    {
        return new SystemResource($system);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSystemRequest $request, System $system)
    {
        $system->update($request->validated());

        return response()->json(['data' => $system, 'message' => 'success'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(System $system)
    {
        $system->deleteOrFail();

        return response()->json(['message' => 'success'], 204);
    }
}
