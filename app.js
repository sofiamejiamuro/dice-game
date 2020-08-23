// A variable that store an array for the two players scores and 
// A varibale for the round score, is one beacuse we need only one value when ther is a round score
// A variable for the active player for the current active player, 0 = one, 1 = second, this will allow us to check in the zero base array [0,1]
var scores,roundScore, activePlayer, gamePlaying;

init();

// Dice, calculate a random number
// We use Math.random() method, multiplies it by six and add one, because we need a number beetween 1 and 6
// We use the method Math.floor() it order to remove the decimal part of the number
 
/* dice = Math.floor(Math.random()*6)+1;
console.log('dice',dice); */

// querySelector selects the first element found
// textContent modify the content of the element
// .textContent is just for plain text so in order to put HTML elements that should be a string, we use .innerHTML

// document.querySelector('#current-' + activePlayer).textContent = dice;  <-- this is a setter because we are setting a value
// document.querySelector('#score-0' + activePlayer).textContent; <-- this is a getter because we are getting a value

/* document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';   */
  



// ROLL DICE

// addEventListener accepts two arguments,the event type and a callback funtion that is a function passed as an argument and called by another function
// Anonnymous function does not have a name and thus can not be reused later
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    // 1.Random number
    var dice = Math.floor(Math.random()*6)+1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
      // .src change the image 
    diceDOM.src = './assets/images/dice-' + dice + '.png'

    // 3. Update the round score IF the rolled number was not a 1
    if(dice !== 1) {
      // Add score
      roundScore += dice;
      //roundScore = roundScore + dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      nextPlayer();
    }
  }
})

// HOLD

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    // 1. Add current score to global score
    // scores[activePlayer]  here we look on the array scores the index which is porvided by activeplayer, that could be 0 or 1 
    
    // active player here can be 0 or 1
    //console.log(activePlayer);
    //console.log(scores);
    // In this line the content of index 0 or 1 (activePlayer) is filled in the scores array
    // scores[activePlayer] + roundScore this is when there is a value already, scores is initialized on [0,0]
    // player's global score array
    scores[activePlayer] += roundScore; 
    //scores[activePlayer] = scores[activePlayer] + roundScore; 
    //console.log(scores);
    
    // 2.Update the DOM
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Check if player win the game
    // if scores[the position of the player and the points]
    if(scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
  
    } else {
      // 3. Next player
      nextPlayer();
    }
  }

})

function nextPlayer(){

  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Reset the score
  roundScore = 0;

  // Print on DOM the score reseted
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Print on DOM the next player
  /* document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active'); */
    // Toggle remove the class if it exists and add it if does not 
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active'); 

  // Hide the dice
  document.querySelector('.dice').style.display = 'none';

}

/*  document.querySelector('.btn-new').addEventListener('click', function(){
  // Reset player scores [0,0], roundScore and active player and restablish some values
  // AS we already set the same lines of code at the beginning we should stick to DRY principle
  // In order to do so we create an init function, and call it when needed

  //init()
  //  Instead of call n anonymous function that calls another function we can pass as an argument 
  //  the function itself, without calling it
}) */
 
document.querySelector('.btn-new').addEventListener('click',init)

function init(){
  scores=[0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // We can use querySelector() to change a css style
  document.querySelector('.dice').style.display = 'none'; 

  // .getElementById() 
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active'); 
  document.querySelector('.player-0-panel').classList.add('active');
}


// state variable tells us the condidtion of a variable