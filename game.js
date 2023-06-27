let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let randomNumber, randomChosenColour, userChosenColour;

function nextSequence() {
    started = true;
    $('h1').text('Level ' + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    if($('.volume').hasClass('fa-volume-high')){
        playSound(randomChosenColour);
    }

    level++;
}

    // $(document).one('keypress',(nextSequence));
    $(document).keypress(() => {
        if(!$('#level-title').text().includes("Level")){
            nextSequence();
        }
    });


$(document).click(function (e) {
    // console.log(e.target.id);
    if ($('#level-title').text() != 'Press A Key to Start' && buttonColours.includes(e.target.id) === true) {
        userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);

        if($('.volume').hasClass('fa-volume-high')){
            playSound(userChosenColour);
        }
        animatePress(userChosenColour);

    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        // console.log('failure');
        let audio = new Audio(`sounds/wrong.mp3`);
        if($('.volume').hasClass('fa-volume-high')){
            audio.play();
        }
        
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
    else {
        // console.log('success');
        // setTimeout(nextSequence, 1000);
    }
    if(currentLevel === gamePattern.length-1){  //when all the colours present in gamePattern are pressed correctly
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed')
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


// newly added modifications

$('.volume').click(()=>{
    if($('.volume').hasClass('fa-volume-high')){
        $('.volume').removeClass("fa-volume-high");
        $('.volume').addClass(" fa-volume-xmark");
    }
    else{
        $('.volume').removeClass("fa-volume-xmark");
        $('.volume').addClass(" fa-volume-high");
    }
})

$('.fa-lightbulb').click(()=>{
    if($('.description').css('display') == "none"){
        $('.description').show();
    }else{
        $('.description').hide();
    }
})