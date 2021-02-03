// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);







// ^^^^^^^^^^^^^^ experimental area ^^^^^^^^^^^^^^^^





const sidebarScrollPos = 350; // the amount of pixels to be hidden in order to hide sidebar

/* #region ################# RESIZE ################# */
$(window).resize(function () { 
    let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
    if(window.innerHeight < 500) {
        $('#terminal-container').css('height', '70%');
        $('#terminal-container').css('margin-top', '0');
        $('#terminal-container').css('width', '90%');
    } else {
        $('#terminal-container').css('height', '100%');
        $('#terminal-container').css('margin-top', '20vh');
        $('#terminal-container').css('width', '100%');
    }
});
/* #endregion ########################################### */

/* #region ################# SIDENAV HIDE/SHOW ################# */

$(window).scroll(function () { 
    let scrollPos = $(window).scrollTop();;
    if (scrollPos > sidebarScrollPos) {
        $('.sidenav').addClass('sidenav-short');
        $('.side-navTile').addClass('.side-navTile-short');
    } else {
        $('.sidenav').removeClass('sidenav-short');
        $('.side-navTile').removeClass('.side-navTile-short');
    }
});
    
/* #endregion ########################################### */

/* #region ################# ON LOAD ################# */
$(document).ready(function () {
    if(window.innerHeight < 500) {
        $('#terminal-container').css('height', '70%');
        $('#terminal-container').css('margin-top', '0');
        $('#terminal-container').css('width', '90%');
    } else {
        $('#terminal-container').css('height', '100%');
        $('#terminal-container').css('margin-top', '20vh');
        $('#terminal-container').css('width', '100%');
    }
    adjustFontSize();
});
/* #endregion ########################################### */



/* #region ################# NAV PANEL SCROLLING ################# */

$('.side-navTile').click(function (e) { 
    let target = $(this).attr('scroll-target');
    if (target == 'top') {
        $.scrollTo(0, {duration: 500});
    } else {
        $.scrollTo($(target), {duration: 500});
    }
    

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