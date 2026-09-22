const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/") {
        res.writeHead(200);
        res.end(JSON.stringify({
            status: "online",
            message: "GP SPORTS HD API is running"
        }));
        return;
    }

    if (req.url === "/api/live") {
        res.writeHead(200);
        res.end(JSON.stringify({
            status: "online",
            message: "Live scores endpoint is working"
        }));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: "Not found"
    }));
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`GP SPORTS HD API running on port ${PORT}`);
});
