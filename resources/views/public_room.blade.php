@extends('layouts.app')

@section('content')
<div class="chat-container col-md-10 col-9">
    <div class="chat-area">
        <ul class="messages"></ul>
    </div>
    <input class="inputMessage" placeholder="Type here...">
</div>
<div class="online-users-container col-md-2 col-3">
    <a href="{{ route('public_room') }}"><strong>PUBLIC ROOM</strong></a>
    <div>Online Users</div>
    <ul class="online-users"></ul>
</div>
@endsection

@push('body_assets')
<script>
$(function() {
    window.socket = io('{{ env("SOCKET_IO_URL") }}:{{ env("SOCKET_IO_PORT") }}', {
        query: {
            token: '{{ auth()->user()->token }}',
            room: 'public-room'
        }
    });
    window.user = {!! json_encode(auth()->user()->only('name', 'username', 'email')) !!};
});
</script>

<script src="{{ asset('js/chat.js') }}"></script>
@endpush
