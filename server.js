const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

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

console.log("WebSocket running");