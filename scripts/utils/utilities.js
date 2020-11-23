

/* #region ################# PROTOTYPES ################### */

String.prototype.getCharsIndexes = function (char) { 
   // returns an array of indexes on which the given 'char' appears in string, ignores upper case
   // example: elephant.getCharsIndexes('e') returns [0,2]
   var letter = char.toLowerCase();
   var word = this.toLowerCase();
   var charsPos = new Array();
   for (i = 0; i < word.length; i++) {
      if (word.charAt(i) == letter)
         charsPos.push(i);
   }
   return charsPos;
};

String.prototype.insertAt = function (loc,strChunk) { 
    return (this.valueOf().substr(0,loc)) + strChunk + (this.valueOf().substr(loc));
};

String.prototype.replaceAt = function (index, newChar) { 
   if (this.length < 1) return;
   if (index == 0) {
      return (newChar + (this.valueOf().substr(index + 1)));
   }
   if (index == this.length -1 ) {
      return ((this.valueOf().substr(0,index)) + newChar);
   }
   return (this.valueOf().substr(0,index)) + newChar + (this.valueOf().substr(index + 1));
};

Array.prototype.getRandom = function () { 
   var n = Math.floor(Math.random() * this.length);
   return this[n];
};

/* #endregion #################################################*/

/* #region ################# RATIOS ################# */
// HEIGHT ALWAYS ADJUSTS TO WIDTH

$('.ratio-golden').each(function (index, self) { 
   setHeightGolden(self);
});
$('.ratio-golden-r').each(function (index, self) { 
  setHeightGoldenReversed(self);
});
$('.clone-height').each(function (index, self) { 
   cloneHeight(self);
});
$(window).resize(function () { 

   $('.ratio-golden').each(function (index, self) { 
      setHeightGolden(self);
   });

   $('.ratio-golden-r').each(function (index, self) { 
     setHeightGoldenReversed(self);
   });

   $('.clone-height').each(function (index, self) { 
   cloneHeight(self);
   });
});



/* #endregion ########################################### */


function setHeightGolden(self) { 
   var width = $(self).width();
   var height = width / 1.618;
   $(self).height(height);
 }

function setHeightGoldenReversed(self) { 
   var width = $(self).width();
   var height = width * 1.618;
   $(self).height(height);
}

function cloneHeight(self) {
   var target = $(self).attr('data-target');
   var newHeight = $(target).height();
   $(self).height(newHeight);
}
