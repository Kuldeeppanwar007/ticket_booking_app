require('dotenv').config();
let cors = require('cors');
const createError = require('http-errors');
const express = require('express');



const app = express();
app.use(cors({origin : "*",}));
const port = process.env.PORT || 5000;
app.use(express.json())


const router = require('./src/routes/Router');

// All routes
app.use("/api", router);


//  home route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to ticket booking app." });
})


//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})