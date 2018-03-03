// Global var declarations

// Possible computer choices array
var pcChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Initial global variables for wins, losses, # of guesses left, user's guesses & user's guesses so far
var win = 0;
var loss = 0;
var guessesLeft = 10;
// var gameStat = document.getElementById("game");

var userGuess = [];
// stores what the has user currenttly guessed & displays it per round
var currentGuesses = [];

// computer randomized guesses (multiply pcChoices by randomized number and round up)
var pcGuess = pcChoices[Math.floor(Math.random() * pcChoices.length)];
    pcChoices.push(pcGuess);
    // console.log(pcGuess);


// user inputs 
document.onkeyup = function keyPress(event) {
// takes user's guess onkeyup and saves to userGuess array while correcting all characters to lowercase
// string.fromcharcode returns the string 
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
    // document.getElementById("winTracker").innerHTML = (win.length);
    guessesLeft = 10;
    currentGuesses = [];
    pcGuess = pcChoices[Math.floor(Math.random() * pcChoices.length)];
    
}

// Tracking losses 
if (guessesLeft === 0) {
    loss++;
    // document.getElementById("lossTracker").innerHTML = (loss.length);
    guessesLeft = 10;
    currentGuesses = [];
    pcGuess = pcChoices[Math.floor(Math.random() * pcChoices.length)];
    // document.getElementById("numberLeft").innerHTML = (guessesLeft);
}

// grabbing html IDs to functions
document.getElementById("winTracker").innerHTML = (win);
document.getElementById("userGuessed").innerHTML = (currentGuesses);
document.getElementById("lossTracker").innerHTML = (loss);
document.getElementById("numberLeft").innerHTML = (guessesLeft);

// // grabbing html elements to display on page with updated variables using back ticks
// gameStat.innerHTML = `
// <h1>The Psychic Game</h1>
// <br>
// <p><h2>Guess what letter I'm thinking of:</h2></p>
// <br>
// <p><h3>Wins: ${win} </h3></p>
// <p><h3>Losses: ${loss} </h3></p>
// <p><h3>Guesses left: ${guessesLeft} </h3></p>
// <p><h3>Your guesses so far: ${currentGuesses} </h3></p>
// `;

// document.querySelector("#game").innerHTML = html;

}




// STAR ANIMATION BACKGOUND 
"use strict";
window.onload = function() {
    setTimeout(start, 200);
};

