import { Component, Context, JSX, createEffect } from "solid-js";
import { createStore } from "solid-js/store"

interface WebSocket extends JSX.HTMLAttributes<HTMLDivElement> {
    context: Context<any>
};

const WebSocket: Component<WebSocket> = (props) => {

    const [socket, setSocket] = createStore({
        context: props.context.defaultValue
    });

    createEffect(() => {
        setSocket("context", props.context.defaultValue)
    })

    return (
        <props.context.Provider value={socket.context}>
            {props.children}
        </props.context.Provider>
    )

}

export default WebSocket;
