document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-btn");
  const nextButton = document.getElementById("next-container");
  const questionContainerElement =
    document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const emailContainer = document.getElementById("email-container");
  const submitButton = document.getElementById("submit-btn");
  const emailInput = document.getElementById("email-input");

  let shuffledQuestions, currentQuestionIndex, score;

  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "Who is the CEO of Tesla?",
      answers: [
        { text: "Elon Musk", correct: true },
        { text: "Jeff Bezos", correct: false },
        { text: "Bill Gates", correct: false },
        { text: "Tony Stark", correct: false },
      ],
    },
    {
      question: "What is 2 + 2?",
      answers: [
        { text: "4", correct: true },
        { text: "22", correct: false },
      ],
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Saturn", correct: false },
        { text: "Mars", correct: false },
      ],
    },
  ];

  submitButton.addEventListener("click", () => {
    const email = emailInput.value;
    if (email) {
      alert(`Your score is ${score}. An email will be sent to ${email}.`);
      // Here you would add the code to send the email
      // For example, send the email using an API or a backend service
    } else {
      alert("Please enter a valid email.");
    }
  });

  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
  });

  function startQuiz() {
    startButton.classList.add("d-none");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove("d-none");
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn", "btn-outline-dark", "mb-2");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }

  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("d-none");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
      score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("d-none");
    } else {
      startButton.innerText = "Restart";
      startButton.classList.remove("d-none");
      showEmailInput();
    }
  }

  function showEmailInput() {
    questionContainerElement.classList.add("d-none");
    emailContainer.classList.remove("d-none");
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("btn-success");
    } else {
      element.classList.add("btn-danger");
    }
  }

  function clearStatusClass(element) {
    element.classList.remove("btn-success");
    element.classList.remove("btn-danger");
  }
});
