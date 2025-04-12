// Quiz Data
const quizData = [
  {
    question: "1. What is the first step in addressing problem behavior using ABA principles?",
    options: ["a) Implement punishment procedures", "b) Conduct a functional behavior assessment (FBA)", "c) Begin reinforcement strategies", "d) Ignore the behavior"],
    answer: "b"
  },
  {
    question: "2. Which of the following is an example of an antecedent intervention?",
    options: ["a) Providing praise after desired behavior", "b) Removing a toy when a child screams", "c) Changing the environment to prevent the behavior", "d) Using a token economy system"],
    answer: "c"
  },
  {
    question: "3. What does the term 'extinction' refer to in ABA?",
    options: ["a) Reinforcing a behavior every time it occurs", "b) Ignoring or withholding reinforcement for a previously reinforced behavior", "c) Punishing a behavior to stop it", "d) Teaching a new skill"],
    answer: "b"
  },
  {
    question: "4. Which method of data collection involves recording whether a behavior occurs or does not occur during a specific time interval?",
    options: ["a) Frequency recording", "b) Duration recording", "c) Partial interval recording", "d) Latency recording"],
    answer: "c"
  },
  {
    question: "5. A teacher records the total amount of time a student spends out of their seat during a class period. This is an example of which type of data collection?",
    options: ["a) Frequency", "b) Duration", "c) Latency", "d) Permanent product"],
    answer: "b"
  },
  {
    question: "6. Which of the following is an example of a secondary reinforcer?",
    options: ["a) Food", "b) Water", "c) Praise", "d) Sleep"],
    answer: "c"
  },
  {
    question: "7. What is the difference between positive reinforcement and negative reinforcement?",
    options: ["a) Positive reinforcement increases behavior by adding something; negative reinforcement decreases behavior by removing something", "b) Positive reinforcement decreases behavior; negative reinforcement increases behavior", "c) Positive reinforcement increases behavior by adding something; negative reinforcement increases behavior by removing something", "d) There is no difference"],
    answer: "c"
  },
  {
    question: "8. When implementing a token economy, what is most important to ensure its success?",
    options: ["a) Using tokens sparingly", "b) Pairing tokens with backup reinforcers", "c) Only giving tokens for major accomplishments", "d) Avoiding verbal praise"],
    answer: "b"
  },
  {
    question: "9. What should you do if a client’s family member asks you to share confidential information about the client?",
    options: ["a) Share the information because they are family", "b) Politely decline and explain confidentiality policies", "c) Ask the client for permission before sharing", "d) Ignore the request"],
    answer: "b"
  },
  {
    question: "10. Which teaching method involves breaking a skill into smaller steps and teaching each step one at a time?",
    options: ["a) Discrete trial training (DTT)", "b) Naturalistic teaching", "c) Task analysis", "d) Incidental teaching"],
    answer: "c"
  }
];

let currentQuestionIndex = 0;
let userAnswers = {};
const resultsDiv = document.getElementById('results');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');

// Function to Display Questions
function displayQuestions() {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = ''; // Clear previous questions

  const questionsToShow = quizData.slice(currentQuestionIndex, currentQuestionIndex + 2); // Show 2 questions at a time

  questionsToShow.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <p><strong>${q.question}</strong></p>
      ${q.options.map(option => `
        <label>
          <input type="radio" name="q${currentQuestionIndex + index + 1}" value="${option[0]}">
          ${option}
        </label>
      `).join('')}
    `;
    questionContainer.appendChild(questionDiv);
  });
}

// Event Listener for Submit Button
document.getElementById('submit-btn').addEventListener('click', function () {
  // Save user answers
  const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
  selectedAnswers.forEach(input => {
    userAnswers[input.name] = input.value;
  });

  // Check if all questions in the current set are answered
  const questionsToShow = quizData.slice(currentQuestionIndex, currentQuestionIndex + 2);
  if (Object.keys(userAnswers).length < currentQuestionIndex + questionsToShow.length) {
    alert('Please answer all questions before submitting.');
    return;
  }

  // Move to the next set of questions
  currentQuestionIndex += 2;

  if (currentQuestionIndex >= quizData.length) {
    // End of quiz, show results
    calculateResults();
  } else {
    // Display next set of questions
    displayQuestions();
  }
});

// Function to Calculate Results
function calculateResults() {
  let score = 0;

  quizData.forEach((q, index) => {
    const questionKey = `q${index + 1}`;
    if (userAnswers[questionKey] === q.answer) {
      score++;
    }
  });

  // Display results
  scoreElement.textContent = `You scored ${score} out of ${quizData.length}.`;
  if (score === quizData.length) {
    feedbackElement.textContent = 'Perfect score! You’re ready for the RBT exam.';
  } else if (score >= quizData.length / 2) {
    feedbackElement.textContent = 'Great job! Review your weak areas.';
  } else {
    feedbackElement.textContent = 'Keep practicing! Use tools like [RBT Practice Exam](https://rbtpracticeexam.us).';
  }

  resultsDiv.classList.remove('hidden');
}

// Initialize Quiz
displayQuestions();