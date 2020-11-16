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

$('#sentence').text(sentences[senIndex]);
$('#target-letter').text(sentences[senIndex][charIndex]);

let winCount = 0;

$('body').keypress(function (e) {
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

    charCheck(onScreen);

});

function charCheck(onScreen) {
    if (charIndex < sentences[senIndex].length - 1) { // If you haven't reached the end of the sentence --
        inputCheck(onScreen);
    } else {
        charIndex = 0; // Reset Character Index --
        senIndex++; // Advance to next sentence --
        $('#sentence').text(sentences[senIndex]);
        winCount++
        if (winCount == sentences.length) {
            console.log('you win!')
        }
    }
}

function inputCheck(onScreen) {
    if (onScreen == sentences[senIndex][charIndex]) {
        //console.log("Correct Key");
        charIndex++;
        $('#target-letter').text(sentences[senIndex][charIndex]);
    } else {
        console.log("Wrong Key");
    }
}