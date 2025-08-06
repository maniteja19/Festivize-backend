require("dotenv").config();
const express = require("express");
const cors = require('cors');
const expenditureRouter = require('./routes/expenditureRoutes')
const receivedItemRouter = require('./routes/receivedItemsRoutes')
const authRouter = require('./routes/authRoutes')
const homeRouter = require('./routes/homeRoutes')
const yearRouter = require('./routes/yearRoutes')
const app = express();

//database connection
const db = require("./database/db");
db();

//middleware
app.use(express.json());
app.use(cors());
//routes
app.use('/',receivedItemRouter)
app.use('/',expenditureRouter);
app.use('/',authRouter)
app.use('/',homeRouter)
app.use('/',yearRouter) 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
