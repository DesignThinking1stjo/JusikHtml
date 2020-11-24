const startButtonEasy = document.getElementById('ezquizstart-btn')
const startButtonMed = document.getElementById('medquizstart-btn')
const startButtonExp = document.getElementById('expquizstart-btn')
const nextButton = document.getElementById('next-btn')
const resetButton = document.getElementById('reset-btn')
const questionContainerElement = document.getElementById('question-container')
const knowledgeContainerElement = document.getElementById('knowledge-container')
const nextKnowButton = document.getElementById('nextknowledge-btn')
const resetKnowButton = document.getElementById('resetknowledge-btn')

const knowButtonEasy = document.getElementById('ezknowledgestart-btn')
const knowButtonMed = document.getElementById('medknowledgestart-btn')
const knowButtonExp = document.getElementById('expknowledgestart-btn')

const menuQuestionButton = document.getElementById('menu-question')
const menuKnowledgeButton = document.getElementById('menu-knowledge')
const menuBookmarkButton = document.getElementById('menu-bookmark')

let shuffledQuestions, currentQuestionIndex // 두개는 랜덤 위한 변수들 . let으로 하면 redefined later.
let shuffledKnowledge, currentKnowledgeIndex

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const knowledgeElement = document.getElementById('knowledge')
const knowledgeContents = document.getElementById('knowledge-content')

startButtonEasy.addEventListener('click', StartEasyGame)
startButtonMed.addEventListener('click', StartMedGame)
startButtonExp.addEventListener('click', StartExpGame)

knowButtonEasy.addEventListener('click', StartEasyKnowledge)
knowButtonMed.addEventListener('click', StartMedKnowledge)
knowButtonExp.addEventListener('click', StartExpKnowledge)


nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    SetNextQuestion()
})
resetButton.addEventListener('click', ResetGame)

menuQuestionButton.addEventListener('click', QuestionModeOn)
menuKnowledgeButton.addEventListener('click', KnowledgeModeOn)
menuBookmarkButton.addEventListener('click', BookmarkModeOn)

nextKnowButton.addEventListener('click', () => {
    currentKnowledgeIndex++
    SetNextKnowledge()
})

resetKnowButton.addEventListener('click', ResetKnowledge)

function QuestionModeOn()
{
    //#. Quiz Mode Activate
    ResetGame()

    //#. Knowledge mode disable 
    ResetKnowledge()
    knowButtonEasy.classList.add('hide')
    knowButtonMed.classList.add('hide')
    knowButtonExp.classList.add('hide')
}

function KnowledgeModeOn()
{
    //#. Knowledge mode activate
    ResetKnowledge()

    //#. Quiz Mode disable
    ResetGame()
    startButtonEasy.classList.add('hide')
    startButtonMed.classList.add('hide')
    startButtonExp.classList.add('hide')
}

function BookmarkModeOn()
{

}

function ResetGame() // resetbutton 누를때 실행되는 함수 
{
    currentQuestionIndex = 0
    startButtonEasy.classList.remove('hide') // 난이도 별로 버튼 이제 세개 만들어야 함. 
    startButtonMed.classList.remove('hide')
    startButtonExp.classList.remove('hide')
    nextButton.classList.add('hide')
    resetButton.classList.add('hide')
    questionContainerElement.classList.add('hide')
    ClearStatusClass(document.body)
}

function ResetKnowledge()
{
    currentKnowledgeIndex = 0
    knowButtonEasy.classList.remove('hide')
    knowButtonMed.classList.remove('hide')
    knowButtonExp.classList.remove('hide')
    knowledgeContainerElement.classList.add('hide')
    resetKnowButton.classList.add('hide')
    nextKnowButton.classList.add('hide')

}

function ResetBookmark()
{

}

