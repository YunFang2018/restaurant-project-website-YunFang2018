/* Global variables just for easy practice */

// An array of objects containing questions and answers
questions = [
{
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language."
},
{
    question: "Give the selector and rule to color all paragraph text blue.",
    answer: "p {color: blue;}"
},
{
    question: "How are heading elements similar and different from the header element?",
    answer: "the header element is a container and can contain multiple elements. In addition it is good and commont practice to include a heading element within a header element."
},
{
    question: "When would you want to use an article element and when would this generally not be necessary?",
    answer: "If want to be independently distributable or reusable, such as a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content, use an article element.\n \tIf the content of this block can not be divided into several parts, then the article should not be used."
}
];

let loadFirstQues = function()
{
    if(questions.length > 0)
    {
        document.getElementById("contentQ").innerText = questions[0].question;
        document.getElementById("contentA").innerText = questions[0].answer;
        document.getElementById("qIndex").innerText = 1;
        document.getElementById("qCount").innerText = questions.length;
        hideAnswer();
        hideQC();
    }
}

let getNextQues = function()
{
    let currentQuestionIndexElement = document.getElementById("qIndex");
    let currentQuestionIndex = parseInt(currentQuestionIndexElement.innerText);

    if(currentQuestionIndex < questions.length)
    {
        let nextQuestion = questions[currentQuestionIndex]; 
        document.getElementById("contentQ").innerText = nextQuestion.question;
        document.getElementById("contentA").innerText = nextQuestion.answer;
        hideAnswer(); 
        hideQC();
        currentQuestionIndexElement.innerText = (currentQuestionIndex + 1); 
        }
    else
    {

        alert("This is the last question!");
    }
}

let getPreviousQues = function()
{
    let currentQuestionIndexElement = document.getElementById("qIndex");
    let currentQuestionIndex = parseInt(currentQuestionIndexElement.innerText);
    if(currentQuestionIndex > 1)
    {
        let previousQuestion = questions[currentQuestionIndex - 2]; 
        document.getElementById("contentQ").innerText = previousQuestion.question;
        document.getElementById("contentA").innerText = previousQuestion.answer;
        hideAnswer(); 
        hideQC();
        currentQuestionIndexElement.innerText = (currentQuestionIndex - 1); 
    }
    else
    {
        alert("This is the first question!");
    }
}

let showAnswer = function()
{
    document.getElementById("contentA").classList.add("showContentA");
    document.getElementById("contentA").classList.remove("hideContentA");
}

let hideAnswer = function()
{
    document.getElementById("contentA").classList.remove("showContentA");
    document.getElementById("contentA").classList.add("hideContentA");
}

let showQC = function()
{
    document.getElementById("QCreator").classList.add("showStuff");
    document.getElementById("QCreator").classList.remove("hideStuff");
}

let hideQC = function()
{
    document.getElementById("QCreator").classList.remove("showStuff");
    document.getElementById("QCreator").classList.add("hideStuff");
}

/* Takes the content from the text areas and adds
to the quesiton list */
function addQuestion()
{

    let qcount = questions.length;
    let ques = document.getElementById("Question").value;
    let elementQ = document.getElementById("Question");
    elementQ.classList.add("textarea");
    let ans = document.getElementById("Answer").value;
    let questionAnswerPairObject = { "question": ques, "answer" : ans };
    questions.push(questionAnswerPairObject);
    let elementA = document.getElementById("Answer");
    elementA.classList.add("textarea");
    document.getElementById("qCount").innerText = (parseInt(document.getElementById("qCount").innerText) + 1);  
}

/** Removes the current question being displayed **/
function removeQuestion()
{
    let currentQuestionIndex = parseInt(document.getElementById("qIndex"));
    questions.splice(currentQuestionIndex - 1, 1);
    loadFirstQues();
}

function initButtons()
{
    document.getElementById("BForward").addEventListener("click", getNextQues);
    document.getElementById("BBack").addEventListener("click", getPreviousQues);
    document.getElementById("BShow").addEventListener("click", showAnswer);
    document.getElementById("BHideA").addEventListener("click", hideAnswer);
    document.getElementById("BShowQC").addEventListener("click", showQC);
    document.getElementById("BHideQC").addEventListener("click", hideQC);
    document.getElementById("BRemove").addEventListener("click", removeQuestion);
    document.getElementById("BAddQ").addEventListener("click", addQuestion);
    loadFirstQues();
}

initButtons();
hideAnswer(); 
hideQC();