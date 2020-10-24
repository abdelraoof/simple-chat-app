<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/messages', function (Request $request) {
    if ($request->room == 'public-room' || in_array($request->user()->id, explode('-', $request->room))) {
        return \App\Models\Message::with('user:id,username')->whereRoom($request->room)
            ->where('created_at', '<', \Carbon\Carbon::make($request->older_than))
            ->latest()->paginate(20);
    }
    return abort(403);
});
