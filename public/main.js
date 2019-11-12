const suits = ['spades', 'diamonds', 'clubs', 'hearts'] //this is an array of the suits. data type is string.
const ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
  'ace'
] //this is an array of all the ranks, data type is string.
const deck = [] // deck cards will be placed in this array
const userHand = [] //array to store user hand
const dealerHand = [] // array to store dealer hand
let userSum = 0 // declaring a variable to add user's score
let dealerSum = 0 // declaring a variable to add dealer's score

const getCardValues = ranks => {
  if (ranks === 'ace') {
    return 11
  } else if (ranks === 'king' || ranks === 'queen' || ranks === 'jack') {
    return 10
  } else {
    return parseInt(ranks)
  }
}
const main = () => {
  document.querySelector('#resetbtn').style.display = 'none'
  document.querySelector('#hitbtn').style.display = 'none'
  document.querySelector('#standbtn').style.display = 'none'
  document.querySelector('.backOfCard-1').classList.add('hide')
  document.querySelector('.backOfCard-2').classList.add('hide')
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      //this loops through all the ranks inside a certain suit. All 13 ranks will be selected before looping back to prior loop in line 33.
      const temp = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValues(ranks[j]),
        imageUrl: ranks[j] + '_of_' + suits[i] + '.svg'
      }
      deck.push(temp)
    }
  }

  for (let z = 0; z < 1000; z++) {
    var location1 = Math.floor(Math.random() * deck.length)
    var location2 = Math.floor(Math.random() * deck.length)
    var tmp = deck[location1]

    deck[location1] = deck[location2]
    deck[location2] = tmp
  }
}
const dealCards = () => {
  document.querySelector('#hitbtn').disabled = false //disable the hit button because game is over
  document.querySelector('#standbtn').disabled = false //disable the stand button because game is over
  document.querySelector('#resetbtn').disabled = false //disable the deal button because game is over
  document.querySelector('#resetbtn').style.display = 'inline-flex'
  document.querySelector('#hitbtn').style.display = 'inline-flex'
  document.querySelector('#standbtn').style.display = 'inline-flex'
  document.querySelector('#dealbtn').style.display = 'none'
  document.querySelector('.backOfCard-1').classList.remove('hide')
  document.querySelector('.backOfCard-2').classList.remove('hide')
  //function to draw user cards
  for (let i = 0; i < 2; i++) {
    //for loop to draw cards to User
    const userDrawn = deck.pop() //assigning bottom card to a variable userDrawn
    userHand.push(userDrawn) //pushing the bottom card into the array userHand -line18
    const userHandLi = document.createElement('li') //creating a list item in html space.
    const img = document.createElement('img') //creating an img tag in html space, ready to be assigned to li later in line 61
    img.src = './images/cards/' + userDrawn.imageUrl // assigning a source to the image. Need help understanding
    userHandLi.appendChild(img) //putting img tag inside userHandLi
    document.querySelector('.userCards').appendChild(userHandLi) //adding userHandLi to userCards <ul>
    userSum += userHand[i].value //changing userSum by adding the referenced array item to userSum. We add the value instead of the rank/suit/image because of the getCardValues function. line 38
    document.querySelector('.userDisplay').textContent = userSum //display content in userDisplay h2 <html>
  }

  if (userSum > 21) {
    // create an if loop to output results if user scores over 21
    document.querySelector('.userDisplay').textContent = 'BUST. LOSER ! ' //display bust - loser if user sums over 21
    document.querySelector('.dealerDisplay').textContent = 'WINNER ! ' //display the dealer they win because user lost
    document.querySelector('#hitbtn').disabled = true //disable the hit button because game is over
    document.querySelector('#standbtn').disabled = true //disable the stand button because game is over
    document.querySelector('#dealbtn').disabled = true //disable the deal button because game is over
  } else if (userSum === 21) {
    //if user scores 21. Need to update to give better results because of PUSH
    document.querySelector('.userDisplay').textContent = 'WINNER !' //User wins if scores 21 !
    document.querySelector('.dealerDisplay').textContent = 'BUST. LOSER !' //dealer loses is user scores 21.
    document.querySelector('#hitbtn').disabled = true //disable the hit button because game is over
    document.querySelector('#standbtn').disabled = true //disable the stand button because game is over
    document.querySelector('#dealbtn').disabled = true //disable the deal button because game is over
  }
  document.querySelector('#dealbtn').disabled = true
}

