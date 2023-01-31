function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const CHANGE_INTERVAL = 1000;

const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    bodyEl: document.body,
}

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

const changer = {
    intervalId: null,
    isButtonDisabled: false,

    start() {
        this.isButtonDisabled = true;
        this.intervalId = setInterval(() => {
            refs.bodyEl.style.backgroundColor = getRandomHexColor();
        }, CHANGE_INTERVAL);
    },
    
    stop() {
        this.isButtonDisabled = false;
        clearInterval(this.intervalId);
    },
}

function onStartButtonClick(event) {
    changer.start();
    event.currentTarget.disabled = changer.isButtonDisabled;
}

function onStopButtonClick() {
    changer.stop();
    refs.startButton.disabled = changer.isButtonDisabled;
    refs.bodyEl.style.backgroundColor = null;
}