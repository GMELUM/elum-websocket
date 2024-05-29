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
): Promise<E[K]["response"]>;

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"],
    callback: (data: E[K]["response"]) => void,
): void;

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"]
): void;

function send<
    E extends Events,
    K extends keyof E
>(
    this: CTX,
    event: K,
    data: E[K]["request"],
    callback?: (data: Data<E, "response">) => void
): Promise<Data<E, "response">> | void {

    const ID = ++this.requestID;

    if (typeof callback === "function") {
        console.log("callback")
        this.callbackEmitter.set(ID, callback)
        this.client.postMessage(["send", [ID, event, data]])
        return
    }

    return new Promise<Data<E, "response">>((resolve) => {
        this.callbackEmitter.set(ID, resolve)
        this.client.postMessage(["send", [ID, event, data]])
    })

}

export default send;
