const http = require("http");

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_FOOTBALL_KEY;

const server = http.createServer(async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    console.log("Request received:", req.url);

    if (req.url === "/api/live") {

        if (!API_KEY) {
            res.writeHead(500);
            res.end(JSON.stringify({
                error: "API_FOOTBALL_KEY is missing"
            }));
            return;
        }

        try {

            const response = await fetch(
                "https://v3.football.api-sports.io/fixtures?live=all",
                {
                    headers: {
                        "x-apisports-key": API_KEY
                    }
                }
            );

            const data = await response.json();

            res.writeHead(response.status);
            res.end(JSON.stringify(data));

        } catch (error) {

            console.error("API error:", error);

            res.writeHead(500);
            res.end(JSON.stringify({
                error: "Failed to fetch live scores",
                details: error.message
            }));
        }

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
