const CARDSYMBOLS = String.fromCharCode(7,8,14,15,18,29,191,612);
const NUMBEROFUNIQUECARDS = CARDSYMBOLS.length;

let pairsFound = 0;
let numberOfMoves = 0;
let startTime = 0;

let lastCard;

function generateCards()
{
    let order = generateRandomCardOrder(CARDSYMBOLS.length);
    let canvas = document.getElementById("canvas");
    for(let cardNumber = 0; cardNumber < order.length; cardNumber++)
    {
        let cardDiv = document.createElement("div");
        cardDiv.innerHTML = cardNumber + 1;
        cardDiv.className = "card";

        let cardContentDiv = document.createElement("div");
        cardContentDiv.innerHTML = CARDSYMBOLS.charAt(order[cardNumber]);
        cardContentDiv.className = "card__content";

        cardDiv.appendChild(cardContentDiv);
        canvas.appendChild(cardDiv);

        cardContentDiv.addEventListener("click", cardClicked);
    }
}

function cardClicked()
{
    event.target.style.color = "blue";
    if(lastCard != null && lastCard != event.target)
    {
        cardsToSet = [];
        cardsToSet.push(event.target);
        cardsToSet.push(lastCard);
        if(lastCard.innerHTML == event.target.innerHTML)
        {
            lastCard.removeEventListener("click", cardClicked);
            event.target.removeEventListener("click", cardClicked);
            revealCards(cardsToSet);
            pairsFound++;
            checkIfPlayerWon();
        }
        else
        {
            cardsToHide = [];

            hideCards(cardsToSet);
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
            card.style.color = "lightblue";
        });
    }, 1000);
}

function startGame()
{
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

function generateRandomCardOrder(numberOfUniqueCards)
{
    let order = [];
    for(let i = 0; i<numberOfUniqueCards*2; i++)
    {
        order.push(i%numberOfUniqueCards);
    }

    let newOrder = [];
    while(order.length > 0)
    {
        let currentIndex = Math.floor(Math.random() * order.length);
        newOrder.push(order[currentIndex]);
        order.splice(currentIndex , 1);
    }

    return newOrder;
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
            if (confirm("Congratulations, you won! You got " + getNumberOfStars() + " stars with " + numberOfMoves + " moves in " + getElapsedGameTime() + " seconds. Would you like to play again?" )) {
                restart();
            } 
        }, 2000);
    }
}

function updateUI()
{
    if(pairsFound != NUMBEROFUNIQUECARDS)
    {
        let time = document.getElementById("time");
        time.innerHTML = getElapsedGameTime();
    }

    let stars = document.getElementById("star");
    stars.innerHTML = getNumberOfStars();
   
    let moveCounter = document.getElementById("moves");
    moveCounter.innerHTML = numberOfMoves;
}

function getElapsedGameTime()
{
    return Math.round((new Date().getTime() / 1000) - startTime);
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

window.setInterval(function(){
    updateUI();
}, 1000);