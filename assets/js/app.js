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

 //hooking game con
var gameContainer = document.getElementById("game-container");
//hold the interval to be used when needed and to cancel Interval
var timerId;
//possible not needed
var timeOutId;

let correctSound = new Audio("./assets/sound/guitar_fast_solo.mp3");
correctSound.volume = 0.1;

let wrongSound = new Audio("./assets/sound/wrong.mp3");
wrongSound.volume = 0.1;
//when user enters incorrect

let resetSound = new Audio("./assets/sound/robot_power_up_surge.mp3");
resetSound.volume = 0.1;

let crowdCheerSound = new Audio("./assets/sound/large_crowd_outdoor_cheering_clapping.mp3");
crowdCheerSound.volume = 0.1;

let booSound = new Audio("./assets/sound/crowd_boo.mp3");
booSound.volume = 0.1;

let coachellaSound = new Audio("./assets/sound/coachellaa.mp3");
coachellaSound.volume = 0.2;



//game dictionary (object) hold everything relevant to our trivia game
var game = {
    currentQuestion: 0,
    correctQuestions: 0,
    incorrectQuestions: 0,
    //update time to 25 secs
    time: 25,
    questions: [
        {
            q: "1. In what year did Coachella first start?",
            o: ["1999", "2000","2002", "2004"],
            a: 0,
            image: "./assets/img/coachella-lineup.jpg"
        },
        {
            q:'2. How much money did the event make or lose that first year in "99"?',
            o:["Made $500,000", "Made $1,000,000", "Lost -$850,000", "Lost -$80,000"],
            a: 2,
            image: "./assets/img/burning-money.gif"

        },
        {
            q:"3. Which artist came back from the dead and performed at Coachella 2012 via holographic image projection?",
            o:["Elvis", "Micheal Jackson", "Biggie Smalls", "Tupac"],
            a: 3,
            image: "./assets/img/tupac2.gif"
        },
        {
            q:"4. When the festival first started, how much was a General Admission Ticket?",
            o:["$125 per day", "$99 per day", "$80 per day", "$50 per day"],
            a: 3,
            image: "./assets/img/coachella-99-ticket.jpg"

        },
        {
            q:"5. Across the grounds, several stages, tents and houses continuously host live music. Which name is not part of Coachella?",
            o:["RedBull Stage", "Gobi Tent", "Sahara Tent", "Do-Lab", "Heiniken House"],
            a: 0,
            image: "./assets/img/map.jpg"

        },
        {
            q:"6. What is the name of Beyoncé's Documentary, which details how the pop superstar created her iconic 2018 Coachella headling set?",
            o:["BeeHive", "Blue Ivy Carter", "HomeComing", "Yoncé", "MsCarter"],
            a: 2,
            image: "./assets/img/beyonce-homecoming1.gif"

        },
        {
            q:"7. Coachella has been the home of many band reunions and revitalizations. Which band has not reunited at Coachella?",
            o:["Nine Inch Nails", "Oasis", "Rage Against The Machine", "Jane's Addiction"],
            a: 1,
            image: "./assets/img/oasis.gif"

        },
        {
            q:"8. In 2008, Roger Waters had a giant inflatable animal that got loose and floated into 2 residents yards. Which GoldenVoice then gave $10k and free life time passes to retrieve. What animal was it?",
            o:["Unicorn", "Pig", "Cow", "Hippo"],
            a: 1,
            image: "./assets/img/pig.jpg"

        },
        {
            q:"9. How much is a 2022 VIP Tier 4 pass before fees?",
            o:["$549", "$929", "$849", "$1,119"],
            a: 3,
            image: "./assets/img/vip-ticket.jpg"

        },
        {
            q:"10. Who was the Headliner for Coachella 2022?",
            o:["Lady GaGa", "Kanye", "Swedish House Mafia x The Weekend", "Travis Scott", "SnoopDogg"],
            a: 2,
            image: "./assets/img/shm-week.jpg"

        }

    ],
    
    //creates html for the opening screen before game begins
    mainDisplay: function(){
        //-clear game container of any existing  content
        gameContainer.innerHTML = ""

        //-add instructions and buttons to the game container
        //-create instructions for the game container
        var h3 = document.createElement("h3");
        h3.textContent = "Test your knowledge of Trivia about the Coachella Music Festival. You have 25 seconds to answer correctly. Questions are multiple choice and worth 1 point each. At the end we will tally your score. Good Luck! Press Start to begin! "
        gameContainer.appendChild(h3);

        //-create play game button
        //add button to the game container
        var btn = document.createElement("button");
        btn.textContent = "Start!"
        btn.setAttribute("id", "start-game");
        btn.setAttribute("class", "bounce-1 btn btn-danger");
        btn.setAttribute("type", "button");
        gameContainer.appendChild(btn);
    },

    qDisplay: function(){
        //get current Question from the question array
        var currentQ = game.questions[game.currentQuestion].q
        //get current Options from the question array
        var currentO = game.questions[game.currentQuestion].o

        //clear the game-container
        gameContainer.innerHTML = ""

        var timeLeft = document.createElement("h4");
        timeLeft.textContent = "Hurry!...answer the question before timer reaches 0"
        gameContainer.appendChild(timeLeft);

        //create container to hold countdown timer
        //add the timer container to the game container
        var timerDiv = document.createElement("div");
        timerDiv.setAttribute("id", "timer-wrap");
        timerDiv.textContent = this.time
        gameContainer.appendChild(timerDiv);
        
        //create a text element with the current question text
        //add current question text to the game container
        var h3 = document.createElement("h3");
        h3.textContent = currentQ
        gameContainer.appendChild(h3);

        /**
         This is an example of the structure 
         needed for the answer options:

         <div class="btn-group-vertical" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary">Left</button>
            <button type="button" class="btn btn-primary">Middle</button>
            <button type="button" class="btn btn-primary">Right</button>
        </div>
         */
        //this is a container to hold button group for each answer option
        var btnGroup = document.createElement("div");
        btnGroup.setAttribute("class", "btn-group-vertical");
        btnGroup.setAttribute("role", "group");

        //create a button for each answer option and add it to the button group div
        for(var i = 0; i < currentO.length; i++) {
            var btn = document.createElement("button");
            btn.setAttribute("class", "btn btn-primary q-o-btn")
            btn.setAttribute("type", "button");
            btn.setAttribute("data-oindex", i);
            btn.textContent = currentO[i];
            btnGroup.appendChild(btn);

        }

        //add the button group containing all tthe button options to the game container
        gameContainer.appendChild(btnGroup);

        //clear any existing Interval conected to the timer ID
        //this is to insure our timer doesn't randomly speed up
        //ALWAYS CLEAR TIME INTERVAL BEFORE STARTING ONE!
        clearInterval(timerId);
        //start Interval tha will run every 1 sec
        timerId = setInterval(game.timerDisplay, 1000);

    },

    //display correct, incorrect or out of time screens
    // 1 = correct,
    //2 = incorrect
    //3 = out of time
    bQDisplay: function(num){
        //clear any existing content in game-container
        gameContainer.innerHTML = ""

        var answerIndex = game.questions[game.currentQuestion].a
        var answer = game.questions[game.currentQuestion].o[answerIndex]
        //check what num is to determine what screen  to display
        var h3 = document.createElement("h3");
        var image = document.createElement("img");
        image.setAttribute("id", "pics");
        switch(num){
            case 1:
                game.correctQuestions++
                h3.textContent = `Correct! ${answer} is the right answer.`
                image.src = game.questions[game.currentQuestion].image
                correctSound.play();
                break;
            case 2:
                game.incorrectQuestions++
                h3.textContent = `Incorrect! ${answer} was the right answer.`
                image.src = game.questions[game.currentQuestion].image;
                wrongSound.play();
                break;
            default:
                game.incorrectQuestions++
                h3.textContent = `Times UP! ${answer} is the right answer.`
                image.src = game.questions[game.currentQuestion].image;
                wrongSound.play();
                booSound.play();
                break;
        }
        gameContainer.append(h3, image);


        if (game.currentQuestion < game.questions.length - 1){
            game.currentQuestion++
            setTimeout(game.qDisplay, 4000)

        }else {
            setTimeout(game.lDisplay, 4000)

        }

    },

    //manage and display question timer
    timerDisplay: function(){
        //hook on to the timer-wrap div from HTML
        var timerDiv = document.getElementById("timer-wrap");
        
        //reduce time by 1
        game.time--

        //display time in the timer-wrap div
        timerDiv.textContent = game.time

        //check if time is equal 0 or less than zero
        if(game.time <= 0){
            //stop the Interval(timer)
            clearInterval(timerId);

            //reseting our time back to 20
            game.time = 25;

            //display out of time screen
            game.bQDisplay(3)

        }
    },
    lDisplay: function(){
        /*
        display game over title
        display how many correct answers
        display how many incorrect answers
        create a button to play again
        call reset game function on click
        creat a click event for button that resets game and calls on qDisplay
        */
        gameContainer.innerHTML = "";
        crowdCheerSound.play();
        coachellaSound.play();

        var gameOverStats = document.createElement("h2");
        gameOverStats.textContent = `Game Over! you got ${game.correctQuestions} correct answers and missed ${game.incorrectQuestions} questions. Press re-Play to try again`

        gameContainer.appendChild(gameOverStats)

        var rePlay = document.createElement("button")
        rePlay.textContent = "re-Play!"
        rePlay.setAttribute("id", "reset")
        rePlay.setAttribute("class", "bounce-1 btn btn-warning")
        gameContainer.appendChild(rePlay);

        var resetBtn = document.getElementById("reset");
        resetBtn.onclick = function(){
            game.gameReset();
            resetSound.play();
            coachellaSound.play();
        }

    },
    gameReset: function(){
        //reset all values to original value
        gameContainer.innerHTML = "";
        game.currentQuestion = 0
        game.correctQuestions = 0
        game.incorrectQuestions = 0
        game.qDisplay();
    },
    
}

