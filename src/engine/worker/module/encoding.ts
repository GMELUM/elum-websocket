import { deflate } from "./pako";

type Encoding = (message: [number | null, string | null, any | null] | object[]) => Uint8Array | undefined;

const encoding: Encoding = (message) => {
    try {
        const string = JSON.stringify(message);
        return deflate(string);
    } catch { return new TextEncoder().encode("") }
}

export default encoding;
