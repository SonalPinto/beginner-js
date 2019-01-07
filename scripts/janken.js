
function compare(choice1, choice2) {
    if(choice1 == choice2){
        return("The result is a tie!");
    } else if (choice1 == "rock") {
        if(choice2 == "scissors") {
            return("rock wins");
        } else {
            return("paper wins");
        }
    } else if (choice1 == "paper") {
        if(choice2 == "rock") {
            return("paper wins");
        } else {
            return("scissors wins");
        }
    } else {
        if(choice2 == "paper") {
            return("scissors wins");
        } else {
            return("rock wins");
        }
    }
}

function ai_play() {
    var decision = Math.random();
    if (decision < 0.34) {
    	decision = "rock";
    } else if(decision <= 0.67) {
    	decision = "paper";
    } else {
    	decision = "scissors";
    }
    return(decision);
}

// janken1 - simple non-loop based jankenpon
function janken1() {
  var userChoice = prompt("Do you choose rock, paper or scissors?");
 
  // Ensure legal user input - no loops
  if (userChoice!="rock" && userChoice!="paper" && userChoice!="scissors") {
      userChoice = ai_play();
      alert("You are too dumb to make a decision, So a decision will be made for you - " + userChoice);
  }
  
  var computerChoice = ai_play();
  console.log("User: " + userChoice);
  console.log("Computer: " + computerChoice);
  
  var result = compare(userChoice,computerChoice);
  console.log(result);
  alert("User: "+userChoice+"\nComputer: "+computerChoice+"\n"+result);
}

// janken2 - full game - though still uses alert boxes
function janken2() {
  var userChoice = prompt("Do you choose rock, paper or scissors?");
 
  // Ensure legal user input - no loops
  while (userChoice!="rock" && userChoice!="paper" && userChoice!="scissors") {
      userChoice = prompt("Are you daft? Do you choose rock, paper or scissors?");
  }
  
  var computerChoice = ai_play();
  console.log("User: " + userChoice);
  console.log("Computer: " + computerChoice);
  
  var result = compare(userChoice,computerChoice);
  console.log(result);
  alert("User: "+userChoice+"\nComputer: "+computerChoice+"\n"+result);
}

// janken3 - full game - Release version
function janken3($canvas,state) {

  var dynamic_HTML;

  switch (state) {
    case 0:
    // Init the Janken Sandbox
      $canvas.empty().addClass('janken_sandbox').fadeIn('slow');
      
      dynamic_HTML = '<h2>Choose!</h2>\
        <form id="jankenForm1">\
          <input type="radio" name="choice" value="rock" checked>rock<br>\
          <input type="radio" name="choice" value="paper">paper<br>\
          <input type="radio" name="choice" value="paper">scissors<br><br>\
          <input type="button" class="jankenbutton" id="jankenbutton1" value="READY">\
        </form>';
      $canvas.append(dynamic_HTML);
      // $('#jankenbutton1').click(function(){$(this).unbind();janken3($canvas,1);});
      $('#jankenbutton1').click(function(){janken3($canvas,1);});
      break;

    case 1:
      // Ready the choices and declare the result
      var userChoice = $('#jankenForm1 input[type="radio"]:checked').val();
      var computerChoice = ai_play();
      result = compare(userChoice,computerChoice);
      $canvas.empty().fadeTo(300,0.5).fadeTo(300,1);
      dynamic_HTML = '<h3> You: '+userChoice+'</h3>';
      dynamic_HTML += '<h3> Comp: '+computerChoice+'</h3>';
      dynamic_HTML += '<h2>'+result+'!</h2>';
      dynamic_HTML += '<br><br><input type="button" class="jankenbutton" id="jankenbutton2" value="AGAIN?">';
      dynamic_HTML += '<input type="button" class="jankenbutton" id="jankenbutton3" value="QUIT">';
      $canvas.append(dynamic_HTML);
      $('#jankenbutton2').click(function(){janken3($canvas,0);});
      $('#jankenbutton3').click(function(){janken3($canvas,2);});
      break;

    case 2:
      $canvas.fadeOut('slow', function(){
        $canvas.empty();
        $canvas.removeClass('janken_sandbox');
      });
      break;
  };
}
