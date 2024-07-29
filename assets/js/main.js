const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 1000,
        score: 0,
        lives: 4,
        currentTime: 60,
        lastSquareIndex: null,
        enemyHit: false
    },
    actions: {
        timerId: null,
        countDownId: null
    }
}

function main() {
    addListenerHitBox();
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.lives.textContent = state.values.lives;
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownId = setInterval(countDown, 1000);
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownId);
        alert("Game Over! Your final score is: " + state.values.score);
        playSound("gameover");
        return;
    }
}

function playSound(audioName) {
    let audio = new Audio(`/assets/audio/${audioName}.mp3`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    if (!state.values.enemyHit) {
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
        if (state.values.lives <= 0) {
            clearInterval(state.actions.timerId);
            clearInterval(state.actions.countDownId);
            alert("Game Over! Your final score is: " + state.values.score);
            playSound("gameover");
            return;
        }
    }
    // resetando a flag para o proximo round
    state.values.enemyHit = false;
    // limpando
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    // sorteador
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * state.view.squares.length);
    } while (randomIndex === state.values.lastSquareIndex);

    state.values.lastSquareIndex = randomIndex;
    let randomSquare = state.view.squares[randomIndex];
    randomSquare.classList.add("enemy");
    playSound("shoot");

}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.classList.contains("enemy")) {
                state.values.score++;
                state.view.score.textContent = state.values.score;
                square.classList.remove("enemy");
                state.values.enemyHit = true;
                playSound("hit");
            }
        });
    });
}

main();
