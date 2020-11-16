// Hides Uppercase Keyboard on load --
$('#keyboard-upper-container').hide();

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];

sentences = ["one two three", "four five six"];

// Determines the number of words in the array and stores it in variable numberOfWords --
let numberOfWords = 0;
for (let index = 0; index < sentences.length; index++) {
    let x = sentences[index].split(' ');
    let y = x.length;
    numberOfWords = numberOfWords + y;
}

// Shift Key Listeners --
const shiftKeyDown = $('body').keydown(function (e) {
    if (e.which == 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
});

const shiftKeyUp = $('body').keyup(function (e) {
    if (e.which == 16) {
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
});

let senIndex = 0;
let charIndex = 0;
let gameOver = false;
let numberOfMistakes = 0;

$('#target-letter').text(sentences[senIndex][charIndex]);

let myString = sentences[senIndex];
splitMeUp();
firstHighlight()

function splitMeUp() {
    let spans = myString.split(''); // Splits the string into a lot of spans --
    for (let index = 0; index < spans.length; index++) {
        let $myChar = $('<span class="char"></span>');
        $myChar.attr('id', 'span' + index);
        $myChar.text(spans[index]);
        $('#sentence').append($myChar);
    }
}

$('body').keypress(function (e) {
    $('#feedback').css({
        "opacity": "100"
    });
    let x = e.which;

    $('#' + x).animate({
        // Animate to Highlight Color --
        "background-color": "#ffff00"
    }, 10);

    $('#' + x).animate({
        // Back to original color --
        "background-color": "#f5f5f5"
    }, 350);

    // Translates the ASCII code to whatever is in that <div>'s text content --
    let onScreen = $('#' + x).text();
    if (onScreen == "Space") { // Catch for "Space" text content on spacebar --
        onScreen = " ";
    }

    if (gameOver == false) {
        inputCheck(onScreen);
    }

});

function inputCheck(onScreen) {
    if (onScreen == sentences[senIndex][charIndex]) {
        correctInput();
    } else {
        incorrectInput();
    }
}

function youWin() {
    gameOver = true;
    console.log('You Win!');
    let wpm = numberOfWords / totalTime - 2 * numberOfMistakes;
    console.log("Total Time: " + totalTime + " Minutes");
    console.log(minutes + ":" + seconds);
    console.log("Words Per Minute: " + wpm);
}

function setGlyph(x) {
    let mySpan = $('<span></span>');
    switch (x) {
        case "yes":
            mySpan.addClass('glyphicon glyphicon-ok');
            $('#feedback').append(mySpan);
            break;
        case "no":
            mySpan.addClass('glyphicon glyphicon-remove');
            $('#feedback').append(mySpan);
            break;
        case "reset":
            $('#feedback').animate({
                "opacity": "0"
            });
            setTimeout(function () { $('#feedback').text(''); }, 500);
            break;
    }
}

function correctInput() {
    updateHighlight();
    setGlyph("yes");
    endOfsentence();
}

function incorrectInput() {
    setGlyph("no");
    numberOfMistakes++;
}

function endOfsentence() {
    if (charIndex == sentences[senIndex].length - 1) { // If you've correctly reached the last character in the sentence --
        advanceSentence();
        setGlyph("reset");
    } else { // If you haven't reached the end of the sentence yet, but you still hit the correct key --
        charIndex++;
        $('#target-letter').text(sentences[senIndex][charIndex]);
    }
}

function advanceSentence() {
    if (senIndex < sentences.length - 1) { // Advance to the next sentence --
        senIndex++;
        charIndex = 0;
        $('.char').remove(); // Removes all of the individual spans for the sentence --
        myString = sentences[senIndex]; // Updates myString for next splitMeUp() --
        splitMeUp();
        firstHighlight();
        $('#target-letter').text(sentences[senIndex][charIndex]); // Updates #target-letter --
    } else { // Trigger youWin() --
        youWin();
    }
}

function updateHighlight() {
    if (firstOn == true) {
        $('#span' + (charIndex + 0)).css({
            "background-color": "white"
        });
    }
    for (let index = 0; index < myString.length; index++) {
        $('#span' + (index + 1)).css({
            "background-color": "white"
        });
    }
    $('#span' + (charIndex + 1)).css({
        "background-color": "yellow"
    });
}

let firstOn = true;
function firstHighlight() {
    $('#span' + (charIndex + 0)).css({
        "background-color": "yellow"
    });
}

let countUp = setInterval(myTimer, 1000);
let seconds = 0;
let minutes = 0;
let totalTime = 0;
function myTimer() {
    if (seconds < 59) {
        seconds++;
    } else {
        seconds = 0
        minutes++;
    }
    totalTime = minutes + seconds / 60;
}