const questions = [
    {
        question: "What is the capital of Sweden",
        Options : ["Paris", "Oslo", "London", "Stockholm"],
        answer : "Stockholm"
    },
    {
        question: "How many movies are the Lord of the rings?",
        Options : ["1", "3", "4", "6"],
        answer : "3"
    },
    {
        question: "How many states do USA have?",
        Options : ["48", "54", "50", "52"],
        answer : "50"
    },
    {
        question: "When did the second world war started?",
        Options : ["1936", "1939", "1940", "1945"],
        answer : "1939"
    },
    {
        question: "Who is the president of United states?",
        Options : ["Donald Trump", "JD Vance", "Joe Biden", "Kamela Harris"],
        answer : "Donald Trump"
    },
    {
        question: "When did Facebook start?",
        Options : ["2003", "2006", "2005", "2004"],
        answer: "2004"
    },
    {
        question : "When did the Titanic sink?",
        Options : ["1900", "1911", "1912", "1927"],
        answer : "1911"
    },
    {
        question : "What company have Elon Musk not started?",
        Options : ["PayPal", "Tesla", "META", "Starlink"],
        answer : "META"
    },
    {
        question : "Who is the painter of Mona Lisa?",
        Options : ["Leonardo Da Vinci", "Van Gogh", "Michelangelo", "Rembrandt"],
        answer : "Leonardo Da Vinci"
    },
    {
        question : "In what country can you find Chernobyl?",
        Options : ["Russia", "Poland", "Ukraine", "Belarus"],
        answer : "Ukraine"
    }

];

let CurrentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector(".question");
const optionElement = document.querySelector(".options");
const nextButton = document.querySelector(".next-button");
const scoreContainer = document.querySelector(".score-container");

function startQuiz() {
    CurrentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = "none";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let CurrentQuestion = questions[CurrentQuestionIndex];
    questionElement.textContent = CurrentQuestion.question;

    CurrentQuestion.Options.forEach(Option => {
        const button = document.createElement("button");
        button.textContent = Option;
        button.classList.add("option-button");
        button.addEventListener("click", () => selectAnswer(Option, button));

        const li = document.createElement("l1");
        li.appendChild(button);
        optionElement.appendChild(li);
    });
}

function resetState() {
    while (optionElement.firstChild) {
        optionElement.removeChild(optionElement.firstChild);
    }
}

function selectAnswer(selectedOption, clickedButton) {
    const correctAnswer = questions[CurrentQuestionIndex].answer;
    const buttons = document.querySelectorAll(".option-button");
    if (Array.from(buttons).some(btn => btn.disable)) return;

    if( selectedOption === correctAnswer) {
        // clickedButton.classList.add("correct");
        score++;
    } 
    // else {
    //     clickedButton.classList.add("wrong");
    //     buttons.forEach(btn => {
    //         if (btn.textContent === correctAnswer) {
    //             btn.classList.add("correct");
    //         }
    //     });
    // }
    if(selectedOption){
        clickedButton.classList.add("choosedAnswer")
    };
    
    buttons.forEach(btn => btn.disable = true);
    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    CurrentQuestionIndex++;
    if (CurrentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.textContent = "Quiz Finished!";
    scoreContainer.style.display = "block";
    scoreContainer.querySelector("P").textContent = `${score}/${questions.length}`;
    nextButton.style.display = "none";

    const playAgainBtn = scoreContainer.querySelector("next-button");
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.onclick = startQuiz;
}

startQuiz();