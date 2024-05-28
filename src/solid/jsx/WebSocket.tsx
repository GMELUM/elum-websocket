import { Component, Context, JSX } from "solid-js";

interface WebSocket extends JSX.HTMLAttributes<HTMLDivElement> {
    context: Context<any>
};

const WebSocket: Component<WebSocket> = (props) => (
    <props.context.Provider value={props.context.defaultValue}>
        {props.children}
    </props.context.Provider>
)

export default WebSocket;
