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

    // Base Variables
let questionIndex = 0;
let currentQ = questionsArr[questionIndex];
let score = 0;
let interval;

    // Click Listeners
startButtonEl.click(startQuiz);
answerBtnEl.click(selectAnswer);
nextBtnEl.click(nextQuestion);
submitBtnEl.click(submitScore);
scoreBtnEl.click(viewScores);
clearBtnEl.click(clearScores);