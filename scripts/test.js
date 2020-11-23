const commands = ["hi","hello","yo","hi","hello","yo"];

$(document).ready(function () {
    sh_highlightDocument();
});

function echo() { 
    alert('henlo');
 }

$('#terminal').keydown(function (e) { 
    if (e.which == 13) {         //########## return / enter
        var content = this.value;
        var lastLine = content.substr(content.lastIndexOf("\n")+1);
        // alert(lastLine);
        switch (lastLine) {
            case "clear":
                return this.value = "";
                break;
            case "henlo":
                this.value += "\nhenlooo";
                break;
            case "commands":
                this.value += displayCommandsList();
                break;
            case "lines":
                this.height;
                break;
            default:
                this.value += "\nSorry, I don't understand. Try typing 'commands'.";
                break;
        }
    }
});




function displayCommandsList() { 
    var answer = "\nYou can use following commands:\n";
    for( i = 0; i < commands.length; i++) {
        answer += "[ " + commands[i] + " ]";
    }
    return answer;
}



   class Terminal {
       constructor(t) {
           this.t = $('#terminal');
           
       }

        print(val) { 
            
        }

        println(val) { 
            alert('println');
        }
   }

var terminal =  new Terminal($('#terminal'));
terminal.print('aa');