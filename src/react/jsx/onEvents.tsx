import { useEffect } from "react";
import { CTX, Callback, Events } from "../../engine/types";

function onEvents<E extends Events>(this: CTX, callback: Callback<E, "response">) {
    useEffect(() => {
        this.callbackEvents.add(callback);
        () => this.callbackEvents.delete(callback)
    })
};

export default onEvents;
