import client from "./module/client";

let localClient: ReturnType<typeof client> | null;

onmessage = (e) => {
    const [event, value] = e.data;
    switch (event) {
        case "init": localClient = client(value); break;
        case "send": localClient && localClient.send(value); break;
        case "connect": localClient && localClient.connect(); break;
        case "disconnect": localClient && localClient.disconnect(); break;
    }
}

export default {} as typeof Worker & { new(): Worker };
