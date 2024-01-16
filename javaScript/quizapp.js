// An arry containing questions, option array and the correct answers to the question choosen from the option list//
const quizData = [
    {
        question: "What is the plural of 'child'?",
        options: ["Childs", "Childes", "Children", "Childs'"],
        correctAnswer: "Children"
    },
    {
        question: "Which word is a synonym for 'happy'?",
        options: ["Joyful", "Angry", "Sad", "Tired"],
        correctAnswer: "Joyful"
    },
    {
        question: "What is the opposite of 'brave'?",
        options: ["Fearful", "Cautious", "Bold", "Confident"],
        correctAnswer: "Fearful"
    },
    {
        question: "Which sentence is grammatically correct?",
        options: [
            "I have went to the store yesterday.",
            "I had gone to the store yesterday.",
            "I have gone to the store yesterday.",
            "I go to the store yesterday."
        ],
        correctAnswer: "I had gone to the store yesterday."
    },
    {
        question: "What is the past tense of 'eat'?",
        options: ["Eaten", "Ate", "Eats", "Eating"],
        correctAnswer: "Ate"
    },
    {
        question: "Which is a preposition?",
        options: ["Run", "On", "Jump", "Quickly"],
        correctAnswer: "On"
    },
    {
        question: "What is the plural of 'mouse' (the computer device)?",
        options: ["Mouses", "Mice", "Mice's", "Mousen"],
        correctAnswer: "Mice"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "Which word is a conjunction?",
        options: ["And", "Run", "Blue", "Happy"],
        correctAnswer: "And"
    },
    {
        question: "What is the comparative form of 'good'?",
        options: ["Better", "Best", "Gooder", "Goods"],
        correctAnswer: "Better"
    }
];


// Selectors
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let timeRemaining = 600; //time in seconds (10 minutes)

// writing a function that will start the quiz by requesting that user enter their names before starting the main quiz//
function startQuiz() {
    var userName = document.getElementById("nameInput").value;

    if (userName.trim() === "") {
        alert("Please enter your name to start the quiz.");
        
    } else {
        document.getElementById("start-container").style.display = "none";
        document.getElementById("quiz-container").style.display = "block"
        document.getElementById("welcomeText").style.display = "block"
    }

    showQuestion();
    setInterval(updateTimer, 1000);
    welcomeMessage (userName);
}

//  This function writes a personal message to welcome the user//
function welcomeMessage(userName) {
    const welcomeText = document.getElementById("welcomeText");
    welcomeText.innerText = `Welcome to your quiz, ${userName}.`;
}

// This function load's the quiz one at a time, by displaying the question and options in the arrary//
function showQuestion() {
    questionText.innerText = quizData[currentQuestion].question;

//displays four option buttons//
    for (let i = 0; i < 4; i++) {
        const optionBtn = optionsContainer.children[i];
        optionBtn.innerText = quizData[currentQuestion].options[i];
        optionBtn.disabled = false;
        optionBtn.style.border = "3px solid black";
    }

//hides the next button when the showQuestion function is called//
    nextBtn.classList.add("hide");
    optionsContainer.classList.remove("hide");
    document.getElementById("feedback-container").classList.add("hide");
}

// the function allow the selection and display of a selected option and checks is the answer//
function selectOption(selectedOption) {
    const selectedText = selectedOption.innerText;
    const correctAnswer = quizData[currentQuestion].correctAnswer;
    const feedbackContainer = document.getElementById("feedback-container");

    if (selectedText === correctAnswer) {
        score++;
        feedbackContainer.innerText = "Correct!";
    } else {
        feedbackContainer.innerText = `Incorrect! The correct answer is ${correctAnswer}.`;
    }

    for (let i = 0; i < 4; i++) {
        const optionBtn = document.getElementById("options-container").children[i];
        optionBtn.disabled = true;
        if (optionBtn.innerText === correctAnswer) {
            optionBtn.style.border = "3px solid green";
        } else {
            optionBtn.style.border = "3px solid red";
        }
    }

    feedbackContainer.classList.remove("hide");
    document.getElementById("next-btn").classList.remove("hide");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score}/${quizData.length}</p>`;
}

function updateTimer() {
    const timer = document.getElementById("timer");
    timer.innerText = `Time Remaining: ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`;

    if (timeRemaining === 0) {
        endQuiz();
    } else {
        timeRemaining--;
    }
}

startQuiz();