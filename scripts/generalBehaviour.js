            /* #region ################# RESIZE ################# */
$(window).resize(function () { 
    
});
            /* #endregion ########################################### */






$('#navButtonToTerminal').click(function (e) { 
    e.preventDefault();

    terminal.clear();
    terminal.typewrite(welcomeText, 'fast'); 
    $('#navPanel').fadeOut( () => {

        $('#navPanel').removeClass('d-flex');
        $('#term_terminal').fadeIn( () => {
            adjustFontSize();
        });
        $('#term_terminal').removeClass('d-none');
    });
});

function showGui() { 
    let term = $('#term_terminal');
    let gui = $('#navPanel');


    term.fadeOut( () => {
        gui.fadeIn();
        gui.addClass('d-flex');
    });
}