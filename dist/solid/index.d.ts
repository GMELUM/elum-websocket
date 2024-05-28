import * as solid_js from 'solid-js';
import { JSX, Context as Context$1, Component } from 'solid-js';

interface WebSocket extends JSX.HTMLAttributes<HTMLDivElement> {
    context: Context$1<any>;
}
declare const WebSocket: Component<WebSocket>;

type Events = Record<string, Record<"request" | "response" | string, any>>;
type Data<E extends Events, T extends "request" | "response"> = {
    [K in keyof E]: {
        event: K;
        data: E[K][T];
    };
}[keyof E];
type Callback<E extends Events, T extends "request" | "response"> = (data: Data<E, T>) => void;
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

declare const useWebSocket: (context: Context$1<Context>) => Context;

type Options = Partial<{
    url: string;
    autoconnect: boolean;
    autoreconnect: boolean;
}>;
declare function init({ url, autoconnect, autoreconnect }: Options): solid_js.Context<Context>;

export { WebSocket, init, useWebSocket };
