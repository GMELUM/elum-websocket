import * as react from 'react';
import { HTMLAttributes, Context as Context$1, FC } from 'react';

type Events = Record<string, Record<"request" | "response" | string, any>>;
type Data<E extends Events, T extends "request" | "response"> = {
    [K in keyof E]: {
        event: K;
        data: E[K][T];
    };
}[keyof E];
type Callback<E extends Events, T extends "request" | "response"> = (data: Data<E, T>) => void;
type CTX = {
    url?: string;
    client: Worker;
    requestID: number;
    callbackEmitter: Map<number, [boolean, Callback<any, "response">]>;
    callbackEvents: Set<Callback<any, "response">>;
};
type Context = {
    connect: () => void;
    disconnect: () => void;
    terminate: () => void;
    send: {
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"]): Promise<E[K]["response"]>;
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"], global?: boolean): Promise<E[K]["response"]>;
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"], callback: (data: E[K]["response"]) => void, global?: boolean): void;
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"], callback: (data: E[K]["response"]) => void, global?: boolean): void;
    };
    onEvents: <E extends Events>(callback: Callback<E, "response">) => void;
};

interface WebSocket extends HTMLAttributes<HTMLDivElement> {
    context: {
        Context: Context$1<Context>;
        defaultValue: Context;
    };
}
declare const WebSocket: FC<WebSocket>;

declare const useWebSocket: (context: Context$1<Context>) => Context;

declare function connect(this: CTX): void;

declare function disconnect(this: CTX): void;

declare function terminate(this: CTX): void;

declare function send<E extends Events, K extends keyof E>(this: CTX, event: K, data: E[K]["request"]): Promise<E[K]["response"]>;
declare function send<E extends Events, K extends keyof E>(this: CTX, event: K, data: E[K]["request"], global?: boolean): Promise<E[K]["response"]>;
declare function send<E extends Events, K extends keyof E>(this: CTX, event: K, data: E[K]["request"], callback: (data: E[K]["response"]) => void, global?: boolean): void;
declare function send<E extends Events, K extends keyof E>(this: CTX, event: K, data: E[K]["request"], global: true): void;

declare function onEvents<E extends Events>(this: CTX, callback: Callback<E, "response">): void;

type Options = Partial<{
    url: string;
    autoconnect: boolean;
    autoreconnect: boolean;
}>;
declare function init({ url, autoconnect, autoreconnect }: Options): {
    Context: react.Context<Context>;
    defaultValue: {
        connect: typeof connect;
        disconnect: typeof disconnect;
        terminate: typeof terminate;
        send: typeof send;
        onEvents: typeof onEvents;
    };
};

export { WebSocket, init, useWebSocket };
