document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        { question: 'Which planet is closest to the sun?', answer: 'Mercury' },
        { question: 'How many bones are there in the adult human body?', answer: '206' },
        { question: 'What is the chemical symbol for gold?', answer: 'Au' },
        { question: 'Which is the largest internal organ in the human body?', answer: 'Liver' },
        { question: 'Which metal is liquid at room temperature?', answer: 'Mercury' },
        { question: 'How many continents are there on earth?', answer: '7' },
        { question: 'Which planet is known as the Red Planet?', answer: 'Mars'},
        { question: 'What is the square root of 64?', answer: '8'},
        { question: 'How many sides does a hexagon have?', answer: '6'},
        { question: 'Which ocean is the largest?', answer: 'Pacific Ocean'},
    ];
    let currentCard = 0;
    let score = 0;

    const flashcardElement = document.getElementById('flashcard');
    const frontElement = document.getElementById('question');
    const backElement = document.getElementById('answer');
    const answerInput = document.getElementById('answer-input');
    const submitAnswerBtn = document.getElementById('submit-answer');
    const flipCardBtn = document.getElementById('flip-card');
    const nextCardBtn = document.getElementById('next-card');
    const scoreDisplay = document.getElementById('score-display');
    const feedbackElement = document.getElementById('feedback');
    const finalScoreElement = document.getElementById('final-score');
    const finalScoreText = document.getElementById('final-score-text');
    const restartBtn = document.getElementById('restart');

    // Elements for adding new flashcards
    const newQuestionInput = document.getElementById('new-question');
    const newAnswerInput = document.getElementById('new-answer');
    const addCardBtn = document.getElementById('add-flashcard');
    const addFlashcardForm = document.getElementById('add-flashcard-form');

    function displayCard() {
        if (currentCard < flashcards.length) {
            frontElement.textContent = flashcards[currentCard].question;
            backElement.textContent = flashcards[currentCard].answer;
            answerInput.value = '';
            feedbackElement.textContent = '';
            feedbackElement.style.display = 'block'; // Show feedback during the quiz
            flashcardElement.classList.remove('is-flipped');
            flipCardBtn.disabled = true;
            nextCardBtn.disabled = true;
            scoreDisplay.textContent = `Score: ${score} / ${flashcards.length}`;
        } else {
            
            flashcardElement.style.display = 'none';
            answerInput.style.display = 'none';
            submitAnswerBtn.style.display = 'none';
            flipCardBtn.style.display = 'none';
            nextCardBtn.style.display = 'none';
            feedbackElement.style.display = 'none'; 
            finalScoreElement.style.display = 'block'; 
            finalScoreText.textContent = `Your Final Score: ${score} / ${flashcards.length}`;
        }
    }

    submitAnswerBtn.addEventListener('click', () => {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = flashcards[currentCard].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'correct';
        } else {
            feedbackElement.textContent = 'Wrong!';
            feedbackElement.className = 'wrong';
        }

        flipCardBtn.disabled = false;
        nextCardBtn.disabled = false;
    });

    flipCardBtn.addEventListener('click', () => {
        flashcardElement.classList.toggle('is-flipped');
    });

    nextCardBtn.addEventListener('click', () => {
        currentCard++;
        displayCard();
    });

    restartBtn.addEventListener('click', () => {
        currentCard = 0;
        score = 0;
        flashcardElement.style.display = 'block';
        answerInput.style.display = 'block';
        submitAnswerBtn.style.display = 'block';
        flipCardBtn.style.display = 'block';
        nextCardBtn.style.display = 'block';
        feedbackElement.style.display = 'block'; 
        finalScoreElement.style.display = 'none'; 
        displayCard();
    });

    addCardBtn.addEventListener('click', () => {
        const newQuestion = newQuestionInput.value.trim();
        const newAnswer = newAnswerInput.value.trim();

        if (newQuestion && newAnswer) {
            flashcards.push({ question: newQuestion, answer: newAnswer });
            newQuestionInput.value = '';
            newAnswerInput.value = '';
            alert('Flashcard added successfully!');

            currentCard = flashcards.length - 1; 
            displayCard(); 
        } else {
            alert('Please enter both a question and an answer.');
        }
    });

    displayCard();
});