const starWarsWords = [
  `amidala`,
  `anakin skywalker`,
  `army`,
  `artoo-deetoo`,
  `aunt beru`,
  `bail organa`,
  `bobba fett`,
  `buzz droid`,
  `chanceller`,
  `chewbacca`,
  `clone wars`,
  `coruscant`,
  `count dooku`,
  `dagobah`,
  `dantooine`,
  `darksaber`,
  `darth maul`,
  `darth sidious`,
  `darth tyrannous`,
  `darth vader`,
  `death star`,
  `destroyer`,
  `droid`,
  `ewoks`,
  `force`,
  `galaxy`,
  `grievous`,
  `han solo`,
  `hutt`,
  `jabba`,
  `jar jar binks`,
  `jawa`,
  `jedi`,
  `jedi academy`,
  `knight`,
  `lando calrissian`,
  `lea organa`,
  `lightsaber`,
  `luke skywalker`,
  `mace windu`,
  `master`,
  `master yoda`,
  `midi-chlorians`,
  `millenium falcon`,
  `mos eisley`,
  `obi-wan kenobi`,
  `padme`,
  `palpatine`,
  `podracing`,
  `qui-gon jin`,
  `rebel alliance`,
  `republic`,
  `sandpeople`,
  `see-threepio`,
  `senator`,
  `separatist`,
  `ship`,
  `sith`,
  `tatooine`,
];

const letters = `abcdefghijklmnopqrstuvwxyz`;

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
        `<button
        class="letter button" id="` +
        letter +
        `"
        onclick="handleGuess('` +
        letter +
        `')">
        ` +
        letter +
        `
         </button>`
    )
    .join("");

  document.getElementById("keyboard").innerHTML = alphabet;
}

function handleGuess(letter) {
  if (!letter) return false;
  if (guessed.indexOf(letter) === -1) guessed.push(letter);
  document.getElementById(letter).setAttribute("disabled", "true");

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
  document.getElementById("word-spotlight").innerHTML = wordStatus;
}

function checkGameStatus() {
  const word = wordStatus.replace(/\s/g, "");
  const correctAnswer = answer.replace(/\s/g, "");
  if (word === correctAnswer && mistakes !== maxWrong)
    document.getElementById("keyboard").innerHTML = `You Won!`;
  else if (word !== correctAnswer && mistakes === maxWrong) {
    document.getElementById("keyboard").innerHTML = `You Lost!`;
    document.getElementById("word-spotlight").innerHTML =
      "The answer was: " + answer;
  }
}

function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

function updateMeteor() {
  const element = document.getElementById("meteor");
  element.classList.add(`mistake-${mistakes}`);
  if (mistakes > 1) element.classList.remove(`mistake-${mistakes - 1}`);
  if (mistakes === 7) {
    const boomElement = document.getElementById("boom").classList.add("explosion");
    const meteorElement = document.getElementById("meteor").classList.add("explosion");
    const astronautElement = document.getElementById("astronaut").classList.add("explosion");
  }
}

function resetAnimation(){
    if (mistakes === 0) {
        const boomElement = document.getElementById("boom").classList.remove("explosion");
        const meteorElement = document.getElementById("meteor").classList.remove("explosion");
        const astronautElement = document.getElementById("astronaut").classList.remove("explosion");
    }
}

function reset() {
  mistakes = 0;
  guessed = [];
  randomWord();
  guessedWord();
  updateMistakes();
  generateAlphabet();
  resetAnimation();
}

document.getElementById("maxWrong").innerHTML = `${maxWrong}`;

randomWord();
generateAlphabet();
guessedWord();
