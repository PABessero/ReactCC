import MessageHistory from "./MessageHistory";
import { useEffect } from "react";

const client = new WebSocket("ws://127.0.0.1:5858");

function Socket({
  wsMessage,
  updateWsMessage,
  computerList,
  updateComputerList,
}) {
  useEffect(() => console.log(computerList), [computerList]);
  useEffect(() => {
    document.title = `CC: ${computerList.length} assets connected`;
  }, [computerList]);

  client.onopen = () => {
    console.log("Websocket client connected");
  };
  client.onmessage = (message) => {
    try {
      message = JSON.parse(message.data);
      switch (message.type) {
        case "computerList":
          console.log(message.message);
          updateComputerList(message.message);
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
      console.log(message.data);
      updateWsMessage([...wsMessage, message.data]);
    }
  };
  return (
    <div>
      <h2>Message History</h2>
      <form action="" onSubmit={(e) => sendMessage(e)}>
        <select name="target">
          {computerList.map((computer) => (
            <option key={computer.uuid} id={computer.uuid}>
              {computer.uuid}
            </option>
          ))}
        </select>{" "}
        <input name="message" />
        <button type="submit">Submit</button>
      </form>
      <MessageHistory wsMessage={wsMessage} />
    </div>
  );

  function sendMessage(e) {
    e.preventDefault();
    const message = e.target["message"].value;
    console.log("Message: %s", message);
    const target = e.target["target"].value;
    console.log("Target: %s", target);
    client.send(
      JSON.stringify({ target: target, message: message, type: "function" })
    );
  }
}

export default Socket;
