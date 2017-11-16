var display = document.getElementById('display');
var displayBg = document.getElementsByClassName('displayBg')
var allButtons = document.createElement('div');
allButtons.className = "container";
document.body.appendChild(allButtons);

var numberCol = 10, numberRow = 7, colorBgOn = false;


// Grid
function createGrid(colum, row) {
    for (var c = 0; c < colum; c++) {
      var divCol = document.createElement('div');
      divCol.className = "col";
      allButtons.appendChild(divCol);

      numberCol -= 3
      if (numberCol <= 0) {
        divCol.innerText = 0;
        divCol.setAttribute("id", "0");
      } else {
        divCol.innerText = numberCol
        divCol.setAttribute("id", numberCol);
      }

      for (var r = 1; r < row; r++) {
        var divRow = document.createElement('div');
        divRow.className = "row";
        allButtons.appendChild(divRow)

        numberRow = numberCol + r;
        switch (numberRow) {
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
  var divide = document.getElementById('%')
  var multiply = document.getElementById('*')
  var subtract = document.getElementById('-')
  var plus = document.getElementById('+');
  var equal = document.getElementById('=');
  var clear = document.getElementById('clear');
  var numberButtons = $('.col, .row:not(#\\+, #\\-, #\\%, #\\*, #\\=, #clear)');
  var mathOperator = [];
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

  // COLOR END ---------------------------------------

  // MATH OPERATORS -------------------------
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

    result = generalCalculator(firstNum, secondNum, mathOperator[0])
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

  // MATH OPRATORS END -----------------------------

  // DISPLAY --------------------------------------

  var firstNumHit = true, firstNum = [], secondNum = [], displayNum = []

  $('.col, .row:not(#\\=, clear)').on("click", function() {
    var buttonId = event.target.id
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
      displayNum.push(buttonId)
      display.innerHTML = displayNum.join('')
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

        result = generalCalculator(firstNum, secondNum, mathOperator[0])

        display.innerHTML = result
        displayNum = []
        secondNum = []
        firstNum = result
        firstNumHit == false
    }

    });

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
var generalCalculator = function(num1, num2, mathOperator) {
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
createGrid(4, 4)
