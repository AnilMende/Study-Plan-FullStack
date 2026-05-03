import express from "express";

const app = express();

const PORT = 6000;

app.get("/api/test-api", (req,res) => {
    res.send("Server is up and running")
});

app.listen(() => console.log(`Server started running at PORT${PORT}`));