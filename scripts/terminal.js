
const o = $('#term_outputTA');     // HANDLER OF OUTPUT TEXTAREA
const i = $('#term_inputTA');      // HANDLER OF INPUT TEXTAREA
const t = $('#term_terminal');     // HANDLER OF TERMINAL (CONATINER)
const maxRows = 15;                // MAX NUMBER OF DISPLAYED ROWS
const keyCode = 13;
const commandPrompt = ">> ";
var welcomeText =  new Array(  // this text is typewrited on page load
    "Hi, I'm Michał.",
    "This is my portfolio website. A place where you can find information about me, my skills and obviously my projects.",
    "I encourage you to explore the website and I hope to hear from you soon.",
    "",
    "Type 'cmd' to get the list of availabe commands."
    );
var terminal = new Terminal(o, i);  //CREATE TERMINAL INSTANCE

function Terminal(output, input) { 
    this.output = output;
    this.input = input;
}



$(document).ready(function () {      // page onload
    o.attr('rows', maxRows);
    adjustFontSize();
    terminal.typewrite(welcomeText, 'fast'); 
});

$(window).resize(function () {
    adjustFontSize();
    terminal.scrollDown(true);
});
terminal.output.click(function (e) {  // FOCUS INPUT AREA WHEN CLICKED ON OUTPUT
    terminal.input.focus();
});

function adjustFontSize() { 
    // the height of row strictly depends on font size and since output window 
    // is always 'maxRows' high - font size needs to be adjusted to height of output,
    // so the output window always contained exactly 'maxRows' rows
    // alert(t.css('line-height'));    
    var newFontSize = Math.floor(t.height() * 0.9 / (maxRows+1));
    t.css('font-size', newFontSize);
}


$('#term_input').keydown(function (e) { 
    /* #region ################# ARROW KEYS ################# */
    // used to scroll through terminal
    if (e.which == 38) {                // UP KEY
        terminal.scrollUp();
    }
    if (e.which == 40) {                // DOWN KEY
        terminal.scrollDown();
    }
    /* #endregion ########################################### */

    /* #region ACTION TRIGGERED WHENEVER USER PRESSESS ENTER */
    if (e.which == keyCode) {         
        e.preventDefault();         // DISABLE DEFAULT BEHAVIOUR OF TEXTAREA WHEN PRESSED ENTER

        terminal.println(commandPrompt + terminal.input.val()); //comment this line if u dont want typed commands to appear in terminal
        var line = terminal.input.val(); // LINE THAT HAS BEEN SENT 
        var currentCommand = line.split(" ")[0]; //first word in line is the command
        var parameters = [];

        if (line.split(" ").length > 1) {           // CHECK FOR PARAMETERS
            line.split(" ").forEach(element => {
                if (element.startsWith('-'))
                    parameters.push(element.substr(1));
            });
        }

        handleCommand(terminal, currentCommand, line, parameters);  // in separate file (commandHandler.js) for clear view

        terminal.input.val("");                    // CLEAR INPUT CONTENT
        terminal.scrollDown(true);    // SCROLL OUTPUT WINDOW TO THE BOTTOM
    }
    /* #endregion */
});


/* #region ################# TERMINAL PROTOTYPES ################# */
// BASIC FUNCTIONALITIES OF TERMINAL
Terminal.prototype.println = function(value) {  // prints value in new line in terminal
    return this.output.html(this.output.val() + value + "\n");
}

Terminal.prototype.print = function(value) {  // prints value in terminal
    return this.output.html(this.output.val() + value);
}


Terminal.prototype.clear = function(value) {  //clears terminal content
    return this.output.html("");
}

Terminal.prototype.typewrite = function(text, speed = 'normal') { //simulates typewriting of the value, more info in typewriter.js
    write(this.output, text, speed);
}

Terminal.prototype.goto = function(target, speed) { // uses jquery.scrtollTo.min.js to scroll window to given target
    $.scrollTo($('#' + target), speed);             // targets defined in commandHandler.js
}

Terminal.prototype.scrollUp = function() {          //scrolls terminal output window 1 line up
    var lineLenght = this.input.height(); // input will always be 1 row high, therefore its height is exactly the same as line height
    this.output.scrollTop(this.output.scrollTop() - lineLenght)
}

Terminal.prototype.scrollDown = function(bottom = false) {  //scrolls terminal output window 1 line down
    if(bottom) {
        this.output.scrollTop(999999); // scrolls window to the very bottom
    } else {
        var lineLenght = this.input.height();
        this.output.scrollTop(this.output.scrollTop() + lineLenght); // scrolls window for the amount of line height
    }
    
}
/* #endregion ########################################### */


/* #region ################# TOP BAR  ################# */

// TODO simplify this
$('#term_optionsButton').click(function (e) { 
    hideAllDropdowns();
    $('#term_optionsMenu').toggleClass('term_hidden');
});

$('#term_helpButton').click(function (e) { 
    hideAllDropdowns();
    $('#term_helpMenu').toggleClass('term_hidden');
});

$('#term_fileButton').click(function (e) { 
    hideAllDropdowns();
    $('#term_fileMenu').toggleClass('term_hidden');
});

function hideAllDropdowns() { 
    $('#term_optionsMenu').addClass('term_hidden');
    $('#term_helpMenu').addClass('term_hidden');
    $('#term_fileMenu').addClass('term_hidden');
 }

 $('#clearBTN').click(function (e) { 
     e.preventDefault();
     terminal.clear();
 });

 $('#guiBTN').click(function (e) { 
     e.preventDefault();
     showGui();
 });

 $('#howToBTN').click(function (e) { 
    e.preventDefault();
    handleCommand(terminal, "howto", "howto", []);
});

$(window).click(function (e) { 
     if(!e.target.closest(".term_dropdown")) {
        hideAllDropdowns();
     }
     if(e.target.closest(".term_dropdownMenu_item")) {
        hideAllDropdowns();
     }
});

/* #endregion ########################################### */

/* #region ################# MOBILE DEVICES SETTINGS ################# */

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $(document).ready(function () {
        $('.term_androidArrows').removeClass('term_hidden');
    });
    
    $('.term_arrowTop').click(function (e) { 
        e.preventDefault();
        terminal.scrollUp();
    });
    
    $('.term_arrowBottom').click(function (e) { 
        e.preventDefault();
        terminal.scrollDown();
    });
}


/* #endregion ########################################### */