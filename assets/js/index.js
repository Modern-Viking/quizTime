// Variables

// Element variables
var start = $("#startBtn");
var questionBox = $('#question-container');
var questionTxt = $('#question');
var answerBox = $('#answer-buttons');
var nextBtn = $('#nextBtn');
var answerBtn = $('#answer-buttons');
var submitBtn = $('#submit-btn');
var form = $('#user-form');
var userEl = $('#user');
var controls = $('#controls');
var scoreBtn = $('#scoreBtn');
var scoreBox = $('#score-container')
var clearBtn = $('#clrBtn');
var userDisp = $('#user-display');
var userHeading = $('#user-heading');
var timerDisp = $('#timer');
var time = $('#time');

// starting variables
var questionIndex = 0;
var questions = questionsList[questionIndex];
var users = JSON.parse(localStorage.getItem("usersArr")) || [];
var score = 0;
var interval;

// Click Listeners

start.click(startQuiz);
answerBtn.click(answerClick);
nextBtn.click(nextQuestion);
submitBtn.click(submitScore);
scoreBtn.click(viewScores);
clearBtn.click(clearScores);

// Functions

function startQuiz() {

    questionIndex = 0;
    questions = questionsList[questionIndex];
    start.addClass('hide');
    scoreBtn.addClass('hide');
    questionBox.removeClass('hide');
    scoreBox.addClass('hide');
    userHeading.addClass('hide');
    userDisp.addClass('hide');
    clearBtn.addClass('hide');
    timerDisp.removeClass('hide');
    displayQuestion(questions);
    score = 90;
    time.text(`Time Left: ${score}`);
    timerStart()

};

function displayQuestion(question) {
    answerBox.empty();
    questionTxt.text(question.title);
    $.each(question.choices, function (index, options) {
        let newButton = $('<button>');
        newButton.text(options);
        newButton.addClass('btn');
        answerBox.append(newButton);
    })
};

function answerClick(e) {
     if ($(e.target).text() === questions.answer) {
         $(e.target).addClass('btn-success');
         nextBtn.removeClass('hide');
     } else if ($(e.target).text() !== questions.answer && $(e.target).hasClass('btn')){
        //Alert user to wrong answer, flash score, and decrement score
        $(e.target).addClass('btn-danger');
        score -= 15;
        time.text(`Time Left: ${score}`)
        time.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     }
};

function nextQuestion () {
    questionIndex++
    questions = questionsList[questionIndex]
    if (questionIndex === questionsList.length){
        timerStop()
        questionBox.addClass('hide')
        form.removeClass('hide');
        submitBtn.removeClass('hide');
        nextBtn.addClass('hide');
        time.text(`Points: ${score}`)
    } else {
        displayQuestion(questions);
        nextBtn.addClass('hide');
    }
};

function submitScore () {
    if (!user.value) {
        form.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    } else {
        let userJSON = {
            username: user.value,
            score: score
        };
        users.push(userJSON);
        users.sort((a,b) => b.score - a.score );
        users.splice(5);
        localStorage.setItem('usersArr', JSON.stringify(users));

        start.removeClass('hide');
        start.text('Restart')
        scoreBtn.addClass('hide');
        scoreBox.removeClass('hide');
        userDisp.removeClass('hide');
        userHeading.removeClass('hide');
        clearBtn.removeClass('hide');
        timerDisp.addClass('hide');

        displayUser()

        }

};

function displayUser () {
    userDisp.empty();

    $.each(users, function (index, options) {
        let newItem = $('<li>');
        newItem.text(`${options.username} - ${options.score}`);
        userDisp.append(newItem);
    })

    form.addClass('hide');
    submitBtn.addClass('hide');
    scoreBox.removeClass('hide');
    userHeading.removeClass('hide');
    clearBtn.removeClass('hide');
    
}

function viewScores () {
    start.removeClass('hide');
    start.text('Start Quiz')
    scoreBtn.addClass('hide');
    scoreBox.removeClass('hide');
    userHeading.removeClass('hide');
    clearBtn.removeClass('hide');
    displayUser()
}

function clearScores () {
    userDisp.empty();
    users = [];
    localStorage.setItem('usersArr', '[]');
}

function timerStart () {
    interval = setInterval(function () {
        score--
        if (score < 0) {
            score = 0;
            timerStop()
        }
        time.text(`Time Left: ${score}`)
    }, 1000)
    
}
    
function timerStop () {
    clearInterval(interval)
}