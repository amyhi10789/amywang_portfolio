const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.use(express.static(path.join(__dirname)));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let likeCount = 0;
let comments = [];

wss.on("connection", (ws) => {

    ws.send(JSON.stringify({
        type: "init",
        likes: likeCount,
        comments
    }));

    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        if (data.type === "like") {
            likeCount++;

            broadcast({
                type: "likes",
                likes: likeCount
            });
        }

        if (data.type === "comment") {
            comments.push(data.comment);

            broadcast({
                type: "comments",
                comments
            });
        }
    });

});

function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});