var triviaQuestions = [{

//1
	question: "In what year was the First Edition Dungeons and Dragons created?",
	answerList: ["1969", "1974", "1976", "1979"],
	answer: 1
},{
	//2
	question: "The company that created the original D&D game was TSR Inc., which stands for...?",
	answerList: ["Tactical Studies Rules", "Turnbull Standard Roleplaying", "Tripple Score RP", "Tactile Standard Rules"],
	answer: 0
},{
	//3
	question: "Dungeons and Dragons is currently on it's ___ edition!",
	answerList: ["Fifth", "Eighth", "Tenth", "Fourth"],
	answer: 0
},{
	//4
	question: "The multiverse made up of dozens of dimensions, but at its center lies...?",
	answerList: ["Earth", "The Inner Plane", "The Material Plane", "The Sphere"],
	answer: 2
},{
	//5
	question: "Wizards who extend their lives through dark magic are known as Liches, they obtain eternal life by storing their souls in what?",
	answerList: ["Ancient Artifacts", "Mortarium", "Phylacteries", "Spell Books"],
	answer: 2
},{
	//6
	question: "A 20-sided dice is used for most activities in game, it is also known as a...?",
	answerList: ["Dodecahedron", "Doubledecahedron", "Pentaganol Antiprism", "Decahedron"],
	answer: 0
},{
	//7
	question: "Dungeons and caves deep below the surface exist in the...?",
	answerList: ["Shadowrealm", "Underdark", "Abyss", "Feywild"],
	answer: 1
},{
	//8
	question: "Dungeons and Dragons was bought by Wizards of the Coast, the makers of Magic the Gathering in what year?",
	answerList: ["1984", "1993", "1997", "2001"],
	answer: 2
},{
	//9
	question: "Wizards of the Coast is now owned by what board game / toy company?",
	answerList: ["Parker Brothers", "Hasbro", "Games Workshop", "Mattel"],
	answer: 1
},{
	//10
	question: "When rolling for damage, what dice do you use for a Greatsword in Fifth Edition?",
	answerList: ["1d10", "1d12", "2d8", "2d6"],
	answer: 3
},{
	//11
	question: "How many Tarrasques are there in existance?",
	answerList: ["One", "Two", "Five", "Six"],
	answer: 0
},{
	//12
	question: "Red Dragons breath fire, what do Silver Dragons breath?",
	answerList: ["Fire", "Cold", "Poison", "Lightning"],
	answer: 1
},{
	//13
	question: "Which of these isn't a school of magic?",
	answerList: ["Abjuration", "Evocation", "Transmutation", "Restoration"],
	answer: 3
},{
	//14
	question: "What is the highest number an ability score can be?",
	answerList: ["20", "25", "18", "30"],
	answer: 0
},{
	//15
	question: "Gary Gygax gets the credit for D&D's creation, but it was co-written by...",
	answerList: ["Bob McKenzie", "Brian Blume", "Dave Arneson", "Steven Marpo"],
	answer: 2
}];

var gifArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10", "question11", "question12", "question13","question14","question15"];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Excelsior!",
	incorrect: "The game hits you for 10 damage.",
	endTime: "Out of time!",
	finished: "You've reached the end!"
}

$("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});

$("#startOverBtn").on("click", function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$("#finalMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	answered = true;
	
	
	$("#currentQuestion").html("Question #"+(currentQuestion+1)+"/"+triviaQuestions.length);
	$(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
	for(var i = 0; i < 4; i++){
		var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
		$(".answerList").append(choices);
	}
	countdown();
	
	$(".thisChoice").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$("#currentQuestion").empty();
	$(".thisChoice").empty();
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$("#gif").html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//answer check
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
		answered = true;
	}
	
		if (currentQuestion == (triviaQuestions.length-1)){
			setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();

	$("#finalMessage").html(messages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#startOverBtn").addClass("reset");
	$("#startOverBtn").show();
	$("#startOverBtn").html("Start Over?");
}
