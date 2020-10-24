@extends('layouts.app')

@section('content')
<div class="chat-container">
    <div class="chat-area">
        <ul class="messages"></ul>
    </div>
    <input class="inputMessage" placeholder="Type here...">
</div>
@endsection

@push('body_assets')
<script>
$(function() {
    window.socket = io('http://localhost:3000');
    window.user = {!! json_encode(auth()->user()->only('name', 'username', 'email')) !!};
});
</script>

<script src="{{ asset('js/chat.js') }}"></script>
@endpush
