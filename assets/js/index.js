    // Variables

let startButtonEl = $("#start-btn");
let qContainerEl = $('#question-container');
let questionEl = $('#question');
let aGridEl = $('#answer-buttons');
let nextBtnEl = $('#next-btn');
let answerBtnEl = $('#answer-buttons');
let controlsEl = $('#controls');
let scoreBtnEl = $('#score-btn');
let scoreEl = $('#score-container')
let clearBtnEl = $('#clr-btn');
let timeEl = $('#time');

    // Base Variables
let questionIndex = 0;
let questions = questionsList[questionIndex];
let score = 0;

    // Click Listeners
startButtonEl.click(startQuiz);
answerBtnEl.click(selectAnswer);
nextBtnEl.click(nextQuestion);
submitBtnEl.click(submitScore);
scoreBtnEl.click(viewScores);
clearBtnEl.click(clearScores);

    // Functions

function startQuiz() {
    questionIndex = 0;
    questions = questionsArr[questionIndex];
    startButtonEl.addClass('hide');
    scoreBtnEl.addClass('hide');
    qContainerEl.removeClass('hide');
    clearBtnEl.addClass('hide');
    dispQuestion(questions);
    score = 90;
    timeEl.text(`Time Left: ${score}`);
    startTimer()

};

function dispQuestion(question) {
    aGridEl.empty();
    questionEl.text(question.title);
    $.each(question.choices, function (index, options) {
        let newButton = $('<button>');
        newButton.text(options);
        newButton.addClass('btn');
        aGridEl.append(newButton);
    })
};

function selectAnswer(e) {
     if ($(e.target).text() === questions.answer) {
         $(e.target).addClass('btn-success');
         nextBtnEl.removeClass('hide');
     } else if ($(e.target).text() !== questions.answer && $(e.target).hasClass('btn')){
        $(e.target).addClass('btn-danger');
        score -= 15;
        timeEl.text(`Time Left: ${score}`)
        timeEl.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     }
};

function nextQuestion () {
    questionIndex++
    questions = questionsArr[questionIndex]
    if (questionIndex === questionsArr.length){
        stopTimer()
        
        qContainerEl.addClass('hide')
        formEl.removeClass('hide');
        submitBtnEl.removeClass('hide');
        nextBtnEl.addClass('hide');
        timeEl.text(`Points: ${score}`)
    } else {
        dispQuestion(questions);
        nextBtnEl.addClass('hide');
    }
};