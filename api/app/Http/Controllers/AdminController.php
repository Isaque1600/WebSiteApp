<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::all()->where('type', '=', 'admin'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $admin = new User($request->validated());
        $admin->type = "admin";
        $admin->senha = encrypt($request->senha);
        $admin->save();

        return response()->json(['data' => $admin, 'message' => 'success'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $admin = User::findOrFail($id)->where('type', '=', 'admin');

        return new UserResource($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $admin = User::findOrFail($id)->where('type', '=', 'admin');
        $admin->update($request->validated());
        $admin->save();

        return response()->json(['data' => $admin, 'message' => 'success'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::findOrFail($id)->where('type', '=', 'admin')->deleteOrFail();

        return response()->json(['message' => 'success'], 204);
    }
}
