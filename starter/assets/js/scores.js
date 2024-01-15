document.addEventListener("DOMContentLoaded", function () {
    // Get the highscores from local storage
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Get the ol element by its id
    const highscoresList = document.getElementById("highscores");

    // Populate the ol element with the highscores
    highscores.forEach(function (scoreData) {
        const li = document.createElement("li");
        li.textContent = `${scoreData.initials}: ${scoreData.score}`;
        highscoresList.appendChild(li);
    });

    // Event listener for the "Clear Highscores" button
    document.getElementById("clear").addEventListener("click", function () {
        // Clear the highscores from local storage
        localStorage.removeItem("highscores");

        // Clear the highscores list in the HTML
        highscoresList.innerHTML = "";
    });
});
