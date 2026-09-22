// GP SPORTS HD JAVASCRIPT

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
            search +
            "\n\nSearch system will be connected to the database in the next version."
        );
    }
}

function updateClock() {
    const now = new Date();

    console.log(
        "GP SPORTS HD System Time:",
        now.toLocaleTimeString()
    );
}

setInterval(updateClock, 1000);