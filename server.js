import http from 'http'
import app from './app.js';
let PORT=5000;
let server=http.createServer(app);

server.listen(PORT,()=>console.log(`Server is on ${PORT}`));