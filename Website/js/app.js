const CARDSYMBOLS = "ABCDEFGH";//String.fromCharCode(7,8,14,15,18,29,191,612); 
const NUMBEROFUNIQUECARDS = CARDSYMBOLS.length;
const MATCH = 2; //only supports 2 for the time being

let pairsFound = 0;
let numberOfMoves = 0;
let startTime = new Date().getTime() / 1000;
let gameTime = new Date().getTime() / 1000;
let lastCard;

function generateCards()
{
    let canvas = document.getElementById("canvas");
    let randomizedOrder = generateRandomCardOrder();

    randomizedOrder.forEach(cardSymbolID => {
        let cardDiv = document.createElement("div");
        cardDiv.innerHTML = canvas.children.length + 1;
        cardDiv.className = "card";

        let cardContentDiv = document.createElement("div");
        cardContentDiv.innerHTML = CARDSYMBOLS.charAt(cardSymbolID);
        cardContentDiv.className = "card__content";

        cardDiv.appendChild(cardContentDiv);
        canvas.appendChild(cardDiv);

        cardContentDiv.addEventListener("click", cardClicked);
    });
}

function cardClicked()
{
    event.target.style.color = "blue";
    
    if(lastCard != null && lastCard != event.target) //separate cards have been selected
    {
        selectedCards = [];
        selectedCards.push(event.target);
        selectedCards.push(lastCard);
        if(lastCard.innerHTML == event.target.innerHTML) //match is found
        {
            lastCard.removeEventListener("click", cardClicked);
            event.target.removeEventListener("click", cardClicked);
            revealCards(selectedCards);
            pairsFound++;
            checkIfPlayerWon();
        }
        else
        {
            hideCards(selectedCards);
        }

        numberOfMoves++;
        lastCard = null;
    }
    else
    {
        lastCard = event.target;
    }
}

function revealCards(cards)
{
    cards.forEach(card => {
        card.style.color = "orange";
    });
    setTimeout(() => {
        cards.forEach(card => {
            card.innerHTML = "★";
            card.style.color = "orange";
        });
    }, 1000);
}

function hideCards(cards)
{
    setTimeout(() => {
        cards.forEach(card => {
            if(card != lastCard)
            {
                card.style.color = "lightblue";
            }
        });
    }, 1000);
}

function startGame()
{
    lastCard = null;
    clearCards();
    generateCards();
    pairsFound = 0;
    numberOfMoves = 0;
    startTime = new Date().getTime() / 1000;
}

function clearCards()
{
    let canvas = document.getElementById("canvas");
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function generateRandomCardOrder()
{
    //Creates an array of n * MATCH length, where n is NUMBEROFUNIQUECARDS and MATCH is the number of the same cards to match together.
    //After creating an ordered array [0,1,2,3,4,... n * MATCH], I will return a new array that's a permutation of the one created.

    let order = [];

    for(let i = 0; i<NUMBEROFUNIQUECARDS*MATCH; i++)
    {
        order.push(i%NUMBEROFUNIQUECARDS);
    }
    
    shuffle(order);
    return order;
}

function shuffle(array)
{
    let currentIndex = array.length - 1;
    while(currentIndex)
    {
        let indexToSwap = Math.floor(Math.random() * currentIndex);
        let temp = array[indexToSwap];
        array[indexToSwap] = array[currentIndex];
        array[currentIndex] = temp;
        currentIndex--;
    }
}

function restart()
{
    startGame();
}

function checkIfPlayerWon()
{
    if(pairsFound == NUMBEROFUNIQUECARDS)
    {
        setTimeout(() => {
            if (confirm("Congratulations, you won! You got " + getNumberOfStars() + " stars with " + numberOfMoves + " moves in " + gameTime + " seconds. Would you like to play again?" )) {
                restart();
            }
        }, 2000);
    }
}

function updateUI()
{
    updateGameTime();

    let time = document.getElementById("time");
    time.innerHTML = gameTime;

    let stars = document.getElementById("star");
    stars.innerHTML = getNumberOfStars();
   
    let moveCounter = document.getElementById("moves");
    moveCounter.innerHTML = numberOfMoves;
}

function updateGameTime()
{
    if(pairsFound != NUMBEROFUNIQUECARDS)
    {
        gameTime = Math.round(new Date().getTime() / 1000 - startTime);
    }
}

function getNumberOfStars()
{
    if(numberOfMoves > 30)
    {
        return "★";
    }
    else if(numberOfMoves > 20)
    {
        return "★★";
    }
    else
    {
        return "★★★";
    }
}

setInterval(() => {
    updateUI();
}, 750);