function StartEasyGame() // Easy
{   // sort는 괄호 안 매개변수로 함수 받음. 함수 없으면 배열 element들 문자열로 취급후 유니코드로 순서 정렬. -> 이 함수는 a,b 두개의 엘레멘트 입력받을 경우 반환값이 0보다 크면 b가 a보다 앞에오고, 0보다 작으면 a가 b보다 앞에 옴. 0이면 a,b 순서 안바꿈.
    startButtonEasy.classList.add('hide') // 시작버튼을 사라지게 해줌. 나중에 세개 버튼 만들어서 난이도 버튼 각각 만들 것.
    startButtonMed.classList.add('hide')
    startButtonExp.classList.add('hide')
    shuffledQuestions = questions_Easy.sort(() => Math.random() - .5) // 음수면 특정한 방법으로 sort. 양수면 다른 방법으로 함. -> Sort things by negative number being one-way and positive being the other way. -> 즉 난수는 0 아래 or 이상 됨. Math.random()하면 0에서 1사이 난수 생성 따라서 거기에 -0.5 해주면 50% 확률로 0보다 낮거나 높거나. 따라서 셔플됨 
    currentQuestionIndex = 0 // shuffle된 questions 배열에서 바로 첫번째 질문 할거니 0으로 대입 
    questionContainerElement.classList.remove('hide') // hide 클래스 제거해줌. 따라서 이 함수 실행되면 나타날 것임.
    SetNextQuestion()

}

function StartMedGame() // Medium
{
    startButtonEasy.classList.add('hide') 
    startButtonMed.classList.add('hide')
    startButtonExp.classList.add('hide')
    shuffledQuestions = questions_Medium.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    SetNextQuestion()
}

function StartExpGame() // Expert
{
    startButtonEasy.classList.add('hide')
    startButtonMed.classList.add('hide')
    startButtonExp.classList.add('hide')
    shuffledQuestions = questions_Expert.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    SetNextQuestion()
}

function StartEasyKnowledge() 
{
    knowButtonEasy.classList.add('hide')
    knowButtonMed.classList.add('hide')
    knowButtonExp.classList.add('hide')
    nextKnowButton.classList.remove('hide')
    shuffledKnowledge = knowledge_Easy.sort(() => Math.random() - .5)
    currentKnowledgeIndex = 0
    knowledgeContainerElement.classList.remove('hide')
    SetNextKnowledge()
}

function StartMedKnowledge() 
{
    knowButtonEasy.classList.add('hide')
    knowButtonMed.classList.add('hide')
    knowButtonExp.classList.add('hide')
    nextKnowButton.classList.remove('hide')
    shuffledKnowledge = knowledge_Medium.sort(() => Math.random() - .5)
    currentKnowledgeIndex = 0
    knowledgeContainerElement.classList.remove('hide')
    SetNextKnowledge()

}

function StartExpKnowledge()
{
    knowButtonEasy.classList.add('hide')
    knowButtonMed.classList.add('hide')
    knowButtonExp.classList.add('hide')
    nextKnowButton.classList.remove('hide')
    shuffledKnowledge = knowledge_Expert.sort(() => Math.random() - .5)
    currentKnowledgeIndex = 0
    knowledgeContainerElement.classList.remove('hide')
    SetNextKnowledge()

}



function SetNextQuestion() { 
    ResetState()
    ShowQuestion(shuffledQuestions[currentQuestionIndex])
}

function SetNextKnowledge()  
{
    ShowKnowledge(shuffledKnowledge[currentKnowledgeIndex])
    // ResetState()
}

