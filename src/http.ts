import express from 'express'; 
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import "./database";

import routes from './routes';

const app = express(); 

// estrutura para abrir arquivo JS
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// rota para abrir o arquivo html
app.get('/pages/client', (request, response) => { 
  return response.render('html/client.html');
})


const http = createServer(app); // Criando um protocolo http
const io = new Server(http);  // Criando protocolo Websocket

io.on('connection', (socket: Socket) => { 
  //console.log("Se conectou", socket.id);
});

app.use(express.json()); // habilitar o recebimento das requisições pelo body

app.use(routes);

export { http, io };