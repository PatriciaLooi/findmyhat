const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const row = 10;
const col = 10;
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let field = [];
let position = [0, 0];

/*Generates a new field for the game with the specified dimensions, 
places a hat and a number of holes randomly on the field, and sets the 
starting position for the player character.*/

function generateField() {
  // generate empty field
  for (let colIndex = 0; colIndex < row; colIndex++) {
    field[colIndex] = [];
    for (let rowIndex = 0; rowIndex < col; rowIndex++) {
      field[colIndex][rowIndex] = fieldCharacter;
    }
  }
  
  // place hat randomly
  let hatCol = Math.floor(Math.random() * col);
  let hatRow = Math.floor(Math.random() * row);
  field[hatRow][hatCol] = hat;

  // place holes randomly
  let numHoles = Math.floor(row * col / 10);
  let holesPlaced = 0;
  while (holesPlaced < numHoles) {
    let holeCol = Math.floor(Math.random() * col);
    let holeRow = Math.floor(Math.random() * row);
    if (field[holeRow][holeCol] === fieldCharacter) {
      field[holeRow][holeCol] = hole;
      holesPlaced++;
    }
  }

  // place pathCharacter at starting position
  field[position[0]][position[1]] = pathCharacter;
}

/*Prints the current state of the game field to the console.*/

function printField() {
  let output = '';
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    output += field[rowIndex].join('') + '\n';
  }
  console.log(output);
}

/* Prompts the user to input a direction (up, down, left, or right) and returns an array
 with the corresponding row and column offsets for that direction.*/

function getInput() {
  let validInput = false;
  while (!validInput) {
    let input = prompt('Which way? (U/D/L/R)');
    if (input.toUpperCase() === 'U') {
      return [-1, 0];
    } else if (input.toUpperCase() === 'D') {
      return [1, 0];
    } else if (input.toUpperCase() === 'L') {
      return [0, -1];
    } else if (input.toUpperCase() === 'R') {
      return [0, 1];
    } else {
      console.log('Enter (U/D/L/R)');
    }
  }
}

/*Updates the position of the player character based on the specified 
row and column offsets from getInput(), checks if the new position is out 
of bounds, on a hole, or on the hat, and returns false if the game is over or 
true if the game is still ongoing.*/

function updatePosition(input) {
  let c = position[1] + input[1];
  let r = position[0] + input[0];
  if (c < 0 || c >= col || r < 0 || r >= row) {
    console.log('Out of bounds - Game Over!');
    return false;
  } else if (field[r][c] === hole) {
    console.log('Sorry, you fell down a hole!');
    return false;
  } else if (field[r][c] === hat) {
    console.log('Congrats, you found your hat!');
    return false;
  } else {
    field[position[0]][position[1]] = fieldCharacter;
    position[0] = r;
    position[1] = c;
    field[position[0]][position[1]] = pathCharacter;
    return true;
  }
}

/*Runs the game loop by generating a new field, printing it to the console, 
getting input from the user, updating the player position, and repeating 
until the game is over.*/

function playGame() {
  let playing = true;
  generateField();
  while (playing) {
    clear();
    printField();
    let input = getInput();
    let result = updatePosition(input);
    if (!result) {
      playing = false;
    }
  }
}

playGame();


