import React from "react";
import { Context } from "../../engine/types";

interface WebSocket extends React.HTMLAttributes<HTMLDivElement> {
    context: {
        Context: React.Context<Context>;
        defaultValue: Context;
    };
}

const WebSocket: React.FC<WebSocket> = ({ context, children }) => {
    return (
        <context.Context.Provider value={context.defaultValue}>
            {children}
        </context.Context.Provider>
    )
}

export default WebSocket;
