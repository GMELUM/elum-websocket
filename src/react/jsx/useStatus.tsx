import { Context as CTX, useContext } from "solid-js";
import { Context } from "../../engine/types";

import { useGlobalValue } from "elum-state/react"

type status = "disconnected" | "connected" | "connecting" | "aborted";

const useStatus = (context: CTX<Context>): status => {
    const ctx = useContext(context);
    return useGlobalValue(ctx.status as any) as status;
};

export default useStatus;
