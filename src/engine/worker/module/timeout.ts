function timeout() {
    let timeoutIndexMax: number = 5;
    let timeoutIndex: number = 0;
    let timeout: NodeJS.Timeout | null = null;

    const timeoutDelay = () => [1000, 2000, 5000, 10000][timeoutIndex] || 10000;
    const isError = () => timeoutIndex >= timeoutIndexMax;

    const closeTimeout = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeoutIndex = 0;
        timeout = null;
    };

    const startTimeout = (callback: () => void, error: () => void) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = null;
        timeout = setTimeout(() => {
            timeoutIndex += 1;
            isError() ? error() : callback();
        }, timeoutDelay());
    };

    return {
        closeTimeout,
        startTimeout
    };
}

export default timeout;
