import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startButton: document.querySelector('button[data-start]'),
    daysSpan: document.querySelector('span[data-days]'),
    hoursSpan: document.querySelector('span[data-hours]'),
    minutesSpan: document.querySelector('span[data-minutes]'),
    secondsSpan: document.querySelector('span[data-seconds]'),
}

startButtonDisabled();
refs.startButton.addEventListener('click', onStartButtonClick);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] - new Date() > 0) {
            refs.startButton.disabled = false;
        } else {
            Notiflix.Notify.failure(`Please choose a date in the future, after ${new Date().toDateString()}`);
        }
    },
};

const flatpInit = flatpickr('#datetime-picker', options);

const timer = {
    timerId: null,
    updateInterval: 1000,

    start() {
        pageTimerUpdater(convertMs(flatpInit.selectedDates[0] - Date.now()));
        this.timerId = setInterval(() => {
            const timeCounter = flatpInit.selectedDates[0] - Date.now();
            if (timeCounter < 0) {
                clearInterval(this.timerId);
                startButtonDisabled();
                return;
            }
            pageTimerUpdater(convertMs(timeCounter));
        }, this.updateInterval);
    },
}

function onStartButtonClick() {
    timer.start();
}

function pageTimerUpdater({ days, hours, minutes, seconds }) {
    refs.daysSpan.textContent = days;
    refs.hoursSpan.textContent = hours;
    refs.minutesSpan.textContent = minutes;
    refs.secondsSpan.textContent = seconds;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function startButtonDisabled() {
    refs.startButton.disabled = true;
}