import { CTX } from "../types"

function disconnect(this: CTX) {
    this.client.postMessage([0, "disconnect", ""]);
}

export default disconnect;
