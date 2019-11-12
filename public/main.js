const suits = ["spades", "diamonds", "clubs", "hearts"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace"
];
const deck = [];
const userHand = [];
const dealerHand = [];
let userSum = 0;
let dealerSum = 0;

const getCardValues = ranks => {
  if (ranks === "ace") {
    return 11;
  } else if (ranks === "king" || ranks === "queen" || ranks === "jack") {
    return 10;
  } else {
    return parseInt(ranks);
  }
};
const main = () => {
  document.querySelector("#resetbtn").style.display = "none";
  document.querySelector("#hitbtn").style.display = "none";
  document.querySelector("#standbtn").style.display = "none";
  document.querySelector(".backOfCard-1").classList.add("hide");
  document.querySelector(".backOfCard-2").classList.add("hide");
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const temp = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValues(ranks[j]),
        imageUrl: ranks[j] + "_of_" + suits[i] + ".svg"
      };
      deck.push(temp);
    }
  }

  for (let z = 0; z < 1000; z++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
};
const dealCards = () => {
  document.querySelector("#dealbtn").style.display = "none";
  document.querySelector("#resetbtn").style.display = "inline-flex";
  document.querySelector("#hitbtn").style.display = "inline-flex";
  document.querySelector("#standbtn").style.display = "inline-flex";
  document.querySelector(".backOfCard-1").classList.remove("hide");
  document.querySelector(".backOfCard-2").classList.remove("hide");
  for (let i = 0; i < 2; i++) {
    const userDrawn = deck.pop();
    userHand.push(userDrawn);
    const userHandLi = document.createElement("li");
    const img = document.createElement("img");
    img.src = "./images/cards/" + userDrawn.imageUrl;
    userHandLi.appendChild(img);
    document.querySelector(".userCards").appendChild(userHandLi);
    userSum += userHand[i].value;
    document.querySelector(".userDisplay").textContent = userSum;
  }

  if (userSum > 21) {
    document.querySelector(".userDisplay").textContent = "BUST. LOSER ! ";
    document.querySelector(".dealerDisplay").textContent = "WINNER ! ";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  } else if (userSum === 21) {
    document.querySelector(".userDisplay").textContent = "WINNER !";
    document.querySelector(".dealerDisplay").textContent = "BUST. LOSER !";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  }
  document.querySelector("#dealbtn").disabled = true;
};

const userHit = () => {
  for (let h = 0; h < 1; h++) {
    const hitCard = deck.pop();
    userHand.push(hitCard);
    const userHandLiII = document.createElement("li");
    const imgII = document.createElement("img");
    imgII.src = "./images/cards/" + hitCard.imageUrl;
    userHandLiII.appendChild(imgII);
    document.querySelector(".userCards").appendChild(userHandLiII);
    userSum += hitCard.value;
    document.querySelector(".userDisplay").textContent = userSum;
  }
  if (userSum > 21) {
    document.querySelector(".userDisplay").textContent = "BUST. LOSER ! ";
    document.querySelector(".dealerDisplay").textContent = "WINNER ! ";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  } else if (userSum === 21) {
    document.querySelector(".userDisplay").textContent = "WINNER !";
    document.querySelector(".dealerDisplay").textContent = "BUST. LOSER !";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  }
};

const dealerHit = () => {
  let d = 0;
  while (dealerSum <= 17) {
    document.querySelector(".backOfCard-1").classList.add("hide");
    document.querySelector(".backOfCard-2").classList.add("hide");
    const dealerDrawn = deck.pop();
    dealerHand.push(dealerDrawn);
    const dealerHandLi = document.createElement("li");
    const img = document.createElement("img");
    img.src = "./images/cards/" + dealerDrawn.imageUrl;
    dealerHandLi.appendChild(img);
    document.querySelector(".dealerCards").appendChild(dealerHandLi);
    dealerSum += dealerHand[d].value;
    document.querySelector(".dealerDisplay").textContent = dealerSum;
    d++;
  }
  if (dealerSum > 21) {
    document.querySelector(".dealerDisplay").textContent = "BUST. LOSER ! ";
    document.querySelector(".userDisplay").textContent = "WINNER ! ";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  } else if (dealerSum === 21) {
    document.querySelector(".dealerDisplay").textContent = "WINNER ! ";
    document.querySelector(".userDisplay").textContent = "BUST. LOSER ! ";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  } else if (dealerSum > userSum) {
    document.querySelector(".dealerDisplay").textContent = "WINNER ! ";
    document.querySelector(".userDisplay").textContent = "LOSER ! ";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  } else if (dealerSum < userSum) {
    document.querySelector(".dealerDisplay").textContent = "LOSER ! ";
    document.querySelector(".userDisplay").textContent = "WINNER ! ";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  } else if (dealerSum === userSum) {
    document.querySelector(".dealerDisplay").textContent = "ITS A TIE ! PUSH ";
    document.querySelector(".userDisplay").textContent = "ITS A TIE ! PUSH ";
    document.querySelector("#dealbtn").style.display = "none";
    document.querySelector("#hitbtn").style.display = "none";
    document.querySelector("#standbtn").style.display = "none";
  }
};

const reset = () => {
  location.reload();
};

document.addEventListener("DOMContentLoaded", main);
document.querySelector("#dealbtn").addEventListener("click", dealCards);
document.querySelector("#hitbtn").addEventListener("click", userHit);
document.querySelector("#standbtn").addEventListener("click", dealerHit);
document.querySelector("#resetbtn").addEventListener("click", reset);
