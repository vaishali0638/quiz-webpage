const questions = [
    {
        question : " which is the largest animal in the world?",
        answers: [
            { Text: " shark ", correct : false},
            { Text: " blue whale ", correct : true},
            { Text: " elephant ", correct : false},
            { Text: " girafee ", correct : false},
        ]
    },
    {
        question : " which is the largest desert in the world?",
        answers : [
            { Text: " kalahari ", correct : false},
            { Text: "  gobi ", correct : false},
            { Text: "  sahara", correct : false},
            { Text: " antartica ", correct : true},
        ]
    },
    {
        question : " which is the largest continent in the world?",
        answers : [
            { Text: "asia  ", correct : true},
            { Text: "antartica", correct : false},
            { Text: "africa ", correct : false},
            { Text: "arctic  ", correct : false},
        ]
    },
    {
        question : " which is the smallest country  in the world?",
        answers : [
            { Text: " vatican city ", correct : false},
            { Text: "bhutan  ", correct : true},
            { Text: " nepal ", correct : false},
            { Text: "sri lanka  ", correct : false},
        ]
    }
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton . innerHTML = "next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion . question;

    currentQuestion.answers.forEach(answer=> {
        const button = document . createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState()
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect)
    {
        selectedbtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>
    {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}
function showScore()
{
    resetState();
    questionElement.innerHTML = `your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex< questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz ();
