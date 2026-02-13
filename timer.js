export const timerModule = {
    interval: null,
    start(minutes, onTick, onFinish) {
        let seconds = minutes * 60;
        this.interval = setInterval(() => {
            seconds--;
            onTick(seconds);
            if (seconds <= 0) {
                clearInterval(this.interval);
                onFinish();
            }
        }, 1000);
    }
};