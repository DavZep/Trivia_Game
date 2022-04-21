/*
 when user clicks start game , 
 the first Q should show and options should also be displayed 
 count down timer should start
 within options user should only be able to click once
 if the user selects correct answer stop timer and 
 display congrats screen w/ answer selected
 Congrats screen should only display for a few seconds before repeating the steps above
 if the user gets Qs wrong 
 display wrong answer screen for a few seconds
 display what the right answer should have been
 if user runs out of time without answering the question, 
 display out of time screen with correct answer
 after all Qs have cycled display the total correct and incorrect answers 
 offer the user to play again
 */

var gameContainer = document.getElementById("game-container");
var timerId;
var timeOutId;
var game = {
    currentQuestion: 0,
    correctQuestions: 0,
    incorrectQuestions: 0,
    time: 10,
    questions: [
        {
            q: "In what year did Coachella first start?",
            o: ["1999", "2000","2002", "2004"],
            a: 0
        },
        {
            q:"How much money did the event make or lose that first year?",
            o:["$500,000", "$1,000,000", "-$800,000", "-$80,000"],
            a: 2
        },
        {
            q:"Which artist came back from the dead and performed at Coachella 2012 via holographic image projection?",
            o:["Elvis", "Micheal Jackson", "Biggie Smalls", "Tupac"],
            a: 3
        }
    ],

    mainDisplay: function(){
        /*
        create instructions for the game and
        play game button
        */
        gameContainer.innerHTML = ""

        var h3 = document.createElement("h3");
        h3.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac ut consequat semper viverra. Risus viverra adipiscing at in. Lobortis feugiat vivamus at augue. Vitae congue mauris rhoncus aenean vel elit scelerisque. "
        gameContainer.appendChild(h3);

        var btn = document.createElement("button");
        btn.textContent = "Start!"
        btn.setAttribute("id", "start-game");
        btn.setAttribute("class", "btn btn-danger");
        btn.setAttribute("type", "button");
        gameContainer.appendChild(btn);
    },

    qDisplay: function(){
        
        //get current Question we are on, fetch current Q object from the questions array
        var currentQ = this.questions[this.currentQuestion].q
        var currentO = this.questions[this.currentQuestion].o
        //clear the game-container
        gameContainer.innerHTML = ""

        var timerDiv = document.createElement("div");
        timerDiv.setAttribute("id", "timer-wrap");
        timerDiv.textContent = this.time
        gameContainer.appendChild(timerDiv);
        
        //create text elm with current Question text
        var h3 = document.createElement("h3");
        h3.textContent = currentQ
        gameContainer.appendChild(h3);

        /**
         
         <div class="btn-group-vertical" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary">Left</button>
            <button type="button" class="btn btn-primary">Middle</button>
            <button type="button" class="btn btn-primary">Right</button>
        </div>
         */
        var btnGroup = document.createElement("div");
        btnGroup.setAttribute("class", "btn-group-vertical");
        btnGroup.setAttribute("role", "group");

        for(var i = 0; i < currentO.length; i++) {
            var btn = document.createElement("button");
            btn.setAttribute("class", "btn btn-primary q-o-btn")
            btn.setAttribute("type", "button");
            btn.setAttribute("data-oindex", i);
            btn.textContent = currentO[i];
            btnGroup.appendChild(btn);

        }

        gameContainer.appendChild(btnGroup);
        clearInterval(timerId);
        timerId = setInterval(game.timerDisplay, 1000);
        //create buttons for each option 
        //start interval, that counts down
        //call interval function
        //append test and buttons to game-container

    },

    bQDisplay: function(num){
        gameContainer.innerHTML = ""
        gameContainer.textContent = num
    },

    timerDisplay: function(){
        var timerDiv = document.getElementById("timer-wrap");
        //reduce time by 1, and display time on page
        game.time--

        timerDiv.textContent = game.time
        //check if time is equal 0 or less than zero
        if(game.time <= 0){
            clearInterval(timerId);
            game.time = 10;
            game.bQDisplay(3)

        }
        //if true ,call bQDisplay
        //clear our interval and reset timer variable
    }
    
}

document.addEventListener("click", function(event){
    //onclick start game
    if(event.target.id === "start-game") {
        console.log("start-game")
        game.qDisplay();
    }

    //if option button clicked get the current question answer and 
    console.log(event.target.className.includes("q-o-btn"))
    if(event.target.className.includes("q-o-btn")) {
        clearInterval(timerId);
        game.time = 10;
        var userAnswer = parseInt(event.target.getAttribute("data-oindex"));
        var optionList = document.querySelectorAll(".q-o-btn")
        console.log(optionList)
        for(var i = 0; i < optionList.length; i++){
            //disable other option buttons
            optionList[i].setAttribute("disabled", true);
        }
        if(game.questions[game.currentQuestion].a === userAnswer){
            console.log("correct");
            game.bQDisplay(1)
            game.correctQuestions++
        }else {
            console.log("incorrect");
            game.bQDisplay(2)
            game.incorrectQuestions++


        }

    }
    //compare it to the clicked button data O index

    //clear interval
    //call on function Display bQDisplay
});

game.mainDisplay();