declare module 'web-worker:*' {
    const workerConstructor: {
        new(): Worker
    }
    export default workerConstructor
}

type Data = Uint8Array | ArrayBuffer;

type StrategyValues = 1 | 2 | 3 | 4 | 0;

interface InflateFunctionOptions {
    windowBits?: number | undefined;
    raw?: boolean | undefined;
    to?: "string" | undefined;
}

interface DeflateFunctionOptions {
    level?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
    windowBits?: number | undefined;
    memLevel?: number | undefined;
    strategy?: StrategyValues | undefined;
    dictionary?: any;
    raw?: boolean | undefined;
}

declare module '*/pako' {
    function inflate(data: Data, options: InflateFunctionOptions & { to: "string" }): string;
    function inflate(data: Data, options?: InflateFunctionOptions): Uint8Array;
    function deflate(data: Data | string, options?: DeflateFunctionOptions): Uint8Array;
}

declare module 'rollup-plugin-web-worker-loader';