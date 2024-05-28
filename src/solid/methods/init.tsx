import { createContext } from "solid-js";

import CreateWorker from "../../engine/worker/index.worker?worker&inline";

import { CTX, Callback, Context } from "../../engine/types";

import connect from "../../engine/methods/connect";
import disconnect from "../../engine/methods/disconnect";
import terminate from "../../engine/methods/terminate";
import send from "../../engine/methods/send";
import onEvents from "../jsx/onEvents";

type Options = Partial<{
    url: string;
    autoconnect: boolean;
    autoreconnect: boolean;
}>

function init({
    url = undefined,
    autoconnect = true,
    autoreconnect = true
}: Options) {

    const context: CTX = {
        url: url,
        client: new CreateWorker(),
        requestID: 0,
        callbackEmitter: new Map<number, [boolean, Callback<any, "response">]>(),
        callbackEvents: new Set<Callback<any, "response">>()
    }

    context.client.onmessage = (e: MessageEvent<any>) => {
        const [requestId, event, value] = e.data;
        const emmiter = context.callbackEmitter.get(requestId);
        if (!emmiter || emmiter[0]) {
            for (const clb of context.callbackEvents) {
                clb({ event: event, data: value })
            }
            if (emmiter && emmiter[1]) {
                context.callbackEmitter.delete(requestId)
            }
            return
        }
        emmiter[1](value);
    }

    if (url && autoconnect) {
        context.client.postMessage(["init", url, 0])
    }

    return createContext<Context>({
        connect: connect.bind(context) as typeof connect,
        disconnect: disconnect.bind(context) as typeof disconnect,
        terminate: terminate.bind(context) as typeof terminate,
        send: send.bind(context) as typeof send,
        onEvents: onEvents.bind(context) as typeof onEvents,
    })

}

export default init;
