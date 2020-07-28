let restartButton = document.getElementById('restart-btn')
let nextButton = document.getElementById('next-btn')
let questionElement = document.getElementById('question')
let answerButtonsElement = document.getElementById('answer-buttons')

let buttonElement
let questionNumber
let randomSortQuestion

function newGame() {
    restartButton.classList.add('hide')
    nextButton.classList.add('hide')
    randomSortQuestion = questions.sort(() => Math.random() - .5)
    questionNumber = 0
    play()
}

function play() {

    questionElement.classList.remove('right')
    questionElement.classList.remove('wrong')

    if (questionNumber === questions.length) {
        restartGame()
    } else {
        setQuestion(randomSortQuestion[questionNumber])
    }
}

function restartGame() {
    questionElement.innerHTML = "No questions left..."
    nextButton.classList.add('hide')
    restartButton.classList.remove('hide')
    restartButton.addEventListener('click', newGame)
}

function setQuestion(question) {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    nextButton.classList.add('hide')
    buildHTML(question)
}

function buildHTML(question) {
    questionElement.innerHTML = question.question

    question.answers.forEach(answer => {
        buttonElement = document.createElement('button')
        buttonElement.innerText = answer.text

        if (answer.correct) {
            buttonElement.dataset.correct = answer.correct
        }
        answerButtonsElement.appendChild(buttonElement)
        buttonElement.addEventListener('click', selectButton)
    })
}

function selectButton(e) {
    checkAnswer(e.target)
    questionNumber++
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add('hide')
    })
    nextButton.classList.remove('hide')
    nextButton.addEventListener('click', play)
}

function checkAnswer(selectedBtn) {
    if (selectedBtn.dataset.correct) {
        questionElement.classList.add('right')
        questionElement.innerHTML = "You got it right!"
    } else {
        questionElement.classList.add('wrong')
        questionElement.innerHTML = "O nooo, that is wrong!"

    }
}

const questions = [
    {
        question: 'Cinderella was the first Disney princess?',
        answers: [
            { text: 'Yes', correct: false },
            { text: 'No', correct: true },
        ]
    },
    {
        question: 'There are 219 episodes of Friends?',
        answers: [
            { text: 'Yes', correct: false },
            { text: 'No', correct: true },
        ]
    },
    {
        question: 'The unicorn is the national animal of Scotland?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false },
        ]
    }
]

newGame()


