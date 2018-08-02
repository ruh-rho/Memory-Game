const HEIGHT = 4;
const WIDTH = 4;

function generateCards()
{
    console.log("generating cards");
    let canvas = document.getElementById("canvas");
    for(let cardNumber = 0; cardNumber < HEIGHT*WIDTH; cardNumber++)
    {
        let cardDiv = document.createElement("div");
        let cardNumberText = document.createTextNode(cardNumber + 1);

        cardDiv.appendChild(cardNumberText);
        cardDiv.className = "card";

        let cardContentDiv = document.createElement("div");
        let cardContentText = document.createTextNode("A");
        cardContentDiv.appendChild(cardContentText);
        cardContentDiv.className = "card__content";
        

        cardDiv.appendChild(cardContentDiv);

        canvas.appendChild(cardDiv);
    }
}