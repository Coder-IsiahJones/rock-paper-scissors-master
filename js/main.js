const buttons = document.querySelectorAll(".pick");
const choices = ["paper", "rock", "scissors"];
const scoreEl = document.getElementById("score");
const main = document.getElementById("main");
const selection = document.getElementById("selection");
const reset = document.getElementById("reset");
const userSelect = document.getElementById("user_select");
const houseSelect = document.getElementById("house_select");
const winner = document.getElementById("winner");

// Model buttons
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const modal = document.getElementById("modal");

let userChoice = undefined;
let score = 0;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        userChoice = button.getAttribute("data-choice");

        checkResult();
    });
});

reset.addEventListener("click", () => {
    // show the main & hide the selection
    main.style.display = "flex";
    selection.style.display = "none";
});

openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

const pickHouseHand = () => {
    return choices[Math.floor(Math.random() * choices.length)];
}

const updateScore = (value) => {
    score += value;

    scoreEl.innerHTML = score;
}

const checkResult = () => {
    const houseHand = pickHouseHand();

    // Update the view
    updateSelection(userSelect, userChoice);
    updateSelection(houseSelect, houseHand);

    if (userChoice === houseHand) {
        // Draw
        winner.innerHTML = "Draw";
    } else if (userChoice === 'paper' && houseHand === 'rock' ||
        userChoice === 'rock' && houseHand === 'scissors' ||
        userChoice === 'scissors' && houseHand === 'paper') {
        // User won
        updateScore(1);
        winner.innerHTML = "You Win";
    } else {
        // House won
        updateScore(-1);
        winner.innerHTML = "You Lost";
    }

    // show the selection & hide main
    main.style.display = "none";
    selection.style.display = "flex"
}

const updateSelection = (selectionEl, choice) => {
    // Class reset
    selectionEl.classList.remove("btn-paper");
    selectionEl.classList.remove("btn-rock");
    selectionEl.classList.remove("btn-scissors");

    // Update the image
    const img = selectionEl.querySelector("img");
    selectionEl.classList.add(`btn-${choice}`);
    img.src = (`./images/icon-${choice}.svg`);
    img.alt = choice;
}