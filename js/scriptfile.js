window.onload = function() {
  $('.button').on('click', function() { // When a button is clicked, execute this function
    var newInput = $(this).text(); // The text of the button clicked is assigned a variable
    var currentInput = $('.screen-top').text(); // The text at the top of the screen is assigned a variable
    var finalInput, answer;
    if (/^0+$/g.test(currentInput)) { // If the currentInput variable string is only zeros
      finalInput = newInput; // discard the zeros and assign a variable to the text of the button clicked.
    } else {
      finalInput = currentInput + newInput; // else concatenate the text of the button clicked to the end of the currentInput string.
    }
    
    if (newInput == 'AC') { // If AC button is clicked
      printTop('0'); // print zero to the string at the top of the screen
      printBottom(''); // and clear the string at the bottom
    } else if (newInput == 'CE') { // If CE button is clicked
      finalInput = finalInput.replace(/[0-9.]*(CE)*$/g, ''); // remove any digits and decimal point after the final operator/sign
      finalInput.length === 0 ? printTop('0') : printTop(finalInput); // after removing digits and decimal point, if there is nothing in the string, print zero, else print the string
    } else if (/[÷x\-+]/.test(newInput)) { // If one of the four operators are clicked
      currentInput = currentInput.replace(/[÷x\-+]$/,''); // remove any sign at the end of the string at the top
      finalInput = currentInput + newInput; // add the new sign
      printTop(finalInput); // print to the top
    } else if (newInput == '.') {
      !currentInput.match(/[0-9.]*$/)[0].match(/\./g) ? printTop(finalInput) : printTop(currentInput); // Checks whether there are any dots in the currentInput so there can not be more than 1 decimal point
    } else if (newInput == '=') { // if equal sign is clicked
      currentInput = changeSign(currentInput); // replace the division and multiplication sign with the correct javascript operators and remove any signs at the end of the input
      answer = calc(currentInput); // calculate the input and round off any errors
      printTop(answer); // show the answer to the top of the screen
      printBottom(''); // clear bottom of the screen
    } else {
      printTop(finalInput); // if none of the above are clicked, show the full input to the top as the buttons are clicked
    }
    finalInput = changeSign(finalInput); // replace the division and multiplication sign
    answer = calc(finalInput); // calculate the input and round off any errors
    printBottom(answer); // show the answer to the bottom of the screen, as the buttons are clicked.
  });
  
  function printTop(value) { // function to print anything to the top of the screen
    $('.screen-top').text(value);
  }
  
  function printBottom(value) { // function to print anything to the bottom of the screen
    $('.screen-bottom').text(value);
  }
  
  function calc(value) { // function to calculate and round the answer
    return Math.round(eval(value)*100000000000000)/100000000000000;
  }
  
  function changeSign(value) { //f function to replace the division and multiplication sign, and remove any sign at the end
    return value.replace(/[÷x]/g, v=>v=='÷' ? '/' : '*').replace(/[/*-+]$/, '');
  }
}