const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values : {
        gameVelocity: 1000,
        score: 0,
        lives: 3,
        currentTime: 60
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownId: setInterval(countDown, 1000),
    }
}

function main() {
    addListenerHitBox();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownId);
        alert("Game Over! Your final score is: " + state.values.score);
        return;
    }
}

function playSound(audioName) {
    let audio = new Audio(`/assets/audio/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    let randomSquare = state.view.squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add("enemy");
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.classList.contains("enemy")) {
                state.values.score++;
                state.view.score.textContent = state.values.score;
                square.classList.remove("enemy");
                playSound("hit");
            }
        })
    })
}

main()