//dynamic click event for all button created in javascript
document.addEventListener("click", function(event){
    //onclick start game
    if(event.target.id === "start-game") {
        //display the question
        game.qDisplay();
        coachellaSound.play();
        crowdCheerSound.play();

    }

    //onclick of any question option button
    if(event.target.className.includes("q-o-btn")) {
        //stop the timer
        clearInterval(timerId);
        //reset the game time to 10 sec
        game.time = 20;

        //get the data attribute of oindex from the question option button that was clicked on
        //convert the value of oindex attribute to a number from a string
        var userAnswer = parseInt(event.target.getAttribute("data-oindex"));

        //get all of the question option buttons (array of HTML elments)
        var optionList = document.querySelectorAll(".q-o-btn");

        //for each question option button add the disable attribute
        // this prevent yhe user from clicking multiple answers
        for(var i = 0; i < optionList.length; i++) {
            //disable other option buttons
            optionList[i].setAttribute("disabled", true);
        }
        //check if users guess matches the questions answer
        if(game.questions[game.currentQuestion].a === userAnswer) {
            //display correct answer screen
            game.bQDisplay(1);

        }else {
            //display incorrect answer screen
            game.bQDisplay(2)

        }

    }
    //compare it to the clicked button data O index

    //clear interval
    //call on function Display bQDisplay
});

game.mainDisplay();