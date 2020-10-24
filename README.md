# Simple chat application with Laravel & Socket.IO

## Requirements
- PHP >= 7.3
- MySQL 5.6+
- Node.js 10+

## Tech stack
- Laravel
- MySQL
- Socket.IO
- Sequelize 

## How to use
- Install dependencies
```
$ composer install
$ npm install
```

- Edit DB_* env vars
```
$ cp .env.example .env
$ php artisan key:gen
$ nano .env
```

- Run Socket.IO server & PHP server
```
$ npm run start-socket-server
$ php artisan serve
```

- Point your browser to http://localhost:8000
