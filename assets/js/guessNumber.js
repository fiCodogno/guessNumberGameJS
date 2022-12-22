const gameNumberElement = document.querySelector(".game-number");
const gameFeedbackElement = document.querySelector(".game-feedback");
const gameGuessElement = document.querySelector(".game-guess");
const gameHealthNumberElement = document.querySelector(".game-health-number");
const gameHealthBarElement = document.querySelector(".game-health-bar");
const gamePlayBtn = document.querySelector(".game-button-play");
const gameResetBtn = document.querySelector(".game-button-reset");

let gameHealth;
let isGameOver;
let randomGuessNumber;

const updateData = (element, message) => {
    element.textContent = message;
};

const init = () => {
    gameHealth = 100;
    isGameOver = false;
    randomGuessNumber = Math.trunc(Math.random() * 10) + 1;
    updateData(gameHealthNumberElement, "100%");
    updateData(gameFeedbackElement, "What's your guess?");
    updateData(gameNumberElement, "?");
    gameGuessElement.value = "";
    gameHealthBarElement.style.backgroundColor = "forestgreen";
    gameHealthBarElement.style.width = `${gameHealth}%`;
};
init();

const playGame = () => {
    const guess = Number(gameGuessElement.value);
    if(!isGameOver){
        if(guess <= 0){
            updateData(gameFeedbackElement, "Enter a valid number!");
            cleanAndFocus();
        } else if (guess === randomGuessNumber){
            gameNumberElement.textContent = randomGuessNumber;
            updateData(gameFeedbackElement, "YOU WIN!");
            isGameOver = true;
        } else if (guess !== randomGuessNumber){
            if(gameHealth > 20){
                updateData(gameFeedbackElement, guess > randomGuessNumber ? "Lower" : "Higher");
                gameHealth -= 20;
                gameHealthBarElement.style.width = `${gameHealth}%`;
                updateData(gameHealthNumberElement, `${gameHealth}%`);
                if(gameHealth < 50){
                    gameHealthBarElement.style.backgroundColor = "red";
                }
                cleanAndFocus();
            } else {
                updateData(gameFeedbackElement, "GAME OVER!");
                gameHealth = 0;
                gameHealthBarElement.style.width = `${gameHealth}%`;
                updateData(gameHealthNumberElement, "0%");
                isGameOver = true;
            }
        }
    } else {
        updateData(gameFeedbackElement, "Reset to play again!");
    }
};

const cleanAndFocus = () => {
    gameGuessElement.value = "";
    gameGuessElement.focus();
};

gamePlayBtn.addEventListener("click", playGame);
gameResetBtn.addEventListener("click", init);