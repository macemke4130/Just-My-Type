$('#keyboard-upper-container').hide();

const shiftKeyDown = $('body').keydown(function(e){
    if(e.which == 16){
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
});

const shiftKeyUp = $('body').keyup(function(e){
    if(e.which == 16){
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
});