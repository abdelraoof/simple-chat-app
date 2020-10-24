/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/chat.js":
/*!******************************!*\
  !*** ./resources/js/chat.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(function () {
  var FADE_TIME = 150; // ms

  var TYPING_TIMER_LENGTH = 400; // ms

  var COLORS = ['#e21400', '#91580f', '#f8a700', '#f78b00', '#58dc00', '#287b00', '#a8f07a', '#4ae8c4', '#3b88eb', '#3824aa', '#a700ff', '#d300e7']; // Initialize variables

  var socket = window.socket;
  var user = window.user;
  var username = user.username;
  var $window = $(window);
  var $messages = $('.messages'); // Messages area

  var $onlineUsers = $('.online-users'); // Online Users area

  var $inputMessage = $('.inputMessage'); // Input message input box

  $inputMessage.focus();
  var connected = false;
  var typing = false;
  var lastTypingTime;

  var addParticipantsMessage = function addParticipantsMessage(data) {
    $onlineUsers.empty();

    var _iterator = _createForOfIteratorHelper(data.users),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var onlineUser = _step.value;
        var $onlineUserRoom = $('<a />').text(onlineUser).attr('href', '/' + onlineUser).css('color', getUsernameColor(onlineUser));
        var $onlineUserDiv = $('<li class="online-user"/>').append($onlineUserRoom);
        $onlineUsers.append($onlineUserDiv);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (data.users.length === 1) {
      log("you are the only one online");
    } else {
      log("there are " + data.users.length + " participants");
    }
  }; // Sends a chat message


  var sendMessage = function sendMessage() {
    var message = $inputMessage.val(); // Prevent markup from being injected into the message

    message = cleanInput(message); // if there is a non-empty message and a socket connection

    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      }); // tell server to execute 'new message' and send along one parameter

      socket.emit('new message', message);
    }
  }; // Log a message


  var log = function log(message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }; // Adds the visual chat message to the message list


  var addChatMessage = function addChatMessage(data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};

    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>').text(data.username).css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">').text(data.message);
    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>').data('username', data.username).addClass(typingClass).append($usernameDiv, $messageBodyDiv);
    addMessageElement($messageDiv, options);
  }; // Adds the visual chat typing message


  var addChatTyping = function addChatTyping(data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }; // Removes the visual chat typing message


  var removeChatTyping = function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }; // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)


  var addMessageElement = function addMessageElement(el, options) {
    var $el = $(el); // Setup default options

    if (!options) {
      options = {};
    }

    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }

    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    } // Apply options


    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }

    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }

    $messages[0].scrollTop = $messages[0].scrollHeight;
  }; // Prevents input from having injected markup


  var cleanInput = function cleanInput(input) {
    return $('<div/>').text(input).html();
  }; // Updates the typing event


  var updateTyping = function updateTyping() {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }

      lastTypingTime = new Date().getTime();
      setTimeout(function () {
        var typingTimer = new Date().getTime();
        var timeDiff = typingTimer - lastTypingTime;

        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }; // Gets the 'X is typing' messages of a user


  var getTypingMessages = function getTypingMessages(data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }; // Gets the color of a username through our hash function


  var getUsernameColor = function getUsernameColor(username) {
    // Compute hash code
    var hash = 7;

    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    } // Calculate color


    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }; // Keyboard events


  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $inputMessage.focus();
    } // When the client hits ENTER on their keyboard


    if (event.which === 13) {
      sendMessage();
      socket.emit('stop typing');
      typing = false;
    }
  });
  $inputMessage.on('input', function () {
    updateTyping();
  }); // Click events
  // Focus input when clicking on the message input's border

  $inputMessage.click(function () {
    $inputMessage.focus();
  }); // Socket events
  // Whenever the server emits 'login', log the login message

  socket.on('login', function (data) {
    connected = true; // Display the welcome message

    log("Welcome to Scopic simple chat application");
    addParticipantsMessage(data);
  }); // Whenever the server emits 'new message', update the chat body

  socket.on('new message', function (data) {
    addChatMessage(data);
  }); // Whenever the server emits 'user joined', log it in the chat body

  socket.on('user joined', function (data) {
    log(data.username + ' joined');
    addParticipantsMessage(data);
  }); // Whenever the server emits 'user left', log it in the chat body

  socket.on('user left', function (data) {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  }); // Whenever the server emits 'typing', show the typing message

  socket.on('typing', function (data) {
    addChatTyping(data);
  }); // Whenever the server emits 'stop typing', kill the typing message

  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });
  socket.on('disconnect', function () {
    log('you have been disconnected');
  });
  socket.on('reconnect', function () {
    log('you have been reconnected');
  });
  socket.on('reconnect_error', function () {
    log('attempt to reconnect has failed');
  });
  socket.on('error', function (reason) {
    console.log(reason);
  });
});

/***/ }),

/***/ 2:
/*!************************************!*\
  !*** multi ./resources/js/chat.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\scopic-task\resources\js\chat.js */"./resources/js/chat.js");


/***/ })

/******/ });