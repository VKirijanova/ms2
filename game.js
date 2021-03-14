const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
  {
    question:
      "If you are diagnosed with Coeliac disease, which protein are you unable to eat?",
    choice1: "Soy",
    choice2: "Gluten",
    choice3: "Lactose",
    choice4: "Pollen",
    answer: 2,
  },
  {
    question: "What type of pasta has a name meaning 'Little Worms'?",
    choice1: "Vermicelli",
    choice2: "Orecchiette",
    choice3: "Calamarata",
    choice4: "Rigatoni",
    answer: 1,
  },
  {
    question: "What type of pastry are profitroles made out of?",
    choice1: "Shortcrust pastry",
    choice2: "Fillo pastry",
    choice3: "Choux pastry",
    choice4: "Puff pastry",
    answer: 3,
  },
  {
    question: "From which flower does a vanilla pod come?",
    choice1: "Orchid",
    choice2: "Calendula",
    choice3: "Rose",
    choice4: "Honeysuckle",
    answer: 1,
  },
  {
    question: "Which nuts are used in marzipan?",
    choice1: "Pistachios",
    choice2: "Walnuts",
    choice3: "Almonds",
    choice4: "Cashews",
    answer: 3,
  },
  {
    question: "What is the best selling flavour of soup in the UK?",
    choice1: "Chicken",
    choice2: "Tomato",
    choice3: "Leek",
    choice4: "Carrot & coriander",
    answer: 2,
  },
  {
    question: "Calamari is a dish made from which animal?",
    choice1: "Octopus",
    choice2: "Prawns",
    choice3: "Chicken",
    choice4: "Squid",
    answer: 4,
  },
  {
    question: "What is the most expensive spice in the world by weight?",
    choice1: "Saffron",
    choice2: "Cumin",
    choice3: "Turmeric",
    choice4: "Cinamon",
    answer: 1,
  },
  {
    question: "How many calories does a glass of water contain?",
    choice1: "25",
    choice2: "0",
    choice3: "400",
    choice4: "5",
    answer: 2,
  },
  {
    question:
      "Which fast-food franchise has the largest number of restaurants in the world?",
    choice1: "Domino's Pizza",
    choice2: "McDonald's",
    choice3: "KFC",
    choice4: "Subway",
    answer: 4,
  },
];

const SCORE_POINT = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINT);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
};

startGame();
