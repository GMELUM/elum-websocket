import decoding from "./decoding";
import encoding from "./encoding";
import createTimeout from "./timeout";

enum Status {
    OPEN,
    CLOSE,
    ABORT,
    USER_CLOSED
}

type State = {
    client?: WebSocket;
    status: Status;
    lastMessage: number;
}

function client(url: string) {

    const { closeTimeout, startTimeout } = createTimeout();

    const state: State = {
        status: Status.CLOSE,
        lastMessage: Date.now(),
    };

    setInterval(() => {
        if (state.client && [1].includes(state.client.readyState)) {
            const diff = Date.now() - state.lastMessage;

            if (diff > 30000) {
                if (state.client) {
                    state.status = Status.CLOSE;
                    state.client.close();
                    postMessage([0, "disconnected", ""]);
                }
                state.lastMessage = state.lastMessage + 5000;
                return
            }

            if (diff > 15000) {
                send([0, "ping", ""])
                state.lastMessage = state.lastMessage + 5000;
                return
            }
        }
    }, 1000);

    const initSocket = () => {
        postMessage([0, "connecting", ""]);
        state.client = new WebSocket(url);
        state.client.binaryType = "arraybuffer";
        state.client.onopen = handlerOpen;
        state.client.onclose = handlerClose;
        state.client.onmessage = handlerMessage;
    };

    const handlerOpen = () => {
        postMessage([0, "connected", ""]);
        state.status = Status.OPEN;
        closeTimeout();
    };

    const handlerClose = () => {
        state.status = Status.CLOSE;
        postMessage([0, "disconnected", ""]);

        startTimeout(
            () => { initSocket(); },
            () => {
                closeTimeout();
                state.status = Status.ABORT;
                postMessage([0, "aborted", ""])
            }
        );
    };

    const handlerMessage = (e: MessageEvent<any>) => {
        const msg = decoding(e.data);
        if (msg[1] === "pong") {
            state.lastMessage = Date.now();
            return;
        }
        state.lastMessage = Date.now();
        postMessage(msg);
    };

    const send = ([id, event, value]: [number, string, unknown]) => {
        if (state.client && state.client.readyState === 1) {
            const message = encoding([id, event, value]);
            if (message) {
                state.client.send(message);
            }
        }
    };

    const connect = () => {
        initSocket();
    };

    const disconnect = () => {
        closeTimeout();
    };

    initSocket()

    return {
        send,
        connect,
        disconnect
    };

}

export default client;
