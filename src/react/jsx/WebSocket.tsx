import { FC, Context as CTX, HTMLAttributes } from "react";
import { Context } from "../../engine/types";

interface WebSocket extends HTMLAttributes<HTMLDivElement> {
    context: {
        Context: CTX<Context>;
        defaultValue: Context;
    };
}

const WebSocket: FC<WebSocket> = ({ context, children }) => {
    return (
        <context.Context.Provider value={context.defaultValue}>
            {children}
        </context.Context.Provider>
    )
}

export default WebSocket;
