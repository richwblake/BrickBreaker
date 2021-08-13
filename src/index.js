import Game from './game.js';

console.log('%c Welcome to my site!', 'color: lightblue;');
console.log('I use this page to show off newly created ideas. Nothing too special, but something fun that might have a positive impact on someone :)');

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let game = new Game(context);
game.openMenu();
fetchHighScores();

function fetchHighScores() {
  let table = document.getElementById('score-table');

  fetch('https://blooming-beach-89055.herokuapp.com/users')
  .then(resp => resp.json())
  .then(json => json.forEach(user => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerText = user.name;
    td2.innerText = user.score
    tr.append(td1, td2);
    table.append(tr);
  }))
}