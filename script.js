const letter = document.querySelectorAll(".letter");
const answer = document.querySelector(".answer");
const restartButton = document.querySelector(".restart-btn");
const categoryText = document.querySelector(".category");
const audioClick = document.querySelector("#click-sound");
const winSound = document.querySelector("#win-sound");
const lostSound = document.querySelector("#lost-sound");
const highScoreEl = document.querySelector(".high-score");
const currentScoreEl = document.querySelector(".current-score");

let highScore = 0;
let currentScore = 0;
// const wordsList = [
//   "gandras",
//   "pieva",
//   "baznyčia",
//   "kalendorius",
//   "joninės",
//   "arbatinukas",
//   "šuo",
//   "katinas",
//   "moliūgas",
// ];

let human = document.querySelectorAll(".human");
let humanParts = human.length - 1;
let humanIndex = -1;
let wordIndex = -1;

let luckyWord = "gandras";
let gameOver = false;

let categories = ["animals", "countries", "companies"]; //nebutinas array, bet ai :D
const wordsObject = {
  animals: {
    0: "gandras",
    1: "katė",
    2: "tigras",
    3: "gyvatė",
    4: "liūtas",
    5: "beždžionė",
    6: "žirafa",
    7: "tinginys",
    8: "meškėnas",
    9: "erelis",
  },
  countries: {
    0: "lietuva",
    1: "estija",
    2: "latvija",
    3: "italija",
    4: "rusija",
    5: "brazilija",
    6: "portugalija",
    7: "turkija",
    8: "austrija",
    9: "australija",
  },
  companies: {
    0: "microsoft",
    1: "google",
    2: "apple",
    3: "facebook",
    4: "intel",
    5: "lenovo",
    6: "samsung",
    7: "sony",
    8: "nokia",
    9: "toshiba",
  },
};

const selectLuckyWord = (word) => {
  let randomNumber = Math.floor(Math.random() * Object.values(word).length);
  luckyWord = word[randomNumber];
  displayAnswerBoxes();
  console.log(word[randomNumber]);
  // console.log(randomNumber);
};

const selectRandomCategory = () => {
  let randomCategory = Math.floor(Math.random() * categories.length);
  selectLuckyWord(wordsObject[categories[randomCategory]]);
  let kategorija = categories[randomCategory]
    .replace("animals", "Gyvūnai")
    .replace("countries", "Šalys")
    .replace("companies", "Kompanijos");
  categoryText.innerHTML = "Kategorija: " + kategorija;
  highScoreEl.innerHTML = "Daugiausiai surinktu tasku: " + highScore;
  currentScoreEl.innerHTML = "Dabartiniai taskai: " + currentScore;
};

//renderinam bruksnelius, kiek raidziu zodyje, tiek ir bruksneliu.
const displayAnswerBoxes = () => {
  for (l of luckyWord) {
    let answerBox = document.createElement("div");
    answer.appendChild(answerBox);
    answerBox.classList.add("answer-box");
  }
};

if (!gameOver) {
  selectRandomCategory();
}

const displayGameOverScreen = () => {
  restartButton.style.display = "inline-block";
};

const wonTheGame = () => {
  currentScore += 10;
  winSound.play();
  restartGame();
};

const renderLetters = (letters) => {
  let index = 0;
  const answerLetters = document.querySelectorAll(".answer-box");
  for (l of luckyWord) {
    if (l === letters) {
      answerLetters[index].innerHTML = l;
      wordIndex++;
    }
    index++;
  }
  if (wordIndex === luckyWord.length - 1) {
    wonTheGame();
  }
};

const renderHang = () => {
  humanIndex++;
  human[humanIndex].style.display = "inline-block";
  if (humanIndex === humanParts) {
    gameOver = true;
    lostSound.play();
    if (currentScore > highScore) {
      highScore = currentScore;
    }
    displayGameOverScreen();
  }
};

//checkinam pasirinkta raide.
const checkLetter = (e) => {
  //main game mechanizmas
  if (!gameOver) {
    audioClick.play();
    e.target.style.display = "None";
    let selectedLetter = e.target.innerHTML.toLowerCase();
    // selectedLetter = selectedLetter.toLowerCase;
    if (luckyWord.includes(selectedLetter)) {
      renderLetters(selectedLetter);
    } else {
      //renderinam pakaruokly jei zodyje nera raides :D
      renderHang();
    }
  }
};

const restartGame = () => {
  if (gameOver) currentScore = 0;
  gameOver = false;
  wordIndex = -1;
  human.forEach((e) => {
    e.style.display = "none";
  });
  letter.forEach((e) => {
    e.style.display = "block";
  });
  humanIndex = -1;
  restartButton.style.display = "none";
  let answerBox = document.querySelectorAll(".answer-box");
  answerBox.forEach((e) => {
    answer.removeChild(e);
  });
  selectRandomCategory();
  // displayAnswerBoxes();
};

letter.forEach((e) => e.addEventListener("click", checkLetter));
restartButton.addEventListener("click", restartGame);
