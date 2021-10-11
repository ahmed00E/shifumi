var playerImage = document.getElementById("player-image")
var computerImage = document.getElementById("computer-image")
var roundHTML = document.getElementById("round-info")
var roundNumber = document.getElementById("round-number")
var playerScoreHTML = document.getElementById("player-score")
var computerScoreHTML = document.getElementById("computer-score")
var winnerHTML = document.getElementById("winner")
var buttons = document.getElementsByClassName("control")
var container = document.getElementById("score-history")

var round = 0
var playerScore = 0
var computerScore = 0
var index = 0
var array = [
  "https://www.handcramp.lol/assets/icons/rock.svg",
  "https://www.handcramp.lol/assets/icons/paper.svg",
  "https://www.handcramp.lol/assets/icons/scissors.svg"
]

function onButtonClick(choice) {
  var interval = setInterval(shuffleImages, 100)

  setTimeout(function() {
    clearInterval(interval)
    populateRound()
    displayImage(choice, playerImage)
    computerTurn(choice)
    displayScore()
  }, 2000)
}

function computerTurn(myChoice) {
  var computerChoice = generateComputerChoice()
  displayImage(computerChoice, computerImage)
  
  if (myChoice === computerChoice) {
    roundHTML.innerHTML = "Match nul"
    pushInHistory("Match nul")
  } else if (
    myChoice === "rock" && computerChoice === "scissors" ||
    myChoice === "paper" && computerChoice === "rock" ||
    myChoice === "scissors" && computerChoice === "paper"
  ) {
    roundHTML.innerHTML = `${myChoice} gagne`
    pushInHistory("Player gagne")

    playerScore = playerScore + 1

    if (playerScore === 3) {
      winnerHTML.innerHTML = `
        <button class="replay" onclick="reset()">
          Player a gagné. Voulez vous rejouer ?
        </button>
      `

      disableButtons()
    }
  } else {
    roundHTML.innerHTML = `${computerChoice} gagne`
    pushInHistory("Computer gagne")
    computerScore = computerScore + 1

    if (computerScore === 3) {
      winnerHTML.innerHTML = `
        <button class="replay" onclick="reset()">
          Computer a gagné. Voulez vous rejouer ?
        </button>
      `

      disableButtons()
    }
  }
}

function generateComputerChoice() {
  var array = ["rock", "paper", "scissors"]
  var min = 0
  var max = 2
  var random = Math.floor(Math.random() * (max - min + 1) + min)

  return array[random]
}

function displayImage(fileName, image) {
  var src = `https://www.handcramp.lol/assets/icons/${fileName}.svg`
  image.setAttribute("src", src)
}

function populateRound() {
  round = round + 1
  roundNumber.innerHTML = `Round ${round}`
}

function displayScore() {
  playerScoreHTML.innerHTML = playerScore
  computerScoreHTML.innerHTML = computerScore
}

function reset() {
  playerScore = 0
  playerScoreHTML.innerHTML = playerScore

  computerScore = 0
  computerScoreHTML.innerHTML = computerScore

  round = 0
  roundNumber.innerHTML = `Round ${round}`

  roundHTML.innerHTML = `&nbsp;`

  winnerHTML.innerHTML = `&nbsp;`

  container.innerHTML = ""
  enableButtons()
}

function disableButtons() {
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("disabled", "")
  }
}

function enableButtons() {
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute("disabled")
  }
}

function pushInHistory(text) {
  container.innerHTML = container.innerHTML + `<p>${text}</p>`
}

function shuffleImages() {
  if(index === 0) {
    index = 1
  } else if (index === 1) {
    index = 2
  } else {
    index = 0
  }

  computerImage.setAttribute("src", array[index])
}