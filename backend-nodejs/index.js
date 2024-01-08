// swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const path = require("path");
// end swagger
const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const borrowingRoutes = require("./routes/borrowing");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const saveRoutes = require("./routes/save");
const historyRoutes = require("./routes/history");
const mongoose = require("mongoose");
const socket = require("socket.io");
const app = express();
const interrupt = require("./auth/interupt");
const winston = require("winston");
require('dotenv').config();
const {initialUsers, initialBooks} = require("./mongodb/initialDatabase")


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源的请求
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 允许的请求方法
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // 允许的请求头
    next();
});
app.use(cors());

app.use(interrupt);
app.use(express.json());
app.use('/book', bookRoutes);
app.use('/user', userRoutes);
app.use('/borrowing', borrowingRoutes);
app.use('/message', messageRoutes);
app.use('/comment', commentRoutes);
app.use('/save', saveRoutes);
app.use('/history', historyRoutes);

// swagger
const options = {
    apis: ['./routes/user.js'],
    definition: {
        openapi: "1.0.0",
        info: {
            title: "项目名称",
            version: "1.0.0",
            description: `By DI XU`,
        },
    },
};
const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec));
// end swagger

const server = app.listen(process.env.PORT, () => {
        console.log(`Server started on ${process.env.PORT}`);
    }
);

// socket
const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
global.onlineUsers = new Map();
io.on('connection', (socket) => {
    winston.error('A user connected');
    socket.on('message', (data) => {
        console.log('Message from client:', data);
        io.emit('message', data);
    });
    socket.on('disconnect', () => {
        winston.info('A user disconnected');
    });
});

mongoose.connect(process.env.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        winston.info("Connect MongoDB Successfully");
    })
    .catch((err) => {
        winston.error("Connect MongoDB Failed, " ,err.message);
    });


initialUsers().then(r => null);
initialBooks().then(r => null);
module.exports = app;
