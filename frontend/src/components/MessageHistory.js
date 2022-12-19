function MessageHistory({ wsMessage }) {
  return (
    <ul>
      {wsMessage.map((message) => (
        <li>{message}</li>
      ))}
    </ul>
  );
}

export default MessageHistory;
