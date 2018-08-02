const HEIGHT = 4;
const WIDTH = 4;

function generateCards()
{
    console.log("generating cards");
    let canvas = document.getElementById("canvas");
    for(let cardNumber = 0; cardNumber < HEIGHT*WIDTH; cardNumber++)
    {
        let newCard = document.createElement("div");
        let textNode = document.createTextNode(cardNumber);
        newCard.appendChild(textNode);
        newCard.className = "card";
        canvas.appendChild(newCard);
    }
}