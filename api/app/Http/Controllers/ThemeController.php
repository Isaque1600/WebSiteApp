<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreThemeRequest;
use App\Http\Requests\UpdateThemeRequest;
use App\Http\Resources\ThemeResource;
use App\Models\Theme;
use App\Models\User;

class ThemeController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ThemeResource::collection(Theme::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThemeRequest $request)
    {
        if (User::where('type', '=', 'admin')->findOrFail($request->user_id)) {
            $theme = new Theme($request->validated());
            $theme->save();

            return response()->json(['data' => $theme, 'message' => 'success'], 201);
        }

        return response()->json(['message' => 'User is not a admin!'], 401);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $user_id)
    {
        $theme = Theme::where('user_id', '=', $user_id)->firstOrFail();
        return new ThemeResource($theme);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThemeRequest $request, string $user_id)
    {
        $theme = Theme::where('user_id', '=', $user_id)->firstOrFail();
        $theme->update($request->validated());

        return response()->json(['data' => $theme, 'message' => 'success'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $user_id)
    {
        Theme::where('user_id', '=', $user_id)->deleteOrFail();

        return response()->json(['message' => 'success'], 204);
    }
}
