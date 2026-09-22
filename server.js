// GP SPORTS HD JAVASCRIPT

const BACKEND_URL = "https://gp-sports-hd.onrender.com";

function showWelcome() {
    alert(
        "Welcome to GP SPORTS HD!\n\n" +
        "Bringing Smiles to the World 🌍⚽"
    );
}

function openSearch() {
    const search = prompt(
        "What sports information are you looking for?"
    );

    if (search) {
        alert(
            "You searched for: " +
            search
        );
    }
}


// ==============================
// LIVE SCORES
// ==============================

async function loadLiveScores() {

    try {

        const response = await fetch(
            `${BACKEND_URL}/api/live`
        );

        const data = await response.json();

        console.log("API-Football data:", data);

        if (!data.response) {
            console.log("No live matches found.");
            return;
        }

        const matches = data.response;

        const scoreBox = document.querySelector(".score-box");

        if (!scoreBox) return;

        scoreBox.innerHTML = `
            <div class="score-header">
                <strong>LIVE MATCHES</strong>
                <span>Updated automatically</span>
            </div>
        `;

        if (matches.length === 0) {

            scoreBox.innerHTML += `
                <div class="match">
                    <div>
                        <strong>No live matches</strong>
                        <br>
                        Check again later.
                    </div>
                </div>
            `;

            return;
        }

        matches.forEach(match => {

            const home =
                match.teams.home.name;

            const away =
                match.teams.away.name;

            const homeScore =
                match.goals.home ?? 0;

            const awayScore =
                match.goals.away ?? 0;

            const minute =
                match.fixture.status.elapsed
                ? match.fixture.status.elapsed + "'"
                : "LIVE";

            scoreBox.innerHTML += `

                <div class="match">

                    <div>
                        <strong>${home}</strong>
                        <br>
                        ${away}
                    </div>

                    <div class="score">
                        ${homeScore} - ${awayScore}
                    </div>

                    <div>
                        <span class="live">
                            ${minute}
                        </span>
                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(
            "Live scores error:",
            error
        );

    }

}


// Load scores when page opens
loadLiveScores();


// Refresh every 60 seconds
setInterval(
    loadLiveScores,
    60000
);


// ==============================
// SYSTEM CLOCK
// ==============================

function updateClock() {

    const now = new Date();

    console.log(
        "GP SPORTS HD:",
        now.toLocaleTimeString()
    );

}

setInterval(updateClock, 1000);
