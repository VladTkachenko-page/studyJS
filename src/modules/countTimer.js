function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60) % 24;
        return { timeRemaining, hours, minutes, seconds };
    }

    function addZero(numberTime) {
        if (numberTime < 10) {
            return '0' + numberTime;
        } else {
            return numberTime;
        }
    }

    function updateClock() {
        const timer =  getTimeRemaining();
        const timerId = setInterval(updateClock, 1000);
        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
        if (timer.timeRemaining > 0) {
            timerId;
        } else if (timer.timeRemaining < 0) {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            clearInterval(timerId);
        }
    }

    updateClock();

}
export default countTimer;