
// script made on the basis of Geoff Graham's script from: https://css-tricks.com/snippets/css/typewriter-effect/

// function to call 
function write(dest, text = ['default text'], speed = 'normal') {
    clearTimeout(timer);
    if(!$(dest).is('textarea')) {
        console.log('typewriter.js fun write(d,t,s): destination must be textarea');
        return;
    }
    try {
        setText(text);
        resetValues(speed);
        setDestination(dest);
        typewriter(); 
    } catch (e) {
        console.log(e);
    }
}   

var text = new Array('');    // set up text to print, each item in array is new line

var pause = 200; // pause time after each line
var speed = 10; // time delay of print out
var currentRow = 0; // start printing array at this posision
var currentRowLength = text[0].length; // the length of the text array
var currentPos = 0; // initialise text position
var destination;
var timer;
function typewriter() {
    destination.html(destination.html() + text[currentRow].charAt(currentPos));
    if ( currentPos++ == currentRowLength ) {         // IF ITERATION MEETS END OF THE ELEMENT
        currentPos = 0;
        currentRow++;
        destination.html( destination.html() + '\n'); // GO TO NEW LINE AFTER FINISHING EACH ELEMENT

        if ( currentRow != text.length ) {       
            currentRowLength = text[currentRow].length;        // SET LENGTH OF NEW LINE
            timer = setTimeout("typewriter()", pause);           // LITTLE PAUSE AFTER EACH LINE IS FINISHED
        }
    } else {
        timer = setTimeout("typewriter()", speed);             // PROCEED TO NEXT ITERATION AFTER DELAY
    }
    terminal.scrollDown(true);                        // SCROLL DOWN IF POSSIBLE
}

function resetValues(s) {
    var actualSpeed;            // miliseconds 
    switch (s) {
        case 'slow':
            actualSpeed = 60;
            break;
        case 'fast':
            actualSpeed = 10;
            break;
        default:
            actualSpeed = 30;
            break;
    }
    currentRow = 0;
    currentRowLength = text[0].length;
    currentPos = 0;
    speed = actualSpeed;
}

function setText(value) {
    text = value;
}

function setDestination(dest = document.getElementById("term")) { 
    destination = dest;
}




