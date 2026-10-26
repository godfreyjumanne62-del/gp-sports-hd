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

 
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("league-select");
  const input = document.getElementById("watch-video-url");
  const frame = document.getElementById("watch-frame");
  const message = document.getElementById("watch-message");
  const playButton = document.getElementById("watch-play-button");

  if (!select || !input || !frame || !message || !playButton) {
    console.error("Watch Live: HTML elements are missing.");
    return;
  }

  playButton.addEventListener("click", function () {
    try {
      const url = new URL(input.value.trim());
      const host = url.hostname.toLowerCase();
      let id = "";

      if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host)) {
        if (url.pathname === "/watch") {
          id = url.searchParams.get("v") || "";
        } else if (/^\/(embed|live)\/[A-Za-z0-9_-]{11}/.test(url.pathname)) {
          id = url.pathname.split("/")[2] || "";
        }
      } else if (["youtu.be", "www.youtu.be"].includes(host)) {
        id = url.pathname.slice(1);
      }

      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
        throw new Error("Invalid video link");
      }

      frame.src = "https://www.youtube.com/embed/" + id;
      message.textContent =
        "Video imepakiwa. Ikiwa mmiliki anaruhusu embedding, itacheza hapa.";
    } catch (error) {
      frame.src = "about:blank";
      message.textContent =
        "Kiungo si sahihi. Tumia kiungo cha video ya YouTube, si ukurasa wa kawaida wa ligi.";
    }
  });
});

// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const leagueSelect = document.getElementById("league-select");
    const watchFrame = document.getElementById("watch-frame");
    const watchMessage = document.getElementById("watch-message");
    const officialLink = document.getElementById("watch-official-link");

    // Official broadcaster or competition websites.
    // These are links, not confirmed live-stream embed URLs.
    const watchSources = {
        epl: {
            name: "Premier League",
            url: "https://www.premierleague.com/"
        },
        ucl: {
            name: "UEFA Champions League",
            url: "https://www.uefa.com/uefachampionsleague/"
        },
        nbc: {
            name: "NBC Premier League Tanzania",
            url: "https://www.azamtv.com/"
        },
        bundesliga: {
            name: "Bundesliga",
            url: "https://www.bundesliga.com/"
        },
        laliga: {
            name: "La Liga",
            url: "https://www.laliga.com/"
        },
        seriea: {
            name: "Serie A",
            url: "https://www.legaseriea.it/"
        },
        ligue1: {
            name: "Ligue 1",
            url: "https://ligue1.com/"
        },
        efootball: {
            name: "eFootball",
            url: "https://www.konami.com/efootball/"
        }
    };

    if (!leagueSelect || !watchFrame || !watchMessage || !officialLink) {
        console.warn(
            "Watch Live section: Check the HTML element IDs."
        );
        return;
    }

    leagueSelect.addEventListener("change", function () {
        const selected = watchSources[this.value];

        // Clear any previously selected stream
        watchFrame.src = "about:blank";
        watchFrame.hidden = true;
        watchMessage.hidden = false;
        officialLink.innerHTML = "";

        if (!selected) {
            watchMessage.innerHTML = `
                <span class="play-symbol">▶</span>
                <h3>Choose a competition</h3>
                <p>Select a league to find its official website.</p>
            `;
            return;
        }

        watchMessage.innerHTML = `
            <span class="play-symbol">▶</span>
            <h3>${selected.name}</h3>
            <p>A live stream has not been connected yet.</p>
            <p>Use the official website link below to check viewing options.</p>
        `;

        const link = document.createElement("a");
        link.href = selected.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open official website ↗";

        officialLink.appendChild(link);
    });
});
