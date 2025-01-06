const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require("./configs/db.config");
const routes = require('./modules/index');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const seedAdmins = require("./seed/adminSeeder");
const bodyParser = require('body-parser');
//Express Server Setup
const app = express();
const port = 5111;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable credentials
};


//Express Middlewares
app.use(express.json({ limit: '500mb' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/uploads', express.static('uploads'))
// Connection URL
//Please dont pass anythign from here its auto config from .env file in db config file
connectDB();
// seedAdmins()
//Server status endpoint
app.get('/', (req, res) => {
    res.send('Server is Up!');
});

// Routes
app.use("/api", routes);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});
