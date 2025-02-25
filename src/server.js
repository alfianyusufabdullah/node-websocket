const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('Client terhubung');

  ws.on('message', message => {
    console.log(`Menerima pesan: ${message}`);
    ws.send(`Server menerima pesan: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client terputus');
  });

  ws.on('error', error => {
    console.error('Terjadi kesalahan:', error);
  });
});

console.log('Server WebSocket berjalan di port 8080');