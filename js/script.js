const allCards = ['fa fa-diamond','fa fa-diamond',
                'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
                'fa fa-anchor','fa fa-anchor', 'fa fa-bolt','fa fa-bolt',
                'fa fa-cube','fa fa-cube','fa fa-leaf', 'fa fa-leaf',
                'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchCards = [];
let moves = 0;


function startGame(){
    gameTimer();
    shuffle(allCards); 
    for(let i=0; i<allCards.length; i++){
    const card = document.createElement("li");
    card.classList.add('card');
    card.innerHTML = "<i class = ' " + allCards[i] + " '</i>";
    // select the parent and append to the grid
    cardsContainer.appendChild(card);
    //no longer static, the cards are dynamic   

    //Add Click Event to each Card
    
    clickOnCard(card);
    }
};
/*
*   Click Card Event
*/   
function clickOnCard(card) {
    card.addEventListener('click', function() {
        
        //here we have the open card
       
        if(openCards.length === 1){
            const currentCard = this;
            const previousCard = openCards[0];

            card.classList.add('open', 'show', 'disable');
            openCards.push(this);
         
            countMoves();
            checkScore();
            
            //compare the cards here
            if(currentCard.innerHTML === previousCard.innerHTML){
                
                currentCard.classList.add("match");
                previousCard.classList.add("match");

                /*
                should reset the open cards array to add the next one as 
                add elements to matchcards array
                */

                matchCards.push(currentCard, previousCard);
                openCards = [];
                

                //Declare whether or not game is over
                
                gameOver();
                
            } else {
                //delay action so we can see the card after being click
               setTimeout(function(){
                    currentCard.classList.remove('open', 'show', 'disable');
                    previousCard.classList.remove('open', 'show', 'disable');
                    openCards = []; 
                }, 404);
                

                
            }
        } else {
        // does not have the open card
        card.classList.add('open', 'show', 'disable');
        openCards.push(this);
        }

    });
        
};

/*
*   Move Counter
*/
function countMoves(){
    moves++;
    const moveCounter = document.querySelector('.moves');
    moveCounter.innerHTML = moves;
};

/*
*   Timer Function
*/
let timer = document.querySelector("#timer");
let interval;
let seconds = 0; minutes = 0;

function gameTimer(){
    //set timer
    interval = setInterval(function () {
        timer.innerHTML = minutes + " mins " + seconds + " secs ";
        seconds++;
        if (seconds == 60){
            minutes++;
            seconds = 0;
        }
    }, 1000);
};

/*
*   Remove Stars
*/
function checkScore() {
    if (moves === 16){
        hideAStar();
    }   
    if (moves === 24){
        hideAStar();
    }      
}
function hideAStar(){
    const starList = document.querySelectorAll('.stars li');
    for (star of starList){
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

/*
*   End ofGame
*/

function gameOver(){
     if (matchCards.length === 16){
        clearInterval(interval); 
        alert ("Congratulations! You Won The Game!", 5000);
    }
}

/*
*   Start the Game
*/
startGame();




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



