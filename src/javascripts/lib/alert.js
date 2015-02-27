'use strict';

var $ = require('jquery');

var audio = document.createElement('audio');
audio.preload = "auto";
audio.src = "audio/notification.mp3";

module.exports = audio;

