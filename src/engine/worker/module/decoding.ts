import { inflate } from "./pako";

type Decoding = (message: ArrayBuffer) => [number | null, string | null, any | null];

const decoding: Decoding = (message) => {
    try {
        const string = inflate(message, { to: "string" }) as string;
        const [requestId, event, data] = JSON.parse(string);
        return event ? [requestId, event, data] : [null, null, null];
    } catch (error) {
        console.log(error)
        return [null, null, null]
    }
}

export default decoding;
