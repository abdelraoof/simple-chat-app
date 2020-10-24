<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show public chat room.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function publicRoom()
    {
        return view('public_room');
    }

    /**
     * Show private chat room.
     *
     * @param User $user
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function privateRoom(User $user)
    {
        return view('private_room', compact('user'));
    }
}
