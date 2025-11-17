const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', (socket) => {
  console.log('Usuário conectado');

 


  // 🔹 RECEBE o nome do usuário que acabou de entrar
  socket.on('novo usuario', (nome) => {
    console.log(`Novo usuário: ${nome}`);

    // 🔹 Envia para TODOS (menos para o próprio usuário)
    socket.broadcast.emit('usuario entrou', nome);
  });

  // Evento de mensagem do chat
  socket.on('chat message', (data) => io.emit('chat message', data));

  socket.on('disconnect', () => console.log('Usuário desconectado'));
});

http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://localhost:3000`);
});