const userHit = () => {
  for (let h = 0; h < 1; h++) {
    const hitCard = deck.pop()
    userHand.push(hitCard)
    const userHandLiII = document.createElement('li')
    const imgII = document.createElement('img')
    imgII.src = './images/cards/' + hitCard.imageUrl
    userHandLiII.appendChild(imgII)
    document.querySelector('.userCards').appendChild(userHandLiII)
    userSum += hitCard.value
    document.querySelector('.userDisplay').textContent = userSum
  }
  if (userSum > 21) {
    document.querySelector('.userDisplay').textContent = 'BUST. LOSER ! ' //display bust - loser if user sums over 21
    document.querySelector('.dealerDisplay').textContent = 'WINNER ! ' //display the dealer they win because user lost
    document.querySelector('#hitbtn').disabled = true //disable the hit button because game is over
    document.querySelector('#standbtn').disabled = true //disable the stand button because game is over
    document.querySelector('#dealbtn').disabled = true //disable the deal button because game is over
  } else if (userSum === 21) {
    //if user scores 21. Need to update to give better results because of PUSH
    document.querySelector('.userDisplay').textContent = 'WINNER !' //User wins if scores 21 !
    document.querySelector('.dealerDisplay').textContent = 'BUST. LOSER !' //dealer loses is user scores 21.
    document.querySelector('#hitbtn').disabled = true //disable the hit button because game is over
    document.querySelector('#standbtn').disabled = true //disable the stand button because game is over
    document.querySelector('#dealbtn').disabled = true //disable the deal button because game is over
  }
}

const dealerHit = () => {
  let d = 0
  while (dealerSum <= 17) {
    document.querySelector('.backOfCard-1').classList.add('hide')
    document.querySelector('.backOfCard-2').classList.add('hide')
    const dealerDrawn = deck.pop()
    dealerHand.push(dealerDrawn)
    const dealerHandLi = document.createElement('li')
    const img = document.createElement('img')
    img.src = './images/cards/' + dealerDrawn.imageUrl
    dealerHandLi.appendChild(img)
    document.querySelector('.dealerCards').appendChild(dealerHandLi)
    dealerSum += dealerHand[d].value
    document.querySelector('.dealerDisplay').textContent = dealerSum
    d++
  }
  if (dealerSum > 21) {
    document.querySelector('.dealerDisplay').textContent = 'BUST. LOSER ! '
    document.querySelector('.userDisplay').textContent = 'WINNER ! '
    document.querySelector('#hitbtn').disabled = true
    document.querySelector('#standbtn').disabled = true
    document.querySelector('#dealbtn').disabled = true
  } else if (dealerSum === 21) {
    document.querySelector('.dealerDisplay').textContent = 'WINNER ! '
    document.querySelector('.userDisplay').textContent = 'BUST. LOSER ! '
    document.querySelector('#hitbtn').disabled = true
    document.querySelector('#standbtn').disabled = true
    document.querySelector('#dealbtn').disabled = true
  } else if (dealerSum > userSum) {
    document.querySelector('.dealerDisplay').textContent = 'WINNER ! '
    document.querySelector('.userDisplay').textContent = 'LOSER ! '
    document.querySelector('#hitbtn').disabled = true
    document.querySelector('#standbtn').disabled = true
    document.querySelector('#dealbtn').disabled = true
  } else if (dealerSum < userSum) {
    document.querySelector('.dealerDisplay').textContent = 'LOSER ! '
    document.querySelector('.userDisplay').textContent = 'WINNER ! '
    document.querySelector('#hitbtn').disabled = true
    document.querySelector('#standbtn').disabled = true
    document.querySelector('#dealbtn').disabled = true
  } else if (dealerSum === userSum) {
    document.querySelector('.dealerDisplay').textContent = 'ITS A TIE ! PUSH '
    document.querySelector('.userDisplay').textContent = 'ITS A TIE ! PUSH '
    document.querySelector('#hitbtn').disabled = true
    document.querySelector('#standbtn').disabled = true
    document.querySelector('#dealbtn').disabled = true
  }
}

const reset = () => {
  location.reload()
}

document.addEventListener('DOMContentLoaded', main) //triggers main function on page load
document.querySelector('#dealbtn').addEventListener('click', dealCards)
document.querySelector('#hitbtn').addEventListener('click', userHit) //triggers the userHit function because user is clicking Hit Button
document.querySelector('#standbtn').addEventListener('click', dealerHit) //triggers the dealerHit function because user is holding card values by clicking stand button
document.querySelector('#resetbtn').addEventListener('click', reset) //triggers reset function by hitting reset button
//document.querySelector().addEventListener('click', dealCards)
