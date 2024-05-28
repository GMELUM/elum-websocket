import React from "react";
import { Context } from "../../engine/types";

const useWebSocket = (context: React.Context<Context>) => React.useContext(context);

export default useWebSocket;
