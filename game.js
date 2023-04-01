const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
  {
    question: '–45 + 49',
    choice1:'-94',
    choice2:'-4',
    choice3:'4',
    choice4:'94',
    answer:3,
  },
  {
    question: '–7 – (–11)',
    choice1:'-18',
    choice2:'-4',
    choice3:'12',
    choice4:'4',
    answer:4,
  },
  {
    question: '(–1 – 11)(13 – 5)',
    choice1:'-96',
    choice2:'-80',
    choice3:'0',
    choice4:'80',
    answer:1,
  },
  {
    question: 'Which of the following expressions results in a positive value?',
    choice1:'-12+(-6)',
    choice2:'12+(-6)',
    choice3:'12+6',
    choice4:'-12+6',
    answer:1,
  },
  {
    question: 'Which of the following expressions results in a negative value?',
    choice1:'2-(-6)',
    choice2:'-2(-6)',
    choice3:'2-6',
    choice4:'-2+(-6)',
    answer:3,
  },
  {
    question: 'Which of the following expressions results in a positive value?',
    choice1:'(1-3)(1-5)(1-7)(1-11)',
    choice2:'(3-3)(4-5)(6-7)',
    choice3:'(5-6)(2-3)(7-8)(1-2)',
    choice4:'(4-3)(6-7)(8-3)',
    answer:1,
  },
  {
    question: 'Which one of the following equations is true?',
    choice1:'-18-5+3=-10',
    choice2:'-18-5-3=-26',
    choice3:'-18+5-3=-20',
    choice4:'18-5+3=-15',
    answer:3,
  },
  {
    question: 'Which of the following statements is always true?',
    choice1:'Two negatives make a positive.',
    choice2:'Dividing two negatives makes a positive.',
    choice3:'Subtracting two negatives makes a positive.',
    choice4:'All of the answers are true',
    answer:2,
  },
  {
    question: 'Which of the following expressions has the same value as (–3) 4?',
    choice1:'(27)(–3)',
    choice2:'(27)2',
    choice3:'(–9)2',
    choice4:'(–6)2',
    answer:3,
  },
  {
    question: '–8 ÷ 2 × 5 – (6)(–3)',
    choice1:'-2',
    choice2:'-38',
    choice3:'-35',
    choice4:'-40',
    answer:1,
  }  ,
  {
    question: 'Which of the following expressions has the greatest value?',
    choice1:'(–5)4',
    choice2:'(–3)3',
    choice3:'(–2)4',
    choice4:'(–1)28',
    answer:3,
  },
  {
    question: 'Which of the following expressions has a negative value as its result?',
    choice1:'3+5+7',
    choice2:'3–5–7',
    choice3:'–3–(–5)–(–7)',
    choice4:'3–5–(–7)',
    answer:2,
  },
  {
    question: '(-20)+(15)-(13)',
    choice1:'23',
    choice2:'22',
    choice3:'24',
    choice4:'-22',
    answer:2,
  },
  {
    question: '– 64 ÷ 8',
    choice1:'8',
    choice2:'-8',
    choice3:'10',
    choice4:'-9',
    answer:2,
  },
  {
    question: '– 4 x (– 11)',
    choice1:'-44',
    choice2:'44',
    choice3:'40',
    choice4:'+-44',
    answer:2,
  }
]
const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () =>{
  questionCounter = 0
  score = 0
  availableQuestions =[...questions]
  getNewQuestion()
}

getNewQuestion = () =>{
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign("endp.html")
  }
questionCounter++
progressText.innerText= `Question ${questionCounter} of  ${MAX_QUESTIONS}`
progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS) *100}%`

const questionsIndex = Math.floor(Math.random() *availableQuestion.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
  const number = choice.dataset['number']
  choice.innerText = currentQuestion['choice' + number]
})
availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
}
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers)return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct'){
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() =>{
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})
incrementScore= num =>{
  score +=num
  scoreText.innerText = score
}
startGame()
