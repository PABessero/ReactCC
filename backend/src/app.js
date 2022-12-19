import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 5757 });
const reactWss = new WebSocketServer({ port: 5858 });
let computerList = [];
let websockets = {};
wss.on("connection", function connection(ws) {
    let computer;
    let computerUUID = "";
    console.log("New connection from %s", ws.CONNECTING);
    ws.on("message", function incoming(message, isBinary) {
        const json = JSON.parse(message.toString());
        if (json.type === "uuid") {
            computerUUID = json.message;
            computer = { uuid: computerUUID, type: json.computerType };
            websockets[computerUUID] = ws;
            computerList.some((e) => e.uuid === computerUUID)
                ? (computerList = [...computerList])
                : computerList.push(computer);
            console.log(computer);
            console.log("Computer list: %s", JSON.stringify(computerList));
            reactWss.clients.forEach(function each(client) {
                client.send(JSON.stringify({ type: "computerList", message: computerList }));
            });
        }
        console.log(json);
        console.log("received: %s", message);
        reactWss.clients.forEach(function each(client) {
            let sentMessage = computerUUID + ": " + json.message;
            client.send(sentMessage, { binary: isBinary });
        });
    });
    ws.on("close", function close() {
        console.log("Connection closed for %s", computer.uuid);
    });
});
reactWss.on("connection", function connection(ws) {
    console.log("New FRONTEND connection");
    ws.send(JSON.stringify({ type: "computerList", message: computerList }));
    ws.on("message", function incoming(message, isBinary) {
        const json = JSON.parse(message.toString());
        switch (json.type) {
            case "function":
                websockets[json.target].send(message);
                break;
        }
    });
});
//# sourceMappingURL=app.js.map