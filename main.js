// - periods
// - convert to all javascript
// - limit the amount of numbers that can be typed
// - Prevent NaN

var displayBg = document.getElementsByClassName('displayBg')
var calculator = document.createElement('div');
calculator.className = "container";
document.body.appendChild(calculator);

var numberCol = 13, numberRow = 10, colorBgOn = false;

// Grid
function createGrid(colum, row) {
    for (var c = 0; c < colum; c++) {
      numberCol -= 3

      // Merging
      if (numberCol == 10 ) {
        var divCol = document.createElement('div');
        calculator.appendChild(divCol)
        divCol.colSpan = 4;
        divCol.innerText = "0";
        divCol.setAttribute("id", "display")
        divCol.className = "display"
        divCol.style
      } else {
        var divCol = document.createElement('td');
        divCol.className = "col";
        calculator.appendChild(divCol);
      }

      // Making sure that the last negative numberCol is set to zero
      if (numberCol <= 0) {
        divCol.innerText = 0;
        divCol.setAttribute("id", "0");
      } else if (numberCol == 10){


      } else {
        divCol.innerText = numberCol
        divCol.setAttribute("id", numberCol);
      }

      for (var r = 1; r < row; r++) {
        numberRow = numberCol + r;

        // Merging the first 3 rows into one by checking into the first if statement
        if (numberRow > 10) {
          var divRow = document.createElement('tr');
          calculator.appendChild(divRow)
          divRow.colSpan = 3;
        } else {
          var divRow = document.createElement('tr');
          divRow.className = "row";
          calculator.appendChild(divRow)
        }

        switch (numberRow) {
          case 13:
          case 12:
          case 11:
            break;
          case 10:
            divRow.innerText = "+";
            divRow.setAttribute("id", "+");
            divRow.style.backgroundColor  = '#6C70EB'; // purple
            break;
          case 7:
            divRow.innerText = "-"
            divRow.setAttribute("id", "-");
            divRow.style.backgroundColor  = '#6C70EB';
            break;
          case 4:
            divRow.innerText = "%"
            divRow.setAttribute("id", "%");
            divRow.style.backgroundColor  = '#6C70EB';
            break;
          case 1:
            divRow.innerText = "*"
            divRow.setAttribute("id", "*");
            divRow.style.backgroundColor  = '#6C70EB';
            break;
          case 0:
            divRow.innerText = "clear"
            divRow.setAttribute("id", "clear");
            divRow.style.backgroundColor  = '#F06060';
            break;
          case -1:
            divRow.innerText = "="
            divRow.setAttribute("id", "=");
            divRow.style.backgroundColor  = '#00FF84';
            break;
          default:
            divRow.innerText = numberRow
            divRow.setAttribute("id", numberRow );
      }

    } // end of inner loop


  } // end of outer loop

  var divide = document.getElementById('%'),  multiply = document.getElementById('*'), subtract = document.getElementById('-')
  var plus = document.getElementById('+'), equal = document.getElementById('='), clear = document.getElementById('clear');
  var numberButtons = $('.col, .row:not(#\\+, #\\-, #\\%, #\\*, #\\=, #clear)');
  var mathOperator = [], firstNumHit = true, firstNum = [], secondNum = [], displayNum = []
  var allOperators;

  // COLOR ----------------------------------

   var addAndRemoveGreyBg = function() {
       var pushedButton = event.target.id
       $('.row').filter('#\\-, #\\%, #\\*, #\\+').each(function(id) {
         var element = this.id
         if (element == pushedButton) {
         document.getElementById(this.id).style.background = 'linear-gradient(to left top, #D3CCE3, #E9E4F0)';
       } else {
          document.getElementById(this.id).style.background = '#6C70EB';
       }
     });
  }



  // Make own filter helper function!
  $('.row').filter('#\\%, #\\*, #\\-, #\\+, #\\=, #clear').each(function(id) {
    document.getElementById(this.id).addEventListener('click', addAndRemoveGreyBg);
  })

  numberButtons.on("click", addAndRemoveGreyBg);

  // BLINK EFFECT ---------------------------------------

  var blinkFunction = function() {
    $('#display').fadeOut(1, function() {
      $(this).fadeIn();
    })
  }

  // MATH OPERATORS -------------------------
  if (firstNum[0] < firstNum.lengt ) {
    blinkFunction()
  } else {
    divide.addEventListener('click', function() {
      if (mathOperator.length < 3) {
        mathOperator.push(divideFunction)
        firstNumHit = false
        console.log('%')
      }
    });

    multiply.addEventListener('click', function(){
      if (mathOperator.length < 3) {
        mathOperator.push(multiplyFunction)
        firstNumHit = false
        console.log('*')
      }
    })

    plus.addEventListener("click", function() {
      if (mathOperator.length < 3) {
        mathOperator.push(addFunction)
        firstNumHit = false
        console.log('+')
      }
    });

    subtract.addEventListener("click", function() {
      if (mathOperator.length < 3) {
        mathOperator.push(subtractFunction)
        firstNumHit = false
        console.log('-')
      }
    });

    equal.addEventListener("click", function() {
      secondNum = intConversion(secondNum)
      if (firstNum.constructor == Array) {
        firstNum = intConversion(firstNum)
      }

      if (mathOperator.length == 2) {
        console.log(mathOperator.shift())
      }

      result = generalcalculator(firstNum, secondNum, mathOperator[0])
      console.log('length: ' + mathOperator.length)
      console.log('left: ' + mathOperator[0])
      console.log(result)
      display.innerHTML = result
      resetAll()

      })

    clear.addEventListener("click", function() {
        display.innerHTML = "0"
        resetAll()
    });
  }

  // MAIN --------------------------------------

  $('.col, .row:not(#\\=, #clear)').on("click", function() {
    var buttonId = event.target.id
    blinkFunction()
    match = checkForOperator(buttonId)

    // Display
    if (match == false) {
      displayNum.push(buttonId)
      if (displayNum[0] !== '0') {
        display.innerHTML = displayNum.join('')
      } else {
        console.log('x')
        displayNum = []
      }
    } else {

      displayNum = []
    }


    // Storing of first and second number along with calculation
    if (match == false && firstNumHit == true) {
        firstNum.push(buttonId)
        console.log('first: ' + firstNum)
    }  else if (match == false && firstNumHit == false) {
        secondNum.push(buttonId)
        console.log('second: ' + secondNum)
    }  else if (match == true && secondNum.length > 0) {
        console.log('length: ' + mathOperator.length)
        if (firstNum.constructor == Array) {
          firstNum = intConversion(firstNum)
        }
        secondNum = intConversion(secondNum)
        console.log(mathOperator[0] )

        if (mathOperator.length == 3) {
          console.log(mathOperator.shift())
        }

        result = generalcalculator(firstNum, secondNum, mathOperator[0])

        display.innerHTML = result
        displayNum = []
        secondNum = []
        firstNum = result
        firstNumHit == false
    }

    });

  /* DISPLAY EXTRA -> MIGHT USE INSTEAD OF BLINK
    displayNum = []
    displayNum.push(buttonId)
    display.innerHTML = displayNum.join('')
    displayNum = []
  */

  // DISPLAY END -----------------------------

  // HELPER FUNCTIONS ------------------------

  var checkForOperator = function(id) {
    operators = ['+', '-', '*', '%', '=', 'clear'];
    match = []

    for (i = 0; i < operators.length; i++) {
      if (id == operators[i]) {
          match.push(operators[i])
      }
    }

    if (match[0] != null) {
      return true;
    } else {
      return false;
    }

  }

  function resetAll() {
    displayNum = []
    firstNum = []
    secondNum = []
    mathOperator = []
    firstNumHit = true
  }

  function clearNumArray (numArray) {
    if (numArray == firstNumArray) {
      return firstNumArray = [];
    } else {
      return secondNumArray = [];
    }
  }

  //Convert to integer
  function intConversion(array) {
    var toString = array.join("");
    return int = parseInt(toString);
  }

} // end of createGrid funciton

// Genral calculator callback function
var generalcalculator = function(num1, num2, mathOperator) {
  return mathOperator(num1, num2)
}

// Addition
var addFunction = function (num1, num2) {
  return num1 + num2
}

// Subtraction
var subtractFunction = function (num1, num2) {
  return num1 - num2;
}

// Multiplycation
var multiplyFunction = function (num1, num2) {
  return num1 * num2;
}

// Division
var divideFunction = function (num1, num2) {
  return num1 / num2;
}


// runninng createGrid function
createGrid(5, 4)
