const starWarsWords = [
  `amidala`, `anakin skywalker`, `army`, `artoo-deetoo`, `aunt beru`,
  `bail organa`, `bobba fett`, `buzz droid`, `chanceller`, `chewbacca`,
  `clone wars`, `coruscant`, `count dooku`, `dagobah`, `dantooine`, 
  `darksaber`, `darth maul`, `darth sidious`, `darth vader`, `death star`,
  `destroyer`, `droid`, `ewoks`, `force`, `galaxy`,
  `grievous`, `han solo`, `jabba`, `jar jar binks`, `jawa`,
  `jedi`, `jedi academy`, `knight`, `lea organa`, `lightsaber`,
  `luke skywalker`, `mace windu`, `master`, `master yoda`, `midi-chlorians`,
  `millenium falcon`, `mos eisley`, `obi-wan kenobi`, `padme`, `palpatine`,
  `podracing`, `qui-gon jin`, `rebel alliance`, `republic`, `sandpeople`,
  `see-threepio`, `senator`, `separatist`, `ship`, `sith`, `tatooine`,
];

const letters = `abcdefghijklmnopqrstuvwxyz`;
const animationIds = ["boom", "meteor", "astronaut"];
const mistakeElementsIds = ["meteor"];

let answer = ``;
let maxWrong = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = starWarsWords[Math.floor(Math.random() * starWarsWords.length)];
}

function generateAlphabet() {
  let alphabet = letters
    .split(``)
    .map(
      (letter) =>
        `<button class="letter button" id="` +
        letter + `" onclick="handleGuess('` +
        letter + `')">` + letter + `</button>`).join("");

  document.querySelector("#keyboard").innerHTML = alphabet;
}

function handleGuess(letter) {
  if (!letter) return false;
  if (guessed.indexOf(letter) === -1) guessed.push(letter);
  document.querySelector(`#${letter}`).setAttribute("disabled", "true");

  if (answer.indexOf(letter) >= 0) guessedWord();
  else if (answer.indexOf(letter) === -1) {
    mistakes++;
    updateMistakes();
    updateMeteor();
  }
  checkGameStatus();
}

function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => {
      if (!letter || letter === "-" || letter === " ") {
        return `\xa0${letter}\xa0`;
      }
      return guessed.indexOf(letter) >= 0 ? letter : " _ ";
    })
    .join("");
  document.querySelector("#word-spotlight").innerHTML = wordStatus;
}

function checkGameStatus() {
  const word = wordStatus.replace(/\s/g, "");
  const correctAnswer = answer.replace(/\s/g, "");
  if (word === correctAnswer && mistakes !== maxWrong)
    document.querySelector("#keyboard").innerHTML = `You Won!`;
  else if (word !== correctAnswer && mistakes === maxWrong) {
    document.querySelector("#keyboard").innerHTML = `You Lost!`;
    document.querySelector("#word-spotlight").innerHTML =
      "The answer was: " + answer;
  }
}

function updateMistakes() {
  document.querySelector("#mistakes").innerHTML = mistakes;
}

function updateMeteor() {

    if (mistakes > 0 && mistakes < 7) {
      for (let i = 0; i < mistakeElementsIds.length; i++) {
        document.querySelector(`#${mistakeElementsIds[i]}`).classList.add(`mistake-${mistakes}`);
        document.querySelector(`#${mistakeElementsIds[i]}`).classList.remove(`mistake-${mistakes - 1}`);
      }
    }
   
    if (mistakes === 7) {
      for (let j = 0; j < animationIds.length; j++) {
        document.querySelector(`#${animationIds[j]}`).classList.add("explosion");
      }
      for (let k = 0; k < mistakeElementsIds.length; k++) {
        document.querySelector(`#${mistakeElementsIds[k]}`).classList.remove(`mistake-6`);
      }
    }
}

function resetAnimation() {
  if (mistakes === 0) {
    for (let i = 0; i < animationIds.length; i++) {
      document.querySelector(`#${animationIds[i]}`).classList.remove("explosion");
    }
  }
  document.querySelector("#mistakes").innerHTML = `${mistakes}`;
}

function resetMistakes() {
  for (let i = 0; i < mistakeElementsIds.length; i++) {
    for (let j = 1; j < 7; j++) {
      document.querySelector(`#${mistakeElementsIds[i]}`).classList.remove(`mistake-${j}`);
    }
  }
}

function reset() {
  mistakes = 0;
  guessed = [];
  setup('reset');
}

function setup(type) {
  randomWord();
  guessedWord();
  generateAlphabet();
  if(type === `reset`){
    resetMistakes();
    resetAnimation();
  }
}

document.getElementById("maxWrong").innerHTML = `${maxWrong}`;
setup(false);