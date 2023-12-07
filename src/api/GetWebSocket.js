let ws;

function getWebSocket(url) {
  if (!ws) {
    ws = new WebSocket(url);
  }
  return ws;
}

export default getWebSocket;