function ShowQuestion(question) // question은 questions 배열 쓸 것임.
{
    questionElement.innerText = question.question // questionElement는 getelemenyById 통해서 html에서 question 섹션 불러옴
    question.answers.forEach(answer => { // 화살표 함수: 함수 간단하게 표시한거임. 
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct)
        {
            button.dataset.correct = answer.correct // data attribute를 이 button에 추가해줄것임(dataset). 그리고 정답일때만 이 코드 실행하는 이유는 데이터에 굳이 틀린 답 안넣는게 좋음 왜냐하면 boolean이 아니라 그냥 string이기에 뭐가 맞고 틀린지 판단 힘듬 -> 즉 답 맞을때만 data에 넣어주는게 훨씬 정답 분간 쉬움 
        }
        button.addEventListener('click', SelectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function ShowKnowledge(knowledge) // 여기까지 진행함 ★★
{
    knowledgeElement.innerText = knowledge.knowledge
    knowledgeContents.innerText = knowledge.contents
    if (shuffledKnowledge.length <= currentKnowledgeIndex + 1) // 여기서 출제 개수 조절 
    {
        nextKnowButton.classList.add('hide')
        resetKnowButton.classList.remove('hide')
    }
   
}

function ResetState() //다음문제 넘어가는 함수에서 form이나 질문이나 버튼 등 다 새로 리셋시켜주는 함수 
{
    ClearStatusClass(document.body)
    nextButton.classList.add('hide') // 다음 넘어갔으면 그 다음의 버튼들은 또 hide 되어야함 
    while (answerButtonsElement.firstChild)
    {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function SelectAnswer(e) //event를 파라미터로 사용 
{ 
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    SetStatusClass(document.body, correct) // body의 set the status class.
    Array.from(answerButtonsElement.children).forEach(button => {
        SetStatusClass(button, button.dataset.correct) // dataset의 correct 확인할것임 

    })
    nextButton.classList.remove('hide')
    if (shuffledQuestions.length > currentQuestionIndex + 1) // curQuesIndex는 next버튼 누를때마다 1씩 올라가는데, 이게 현재 있는 문제보다 양이 적으면 계속 진행, 더 많으면 끝났다는거니 문제 재진행.
    {   // 문제 출제 개수 줄이려면 여기서 설정 
        nextButton.classList.remove('hide')
    }
    else
    {
        //  startButtonEasy.classList.remove('hide')
        nextButton.classList.add('hide')
        resetButton.classList.remove('hide')
    }
}

function SetStatusClass(element, correct)
{
    ClearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else
    {
        element.classList.add('wrong')
    }
}

function ClearStatusClass(element)
{
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions_Easy = [  // 자바스크립트 배열 선언 방식 
    {
        question: 'What is 2+2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },

    {
        question: '주식 뜻이 멀까요',
        answers: [
            { text: '응 알아', correct: true },
            {text: '응 몰라~', correct: false}
        ]
    }

]

const questions_Medium = [
    {
        question: '이것은 중급 난이도입니까?',
        answers: [
            { text: '아니요', correct: false },
            { text: '네', correct: true }
        ]
    },

    {
        question: '이것은 중급 난이도가 아니다.',
        answers: [
            { text: '네', correct: false },
            { text: '아니요', correct: true }
        ]
    }
]

const questions_Expert = [
    {
        question: '이것은 상급 난이도입니까?',
        answers: [
            { text: '아니요', correct: false },
            { text: '네', correct: true }
        ]
    },

    {
        question: '이것은 상급 난이도가 아니다.',
        answers: [
            { text: '네', correct: false },
            { text: '아니요', correct: true }
        ]
    }
]

const knowledge_Easy = [
    {
        knowledge: '주식',
        contents: '뭐시기뭐시기'
    },

    {
        knowledge: '이건 지식 이지모드인가?',
        contents: '지식 이지모드다.'
    }

]

const knowledge_Medium = [
    {
        knowledge: 'M법칙',
        contents: '뭐시기뭐시기중급'
    },

    {
        knowledge: '이건 지식 중간모드인가?',
        contents: '지식 중간 난이도 사전 모드다'
    }

]

const knowledge_Expert = [
    {
        knowledge: 'Exp 등가 원리 법칙',
        contents: '뭐시기뭐시기뭐시기'
    },

    {
        knowledge: '이건 지식 하드모드인가?',
        contents: 'HARD'
    }

]