function start() {

    //Helpers
    function lineToAngle(x1, y1, length, radians) {
        var x2 = x1 + length * Math.cos(radians),
            y2 = y1 + length * Math.sin(radians);
        return { x: x2, y: y2 };
    }

    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }

    function degreesToRads(degrees) {
        return degrees / 180 * Math.PI;
    }

    //Particle
    var particle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 0,

        create: function(x, y, speed, direction) {
            var obj = Object.create(this);
            obj.x = x;
            obj.y = y;
            obj.vx = Math.cos(direction) * speed;
            obj.vy = Math.sin(direction) * speed;
            return obj;
        },

        getSpeed: function() {
            return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        },

        setSpeed: function(speed) {
            var heading = this.getHeading();
            this.vx = Math.cos(heading) * speed;
            this.vy = Math.sin(heading) * speed;
        },

        getHeading: function() {
            return Math.atan2(this.vy, this.vx);
        },

        setHeading: function(heading) {
            var speed = this.getSpeed();
            this.vx = Math.cos(heading) * speed;
            this.vy = Math.sin(heading) * speed;
        },

        update: function() {
            this.x += this.vx;
            this.y += this.vy;
        }
    };

    //Canvas and settings
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        stars = [],
        shootingStars = [],
        layers = [
            { speed: 0.015, scale: 0.2, count: 320 },
            { speed: 0.03, scale: 0.5, count: 50 },
            { speed: 0.05, scale: 0.75, count: 30 }
        ],
        starsAngle = 145,
        shootingStarSpeed = {
            min: 15,
            max: 20
        },
        shootingStarOpacityDelta = 0.01,
        trailLengthDelta = 0.01,
        shootingStarEmittingInterval = 2000,
        shootingStarLifeTime = 500,
        maxTrailLength = 300,
        starBaseRadius = 2,
        shootingStarRadius = 3,
        paused = false;

    //Create all stars
    for (var j = 0; j < layers.length; j += 1) {
        var layer = layers[j];
        for (var i = 0; i < layer.count; i += 1) {
            var star = particle.create(randomRange(0, width), randomRange(0, height), 0, 0);
            star.radius = starBaseRadius * layer.scale;
            star.setSpeed(layer.speed);
            star.setHeading(degreesToRads(starsAngle));
            stars.push(star);
        }
    }

    function createShootingStar() {
        var shootingStar = particle.create(randomRange(width / 2, width), randomRange(0, height / 2), 0, 0);
        shootingStar.setSpeed(randomRange(shootingStarSpeed.min, shootingStarSpeed.max));
        shootingStar.setHeading(degreesToRads(starsAngle));
        shootingStar.radius = shootingStarRadius;
        shootingStar.opacity = 0;
        shootingStar.trailLengthDelta = 0;
        shootingStar.isSpawning = true;
        shootingStar.isDying = false;
        shootingStars.push(shootingStar);
    }

    function killShootingStar(shootingStar) {
        setTimeout(function() {
            shootingStar.isDying = true;
        }, shootingStarLifeTime);
    }

    function update() {
        if (!paused) {
            context.clearRect(0, 0, width, height);
            context.fillStyle = "#282a3a";
            context.fillRect(0, 0, width, height);
            context.fill();

            for (var i = 0; i < stars.length; i += 1) {
                var star = stars[i];
                star.update();
                drawStar(star);
                if (star.x > width) {
                    star.x = 0;
                }
                if (star.x < 0) {
                    star.x = width;
                }
                if (star.y > height) {
                    star.y = 0;
                }
                if (star.y < 0) {
                    star.y = height;
                }
            }

            for (i = 0; i < shootingStars.length; i += 1) {
                var shootingStar = shootingStars[i];
                if (shootingStar.isSpawning) {
                    shootingStar.opacity += shootingStarOpacityDelta;
                    if (shootingStar.opacity >= 1.0) {
                        shootingStar.isSpawning = false;
                        killShootingStar(shootingStar);
                    }
                }
                if (shootingStar.isDying) {
                    shootingStar.opacity -= shootingStarOpacityDelta;
                    if (shootingStar.opacity <= 0.0) {
                        shootingStar.isDying = false;
                        shootingStar.isDead = true;
                    }
                }
                shootingStar.trailLengthDelta += trailLengthDelta;

                shootingStar.update();
                if (shootingStar.opacity > 0.0) {
                    drawShootingStar(shootingStar);
                }
            }

            //Delete dead shooting shootingStars
            for (i = shootingStars.length -1; i >= 0 ; i--){
                if (shootingStars[i].isDead){
                    shootingStars.splice(i, 1);
                }
            }
        }
        requestAnimationFrame(update);
    }

    function drawStar(star) {
        context.fillStyle = "rgb(255, 221, 157)";
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    function drawShootingStar(p) {
        var x = p.x,
            y = p.y,
            currentTrailLength = (maxTrailLength * p.trailLengthDelta),
            pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

        context.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";
        // context.beginPath();
        // context.arc(x, y, p.radius, 0, Math.PI * 2, false);
        // context.fill();
        var starLength = 5;
        context.beginPath();
        context.moveTo(x - 1, y + 1);

        context.lineTo(x, y + starLength);
        context.lineTo(x + 1, y + 1);

        context.lineTo(x + starLength, y);
        context.lineTo(x + 1, y - 1);

        context.lineTo(x, y + 1);
        context.lineTo(x, y - starLength);

        context.lineTo(x - 1, y - 1);
        context.lineTo(x - starLength, y);

        context.lineTo(x - 1, y + 1);
        context.lineTo(x - starLength, y);

        context.closePath();
        context.fill();

        //trail
        context.fillStyle = "rgba(255, 221, 157, " + p.opacity + ")";
        context.beginPath();
        context.moveTo(x - 1, y - 1);
        context.lineTo(pos.x, pos.y);
        context.lineTo(x + 1, y + 1);
        context.closePath();
        context.fill();
    }

    //Run
    update();

    //Shooting stars
    setInterval(function() {
        if (paused) return;
        createShootingStar();
    }, shootingStarEmittingInterval);

    window.onfocus = function () {
      paused = false;
    };

    window.onblur = function () {
      paused = true;
    };

}


