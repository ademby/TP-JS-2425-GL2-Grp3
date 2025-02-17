let randNum;
let leftb, rightb, nbOfTries;
let gState; // Possible states are : win - lost - over - error






// Cuisine interne

window.addEventListener('load', function(){
	console.log("window loaded!");
	main();
});

function main(){
	const btn = document.querySelector("#retry-btn");
	btn.addEventListener('click', function(){
		initGame();
	});
	initGame();
}


function initGame(){
	setState("over");
	setTimeout(startGame, 100);
}

function setState(state){
	//clean previous state
	const body = document.querySelector("body");
	body.classList.remove(gState);
	//new global state
	gState = state; 
	body.classList.add(gState);
	//hide or show button
	const btn = document.querySelector("#retry-btn");
	const err = document.querySelector("#err");
	err.classList.add("d-none");
	btn.classList.remove("d-none");
	if (gState=="over"){
		btn.classList.add("d-none");
	}
	if(gState == 'error')
	{
		err.classList.remove("d-none");
	}
}

function error_routine(){
	setState("error");
	console.log("An error occured!");
}

function startGame(){

	//TAS5INET
	if(getInput() == 'error')
		return error_routine();
	randNum = Math.floor(Math.random() * (rightb - leftb + 1)) + leftb;
	let guess;
	let won = false;
	console.log(nbOfTries);

	//D5alna FESSANDI
	while(nbOfTries){

		guess = parseInt(prompt(`guess number between ${leftb} and ${rightb}, ${nbOfTries} guesses left`));
		if (isNaN(guess)){
			return error_routine();
		} else if (guess == randNum){
			won = true;
			break;
		} 
		nbOfTries--;
		if (nbOfTries == 0){
			break;
		} else if (guess < randNum){
			alert("The target number is greater");
		} else {
			alert("The target number is smaller");
		}
	}

	//MRIGLIN
	if (won){
		setState("won");
		//we delay the alert just for the color to be applied
		setTimeout(alert, 30,"You won!");
	} else {
		setState("lost");
		//same
		setTimeout(alert, 30,"You lost!");
	}
}

function getInput(){
	leftb = 0;
	rightb = 20;
	
	// SETTING THE INTERVAL

	let qst = "Do you want to modify the interval (Default : [0..20])?\n\nType : 'yes' or 'no'";
	let ans = prompt(qst);
	
	if (ans == "yes")
		getInterval();
	else if (ans != "no"){
		return 'error';
	}

	// SETTING THE DIFFICULTY
	nbOfTries = getNb(rightb-leftb+1);

	if (nbOfTries == "error")
		return 'error';
}

function getInterval()
{
	do{
		leftb = parseInt(prompt("minimum value :"));
		if(leftb == null || isNaN(leftb))
			return 'error';
		rightb = parseInt(prompt("maximum value :"));
		if(rightb == null || isNaN(rightb))
			return 'error';
		if (rightb<leftb){
			alert("Error : maximum < minimum !\nRepeat :");
			continue;
		}
	}while(false);
}

function getNb(possiblities){

	// never mind, just a formula ;)
	function f(range, diff){ 
		return Math.round(Math.min(Math.log(range) / Math.log(diff + 1 / range), range / (diff + 1 / range)));
	}

	// never read this
	let vhard = Math.max(1      , f(possiblities, 2));
	let hard = Math.max(vhard+1, f(possiblities, 1.7));
	let medium = Math.max(hard+1, f(possiblities, 1.5));
	let easy = Math.max(medium+1, f(possiblities, 1.2));
	
	let dif = prompt (`Choose a difficulty from these:\n\n`
	+`	easy:        ${easy}\n`
	+`	medium:   ${medium}\n`
	+`	hard:          ${hard}\n`
	+`	very hard: ${vhard}\n\n`);
	
	if(dif == "easy")
		return easy;
	else if(dif == "medium")
		return medium;
	else if(dif == "hard")
		return hard;
	else if(dif == "very hard")
		return vhard;
	else
		return "error";
}
