const gameContainer = document.getElementById("game");
const bodyContainer = document.querySelector("body");
const resetButton = document.getElementById("reset");
const allCards = gameContainer.children;

const CARDS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

let flipped = [];
let matched = 0;
let isProcessing = false;

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(CARDS);

function createDivsForCards(colorArray) {
  for (let [i, color] of colorArray.entries()) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.dataset.id = i;
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function flipCard(event) {
  const { style } = event.target;
  if (style.backgroundColor == "") {
    style.backgroundColor = event.target.className;
  } else {
    style.backgroundColor = "";
  }
}

function addToArray(event) {
  flipped.push({ card: event.target });
}

function controlMatchLogic() {
  if (flipped.length === 2) {
    const firstCard = flipped[0].card;
    const secondCard = flipped[1].card;
    if (firstCard.className !== secondCard.className) {
      isProcessing = true;
      for (const card of flipped) {
        setTimeout(function () {
          card.card.style.backgroundColor = "";
          isProcessing = false;
        }, 1000);
      }
    } else if (firstCard.dataset.id !== secondCard.dataset.id) {
      for (const card of flipped) {
        card.card.removeEventListener("click", handleCardClick);
      }
      matched++;
      isProcessing = false;
    }
    flipped = [];
  }
}

function youWonNotification() {
  if (matched == allCards.length / 2) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = "you win!!!!";
    newDiv.id = "winner";
    bodyContainer.append(newDiv);
  }
}

function resetGame() {
  window.location.reload();
}

function handleCardClick(event) {
  if (isProcessing == false) {
    flipCard(event);
    addToArray(event);
    controlMatchLogic();
  }
  youWonNotification();
}

resetButton.addEventListener("click", resetGame);
createDivsForCards(shuffledColors);
