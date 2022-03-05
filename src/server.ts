
// Local Server or Heroku's Port

const _PORT = process.env.PORT /* Heroku's Port */ || 8080;

// modules here

import typeDefs from './typeDefs';
import resolvers from './resolvers/combineResolvers'
import middleware from './middleware/combineMiddleware';

import { Socket } from 'socket.io';
import { ApolloServer } from 'apollo-server-express';

const app    = require('express')();
const server = require('http').Server(app);
const io     = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
      }
});

const ApolloExpressServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: middleware
});


let users: Array<string> = [];

io.on('connection', ( socket: Socket ) => {
    console.log(`hello world from server, socket id is ${socket.id}`)
    users.push(socket.id);
    console.log(`users: ${users}`)

    socket.on("disconnect", () => {
        users = users.filter(user => user !== socket.id);
        console.log(`user ${socket.id} disconnected`)
        console.log(`current users is ${users}`)
    })
});

server.listen(_PORT, () => {
    console.log(`Server is now listening...`)
})


