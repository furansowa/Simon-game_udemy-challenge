

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameHasStarted = false;


// Game starts
$(document).keydown(function() {
    if (!gameHasStarted) {
      $("#level-title").text("Level " + level);
      nextSequence();
      gameHasStarted = true;
    }
});


// Play sound and animate when user clicks the buttons
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
  }


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        gameOver();
    }
}

function gameOver() {
    var soundWrong = new Audio("sounds/wrong.mp3");
    soundWrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameHasStarted = false;
}