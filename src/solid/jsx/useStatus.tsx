import { Accessor, Context as CTX, useContext } from "solid-js";
import { Context } from "../../engine/types";

import { globalSignal } from "elum-state/solid";

type status = "disconnected" | "connected" | "connecting" | "aborted";

const useStatus = (context: CTX<Context>): Accessor<status> => {
    const ctx = useContext(context);
    const state = globalSignal(ctx.status as any);
    return state[0] as Accessor<status>;
};

export default useStatus;
