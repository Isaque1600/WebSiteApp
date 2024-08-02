<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserColumnRequest;
use App\Http\Requests\UpdateUserColumnRequest;
use App\Models\UserColumn;

class UserColumnController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserColumnRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserColumn $userColumn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserColumnRequest $request, UserColumn $userColumn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserColumn $userColumn)
    {
        //
    }
}
