import {
    CTX,
    Data,
    Events,

} from "../types"

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"]
): Promise<E[K]["response"]>;

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"],
    global?: boolean
): Promise<E[K]["response"]>;

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"],
    callback: (data: E[K]["response"]) => void,
    global?: boolean
): void;

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"],
    global: true
): void;

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"],
    callback?: ((data: Data<E, "response">) => void) | boolean,
    global: boolean = false
): Promise<Data<E, "response">> | void {

    if (typeof callback === "boolean" && callback) {
        this.client.postMessage(["send", [0, event, data]])
        return
    }

    const ID = ++this.requestID;

    if (typeof callback === "function") {
        console.log("callback")
        this.callbackEmitter.set(ID, [global, callback])
        this.client.postMessage(["send", [ID, event, data]])
        return
    }

    return new Promise<Data<E, "response">>((resolve) => {
        this.callbackEmitter.set(ID, [global, resolve])
        this.client.postMessage(["send", [ID, event, data]])
    })

}

export default send;
