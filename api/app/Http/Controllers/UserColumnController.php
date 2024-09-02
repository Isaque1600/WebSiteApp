<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserColumnRequest;
use App\Http\Requests\UpdateUserColumnRequest;
use App\Http\Resources\UserColumnResource;
use App\Models\User;
use App\Models\UserColumn;

class UserColumnController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserColumnResource::collection(UserColumn::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserColumnRequest $request)
    {
        if (User::where('type', '=', 'admin')->findOrFail($request->user_id)) {
            $userColumn = new UserColumn($request->validated());
            $userColumn->save();

            return response()->json(['data' => $userColumn, 'message' => 'success'], 201);
        }

        return response()->json(['message' => 'User is not a admin!'], 403);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $user_id)
    {
        $userColumn = UserColumn::where('user_id', '=', $user_id)->firstOrFail();
        return new UserColumnResource($userColumn);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserColumnRequest $request, string $user_id)
    {
        $userColumn = UserColumn::where('user_id', '=', $user_id)->firstOrFail();
        $userColumn->update($request->validated());

        return response()->json(['data' => $userColumn, 'message' => 'success'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $user_id)
    {
        UserColumn::where('user_id', '=', $user_id)->firstOrFail()->deleteOrFail();

        return response()->json(['message' => 'success'], 204);
    }
}
