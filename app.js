// Hides Uppercase Keyboard on load --
$('#keyboard-upper-container').hide();

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];

sentences = ["one", "two", "three"];

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

$('#target-letter').text(sentences[senIndex][charIndex]);

let myString = sentences[senIndex];
splitMeUp();

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
    setGlyph("yes");
    endOfsentence();
}

function incorrectInput() {
    setGlyph("no");
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
        myString = sentences[senIndex]; // Advances the
        splitMeUp();
        $('#target-letter').text(sentences[senIndex][charIndex]);
    } else { // Trigger youWin() --
        youWin();
    }
}

