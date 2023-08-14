require("dotenv").config();
const express = require("express");
const connectToDB=require("./database/db")
const ErrorsMiddleware = require("./middleware/errorMiddleware");
const LibraryError = require("./utils/libraryError");

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);

    process.exit(1);
});


const app = express()

connectToDB();

app.use(express.json())

const PORT=process.env.PORT || 5000

app.get('/test', (req, res) => {
    res.json({
        Hi: "Welcome to the NEW MERN API",
    });
});

app.all("*", (req, res, next) => {
    next(
        new LibraryError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
});
app.use(ErrorsMiddleware);


const server = app.listen(PORT, 
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});
