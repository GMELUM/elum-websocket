import { CTX } from "../types"

function connect(this: CTX) {
    this.client.postMessage([0, "connect", ""]);
}

export default connect;
