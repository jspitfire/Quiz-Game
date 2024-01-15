//variables for tracking quiz
var currentQuestionIndex = 0;
var timeRemaining = 0;
var timerInterval = 0;
var score = 0;

//HTML const's
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const finalScoreDisplay = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const feedbackContainer = document.getElementById("feedback");
const timeDisplay = document.getElementById("time");

//when start button is clicked, a timer starts and first question appears
function startQuiz() {
    // Hide start screen, show questions container
    startScreen.classList.add("hide");
    questionsContainer.classList.remove("hide");

    // Initialize timer
    timeRemaining = 120; // set time limit // 
    updateTimerDisplay();

    // Set up the timer interval
    timerInterval = setInterval(function () {
        // Decrement the timeRemaining
        timeRemaining--;

        // Update the timer display
        updateTimerDisplay();
        // Check if time is up
        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);

    // Load the first question
    loadQuestion();
}

// Function to load a question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex] // gets the current question from questions.js //
    const choicesContainer = document.getElementById("choices"); // gets the choices container from the index.HTML //;

    // Display the question and choices
    document.getElementById("question-title").textContent = currentQuestion.title;

    // Clear previous choices
    choicesContainer.innerHTML = "";

    // Set the question title and choices in the HTML elements //
    // Create and append choice buttons
    currentQuestion.choices.forEach(function (choice, index) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;

        // Attach event listeners to choices for user selection
        choiceButton.addEventListener("click", function () {
            handleChoice(choice);
        });
        choicesContainer.appendChild(choiceButton);
    });
}

// Function to handle user's choice
function handleChoice(choice) {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the chosen option is correct
    if (choice === currentQuestion.answer) {
        // Update score
        score += 1 //* sets score value *//;
        // Display positive feedback
        showFeedback("Correct answer!");
    } else {
        // When question is incorrect, time is subtracted from the clock
        timeRemaining -= 10 //* sets deducted time *//;
        // Display negative feedback
        showFeedback("Wrong answer!");
    }

    // Display feedback container (if hidden)
    feedbackContainer.classList.remove("hide");

    // Move to the next question or end the quiz
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

//when all questions are answered OR time = 0, then game is over. 
// Function to end the quiz
function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);

    // Hide questions container, show end screen
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");

    // Display final score
    finalScoreDisplay.textContent = score;
}

// Function to update the timer display
function updateTimerDisplay() {
    timeDisplay.textContent = timeRemaining;
}

// Function to show feedback
function showFeedback(message, type) {
    feedbackContainer.textContent = message;
    feedbackContainer.className = "feedback " + type;
}

// Event listener for the "Start Quiz" button
document.getElementById("start").addEventListener("click", startQuiz);

//When game is over then save initials and score
// Event listener for the "Submit" button on the end screen
document.getElementById("submit").addEventListener("click", function () {
    // Get the user's initials from the input
    const userInitials = initialsInput.value.trim();

    // Validation for blank initials 
    if (userInitials === "") {
        alert("Please enter your initials.");
        return;
    }

    // Create an object to represent the user's score and initials
    const userScoreData = {
        initials: userInitials,
        score: score
    };

    
    // Retrieve existing highscores from local storage or initialize an empty array
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Add the user's score data to the highscores array
    highscores.push(userScoreData);

    // Sort highscores in descending order based on the score
    highscores.sort((a, b) => b.score - a.score);

    // Save the updated highscores back to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
     
    // Redirect to the highscores page
     window.location.href = "highscores.html";
})