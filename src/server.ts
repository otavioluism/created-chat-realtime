import express from 'express'; 
import "./database";

import routes from './routes';

const app = express(); 

app.use(express.json()); // habilitar o recebimento das requisições pelo body

app.use(routes)

app.listen(3333, () => { 
  console.log('Server running in port 3333!');
});