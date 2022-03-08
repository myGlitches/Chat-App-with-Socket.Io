const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

app.use(cors ())
const server = http.createServer(app)

// Backend Server Port
const PORT = 5000 || process.env.PORT 

// Frontend Port
const REACT_PORT = 3000 || process.env.REACT_PORT


const io = new Server(server, {
    cors: {
        origin: `http://localhost:${REACT_PORT}`,
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) =>{
    console.log(`User Connected:  ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User ID : ${socket.id} joined room ${data}`)
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`)
    })
})

// Server
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})