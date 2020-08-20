// A variable that store an array for the two players scores and 
// A varibale for the round score, is one beacuse we need only one value when ther is a round score
// A variable for the active player for the current active player, 0 = one, 1 = second, this will allow us to check in the zero base array [0,1]
var scores,roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

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
  
// We can use querySelector() to change a css style
document.querySelector('.dice').style.display = 'none'; 

// .getElementById() 
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


// ROLL DICE

// addEventListener accepts two arguments,the event type and a funtion that is a function passed as an argument and called by another function
// Anonnymous function does not have a name and thus can not be reused later
document.querySelector('.btn-roll').addEventListener('click', function(){
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
})

// HOLD

document.querySelector('.btn-hold').addEventListener('click', function(){
  // 1. Add current score to global score
  scores[activePlayer] += roundScore; 
  //scores[activePlayer] = scores[activePlayer] + roundScore; 

  // 2.Update the DOM
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

  // 3. Check if player win the game
  if(scores[activePlayer] >= 10) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.palayer-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.palayer-' + activePlayer + '-panel').classList.remove('active');
  } else {
    // 3. Next player
    nextPlayer();
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

