const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Client terhubung");
  clients.add(ws);

  ws.on("message", (message) => {
    console.log(`Menerima pesan: ${message}`);
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Client ${ws.client_id} mengatakan: ${message}`);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client terputus");
    clients.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("Terjadi kesalahan:", error);
    clients.delete(ws);
  });
  ws.client_id = generateUniqueId();
  ws.send(`Selamat datang! ID Anda adalah: ${ws.client_id}`);
});

console.log("Server WebSocket berjalan di port 8080");

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15);
}
