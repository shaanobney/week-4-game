$(document).ready(function() {
  	$('#elaine').mousedown(function() {
		$('#george').appendTo("#defenderSelect").css("background-color","red");
		$('#jerry').appendTo("#defenderSelect").css("background-color","red");
		$('#kramer').appendTo("#defenderSelect").css("background-color","red");
		elaineWav.play();
	});
	$('#george').mousedown(function() {
		$('#elaine').appendTo("#defenderSelect").css("background-color","red");
		$('#jerry').appendTo("#defenderSelect").css("background-color","red");
		$('#kramer').appendTo("#defenderSelect").css("background-color","red");
		georgeWav.play();	
	});
	$('#jerry').mousedown(function() {
		$('#kramer').appendTo("#defenderSelect").css("background-color","red");
		$('#elaine').appendTo("#defenderSelect").css("background-color","red");
		$('#george').appendTo("#defenderSelect").css("background-color","red");
		jerryWav.play();
	});
	$('#kramer').mousedown(function() {
		$('#jerry').appendTo("#defenderSelect").css("background-color","red");
		$('#george').appendTo("#defenderSelect").css("background-color","red");
		$('#elaine').appendTo("#defenderSelect").css("background-color","red");
		kramerWav.play();
	});
});

//VARIABLES

var seinFeld = ["#Elaine", "#George", "#Jerry", "#Kramer"];
var elaineWav = new Audio('dingo.wav');
var georgeWav = new Audio('ah_hah.wav');
var jerryWav = new Audio('dream_hamburger.wav')
var kramerWav = new Audio('assman.wav')


//OBJECTS. Properties assigned to hitpoints, attack power, base to add back to attack.

var elaine = {
	hitPoints: 80,
	attackPower: 40,
	base: 3,
	name: "Elaine",
	card: '#elaine',
}

var george = {
	hitPoints: 30,
	attackPower: 5,
	base: 50,
	name: "George",
	card: '#george',

}

var jerry = {
	hitPoints: 120,
	attackPower: 50,
	base: 10,
	name: "Jerry",
	card: '#jerry',
}

var kramer = {
	hitPoints: 200,
	attackPower: 10,
	base: 1.2,
	name: "Kramer",
	card: '#kramer',
}

// //Fight function. Compares the attack power of each to the hit points of the other. if attack is greater than HP
// //you're dead. Otherwise it subtracts attack power from hitpoints and updates running total for each char, and outputs msg.



// //need function for picking from enemies pool and sending it to defender. 

function compareChar(o1, o2) {
		if (o2.hitPoints <= o1.attackPower) {
			alert("Yada Yada " + o2.name + " died");
			document.getElementById('charAttack').innerHTML = "Yada Yada " + o2.name + " died";
		} else {
			o2.hitPoints = (o2.hitPoints - o1.attackPower);
			document.getElementById('charAttack').innerHTML = o1.name + " did " + o1.attackPower + " Yada Yadas (damage)";
			o1.attackPower = (o1.attackPower + o1.base);
		}
		if (o1.hitPoints <= o2.attackPower) {
			alert("I'll bet they'll replace me with Banya!");
			document.getElementById('defAttack').innerHTML = "I'll bet they'll replace me with Banya!)";
		} else {
			o1.hitpoints = (o1.hitPoints - o2.attackPower);
			document.getElementById('defAttack').innerHTML = o2.name + " did " + o2.attackPower + " Yada Yadas (damage)";
			o2.attackPower = (o2.attackPower + o2.base);
		}
	};

	compareChar();




