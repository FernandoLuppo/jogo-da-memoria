const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";

let startGame = () => {
  initializeCards(game.createCardsFromTechs());
};

let initializeCards = (cards) => {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    creatCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
};

let creatCardContent = (card, cardElement) => {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
};

let createCardFace = (face, card, element) => {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
    cardElementFace.classList.add(BACK);
  }

  element.appendChild(cardElementFace);
};

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.secondCard) {
      if (game.checkMath()) {
        game.clearCards();
        if (game.checkGameOver()) {
          let gameOver = document.getElementById("gameOver");
          gameOver.style.display = "flex";
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 700);
      }
    }
  }
}

function restart() {
  game.clearCards();
  startGame();
  let gameOver = document.getElementById("gameOver");
  gameOver.style.display = "none";
}

startGame();
