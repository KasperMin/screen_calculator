var addResDisplay = document.getElementById('addResDisplay');
var subtractResDisplay = document.getElementById('subtractResDisplay');
var mutliplyResDisplay = document.getElementById('multiplyResDisplay');
var divideResDisplay = document.getElementById('divideResDisplay');

var addRes;
var subtractRes;
var multiplyRes;
var divideRes;

var divContainer = document.createElement('div');
divContainer.className = "container";
document.body.appendChild(divContainer);
var numberCol = 10;
var numberRow = 7;
var numberOut;

// Grid
function createGrid(colum, row) {
    for (var c = 0; c < colum; c++) {
      var divCol = document.createElement('div');
      divCol.className = "col";
      divContainer.appendChild(divCol);
      numberOut = numberCol -= 3
      if (numberCol <= 0) {
        divCol.innerText = 0;
        divCol.setAttribute("id", "0");
      } else {
        divCol.innerText = numberOut
        divCol.setAttribute("id", numberOut);
      }
      for (var r = 1; r < row; r++) {
        var divRow = document.createElement('div');
        divRow.className = "row";
        divContainer.appendChild(divRow)

        numberRow = numberCol + r;
        switch (numberRow) {
          case 10:
            divRow.innerText = "+";
            divRow.setAttribute("id", "+");
            break;
          case 7:
            divRow.innerText = "-"
            divRow.setAttribute("id", "-");
            break;
          case 4:
            divRow.innerText = "%"
            divRow.setAttribute("id", "%");
            break;
          case 1:
            divRow.innerText = "*"
            divRow.setAttribute("id", "*");
            break;
          case 0:
            divRow.innerText = "clear"
            divRow.setAttribute("id", "clear");
            break;
          case -1:
            divRow.innerText = "="
            divRow.setAttribute("id", "=");
            break;
          default:
            divRow.innerText = numberRow
            divRow.setAttribute("id", numberRow);
      }

      divCol.addEventListener("click", function() {
        console.log(event.currentTarget.id)
      });

      divRow.addEventListener("click", function() {
        console.log(event.currentTarget.id)
      });

    } // end of inner loop

  } // end of outer loop


} // end of createGrid funciton

// Button click function

createGrid(4, 4)

// Addition
function add(num1, num2) {
  addRes = num1 + num2;
  return addRes;
}

add(2, 4);
addResDisplay.innerHTML = "addResult = " + addRes;

// Subtraction
function subtract(num1, num2) {
  subtractRes = num1 - num2;
  return subtractRes;
}

subtract(10, 2);
subtractResDisplay.innerHTML = "subtractResult = " + subtractRes;

// Multiplycation
function multiply(num1, num2) {
  multiplyRes = num1 * num2;
  return multiplyRes;
}

multiply(4, 4);
multiplyResDisplay.innerHTML = "multiplyResult = " + multiplyRes;

// Division
function divide(num1, num2) {
  divideRes = num1 / num2;
  return divideRes
}

divide(100, 2)
divideResDisplay.innerHTML = "divideResult = " + divideRes;





//
// y = [1,6,3,7,9,1, 10, 90, 13];
//
//
//
// function my_max(input) {
//     var max = [];
//     var previousNumber = 0;
//     input.forEach( function (number) {
//       if (number > previousNumber ) {
//         max.pop();
//         max.push(number);
//       }
//       previousNumber = number;
//     });
//     return max;
// }
//
// my_max(y);
//
// function vowel_count (word) {
//     match = word.match(/[aeiouy]/gi);
//     return match.length;
// }
//
// vowel_count("hanna montana");
//
// function reverse(word) {
//     x = word.split("").reverse().join("");
//     return x;
// }
//
// reverse("kasper");
