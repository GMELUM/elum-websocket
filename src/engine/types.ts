export type Events = Record<string, Record<"request" | "response" | string, any>>

export type Data<E extends Events, T extends "request" | "response"> = {
    [K in keyof E]: { event: K, data: E[K][T] }
}[keyof E]

export type Callback<E extends Events, T extends "request" | "response"> = (data: Data<E, T>) => void;

export type CTX = {
    url?: string;
    client: Worker;
    requestID: number;
    callbackEmitter: Map<number, [boolean, Callback<any, "response">]>;
    callbackEvents: Set<Callback<any, "response">>;
}

export type Context = {
    connect: () => void;
    disconnect: () => void;
    terminate: () => void;
    send: {
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"]): Promise<E[K]["response"]>
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"], global?: boolean): Promise<E[K]["response"]>
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"], callback: (data: E[K]["response"]) => void, global?: boolean): void
        <E extends Events, K extends keyof E>(event: K, data: E[K]["request"], callback: (data: E[K]["response"]) => void, global?: boolean): void
    };
    onEvents: <E extends Events>(callback: Callback<E, "response">) => void;
}
