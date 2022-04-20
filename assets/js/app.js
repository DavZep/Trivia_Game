var gameContainer = document.getElementById("game-container");
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
        creat instructions for the game and
        play game button
        */
        gameContainer.innerHTML = ""

        var h3 = document.createElement("h3")
        h3.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac ut consequat semper viverra. Risus viverra adipiscing at in. Lobortis feugiat vivamus at augue. Vitae congue mauris rhoncus aenean vel elit scelerisque. "
        gameContainer.appendChild(h3);

        var btn = document.createElement("button");
        btn.textContent = "Start!"
        btn.setAttribute("id", "start-game");
        btn.setAttribute("class", "btn btn-danger");
        btn.setAttribute("type", "button");
        gameContainer.appendChild(btn);
    }

    
}

document.addEventListener("click", function(event){
    //onclick start game
    if(event.target.id === "start-game") {
        console.log("start-game")

    }
});

game.mainDisplay()