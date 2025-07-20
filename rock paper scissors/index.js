let userScore = 0;
let computerScore = 0;
const userScore_span =document.getElementById("user-score");
const computerScore_span =document.getElementById("computer-score"); 
const scoreBoard_div =document.querySelector(".score-board");
const result1_p = document.getElementById("result1");
const result2_p = document.getElementById("result2");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p"); 
const scissors_div = document.getElementById("s"); 

function getComputerChoice(){
    const choices = ['r','p','s'];
    const randomNumber = Math.floor(Math.random()*3);
    return choices[randomNumber];
}

function convertToWorld(letter){
    if(letter === "r") return "Rock";
    if(letter === "p") return "Paper";
    return "Scissors";
}

function win(userChoice,computerChoice){
   
    userScore++;
    userScore_span.textContent=userScore;
    computerScore_span.textContent=computerScore;
    result1_p.textContent=`${convertToWorld(userChoice)} beats ${convertToWorld(computerChoice)}`
    result2_p.textContent=`YOU WIN !`
    const userChoice_div= document.getElementById(userChoice);
    userChoice_div.classList.add('green-glow');
    setTimeout(()=>userChoice_div.classList.remove('green-glow'), 1000 )
}

function lost(userChoice,computerChoice){
    computerScore++;
    userScore_span.textContent=userScore;
    computerScore_span.textContent=computerScore;
    result1_p.textContent=`${convertToWorld(computerChoice)} beats ${convertToWorld(userChoice)}`
    result2_p.textContent=`YOU LOSE !`
    const userChoice_div= document.getElementById(userChoice);
    userChoice_div.classList.add('red-glow');
    setTimeout(()=>userChoice_div.classList.remove('red-glow'), 1000 )
}

function draw(userChoice,computerChoice){
    result1_p.textContent=`${convertToWorld(computerChoice)} equals ${convertToWorld(userChoice)}`
    result2_p.textContent=`IT'S DRAW !`
    const userChoice_div= document.getElementById(userChoice);
    userChoice_div.classList.add('grey-glow');
    setTimeout(()=>userChoice_div.classList.remove('grey-glow'), 1000 )
}


function game(userChoice){
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice,computerChoice);
            break;
        
        case "rp":
        case "ps":
        case "sr":
            lost(userChoice,computerChoice);
            break;

        case "rr":
        case "pp":
        case "ss":
            draw(userChoice,computerChoice);
            break;     
    }
}

function rock(){
        game("r");
    }

function paper(){
        game("p");
    }

function scissors(){
         game("s");
    }
