import Game from './game.js';

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let game = new Game(context);
game.openMenu();