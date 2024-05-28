import { Context as CTX, useContext } from "react";
import { Context } from "../../engine/types";

const useWebSocket = (context: CTX<Context>) => useContext(context);

export default useWebSocket;
