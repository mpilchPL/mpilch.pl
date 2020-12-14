/* #region ################# RESIZE ################# */
$(window).resize(function () { 
    if(window.innerWidth < 992) {
        $('.topPanel').css('height', 'auto');
    } else {
        $('.topPanel').css('height', '100vh');
    }
});
/* #endregion ########################################### */


/* #region ################# ON LOAD ################# */
$(document).ready(function () {
    if(window.innerWidth < 992) {
        $('.topPanel').css('height', 'auto');
    } else {
        $('.topPanel').css('height', '100vh');
    }
});
/* #endregion ########################################### */



/* #region ################# NAV PANEL SCROLLING ################# */

$('.navTile').click(function (e) { 
    let target = $(this).attr('scroll-target');
    $.scrollTo($(target), {duration: 500});

});

/* #endregion ########################################### */


$('.projectInfoBtn').click(function (e) { 
    $(this).toggleClass('btnFilled');
});

$('#navButtonToTerminal').click(function (e) { 
    e.preventDefault();
    showTerminal();
});

$('#term_exit').click(function (e) { 
    showGui();
});

function showGui() { 
    let term = $('#term_terminal');
    let gui = $('#navPanel');

    term.fadeOut( () => {
        gui.fadeIn();
        gui.addClass('d-flex');
    });
}

function showTerminal () { 
    terminal.clear();
    terminal.typewrite(welcomeText, 'fast'); 
    $('#navPanel').fadeOut( () => {

        $('#navPanel').removeClass('d-flex');
        $('#term_terminal').fadeIn( () => {
            adjustFontSize();
        });
        $('#term_terminal').removeClass('d-none');
    });
 }