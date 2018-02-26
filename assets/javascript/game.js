// Var declarations

// Possible computer choices array
var pcChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Initial global variables for wins, losses, # of guesses left, user's guesses & user's guesses so far
var win = 0;
var loss = 0;
var guessesLeft = 10;
var gameStat = document.getElementById("game");

var userGuess = [];
// stores users guess & displays it per round
var currentGuesses = [];

// computer randomized guesses 
var pcGuess = pcChoices[Math.floor(Math.random() * pcChoices.length)];
    pcChoices.push(pcGuess);
    // console.log(pcGuess);


// user inputs 
document.onkeyup = function(event) {
// takes user's guess onkeyup and saves to userGuess array while correcting all characters to lowercase
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    // console.log(userGuess);

// the condition below takes the user's guesses and adds it to the currentGuesses array if it was not already picked
// AND it checks if the user is pressing characters within the alphabet (pcChoices) 
    if (currentGuesses.indexOf(userGuess) < 0 && pcChoices.indexOf(userGuess) >= 0) {
        currentGuesses[currentGuesses.length] = userGuess;
        // decreases # of guessesLeft by 1 every time a new character is chosen that doesn't match
        guessesLeft--;

    }

// Tracking wins
if (pcGuess === userGuess) {
    win++;
    guessesLeft = 10;
    currentGuesses = [];
    pcGuess = pcChoices[Math.floor(Math.random() * pcChoices.length)];
}

// Tracking losses 
if (guessesLeft === 0) {
    loss++;
    guessesLeft = 10;
    currentGuesses = [];
    pcGuess = pcChoices[Math.floor(Math.random() * pcChoices.length)];
}

// grabbing html elements to display on page with updated variables using back ticks
gameStat.innerHTML = `
<h1>The Psychic Game</h1>
<br>
<p><h2>Guess what letter I'm thinking of:</h2></p>
<br>
<p><h3>Wins: ${win} </h3></p>
<p><h3>Losses: ${loss} </h3></p>
<p><h3>Guesses left: ${guessesLeft} </h3></p>
<p><h3>Your guesses so far: ${currentGuesses} </h3></p>
`;

document.querySelector("#game").innerHTML = html;

}





