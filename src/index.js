import Game from './game.js';

console.log('%c Welcome to my site!', 'color: lightblue;');
console.log('I use this page to show off newly created ideas. Nothing too special, but something fun that might have a positive impact on someone :)');

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let game = new Game(context);
game.openMenu();