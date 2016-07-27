$(document).ready(function() {

//OBJECTS. Properties assigned to hitpoints, attack power, base to add back to attack.
    var characters = {
        elaine: {
            hp: 200,
            attack: 10,
            name: 'Elaine',
            imgSrc: "assets/images/elaine.jpg",
            audio: elaineWav,

        },
        george: {
            hp: 100,
            attack: 8,
            name: 'George',
            imgSrc: "assets/images/george.jpg",
            audio: georgeWav,
        },
        jerry: {
            hp: 150,
            attack: 12,
            name: ' Jerry ',
            imgSrc: "assets/images/jerry.jpg",
            audio: jerryWav,
        },
        kramer: {
            hp: 300,
            attack: 2,
            name: 'Kramer',
            imgSrc: "assets/images/kramer.jpg",
            audio: kramerWav,
        }
    };
//VARIABLES.
    var charElement = '';
    var opponent = '';
    var myCharToggle = false;
    var opponentToggle = false;
    var charSel = 0;
    var myHp = 0;
    var myWav = "";
    var opponentHp = '';
    var enemsBeaten = 0;
    var elaineWav = new Audio('dingo.wav');
    var georgeWav = new Audio('ah_hah.wav');
    var jerryWav = new Audio('dream_hamburger.wav');
    var kramerWav = new Audio('assman.wav');

    function setCond() {
        // CREATES CHARACTERS, LOOPS THROUGH AND SPITS OUT BASED ON OBJECT PROPS.
        for (var property in characters) {
            var charStat = characters[property];
            $('.characters').append("<div class='char' id='" + property + "'>" + charStat.name + "<img src='" + charStat.imgSrc + "'></div>");
	    }
    }

    setCond();

    $('body').on('click', '.char', function(e) {
        e.preventDefault();
        e.stopPropagation();
        charElement = $(this).attr('id')

        if (opponentToggle === false) {
            charSel = charElement;
            $("#charSel").append($('#' + charSel));
            myHp = characters[charSel].hp;
            myWav = characters[charSel].audio;
            $('#myHpValue').text(characters[charSel].hp);
            opponentToggle = true
        }
 
        else {
            if (opponent === '') {
                opponent = charElement;
                $("#opponent").append($('#' + opponent));
                opponentHp = characters[opponent].hp;
                $('#opponentHpValue').text(characters[opponent].hp);
            }
        }
    })

 //Fight function. Compares the attack power of each to the hit points of the other. if attack is greater than HP
//you're dead. Otherwise it subtracts attack power from hitpoints and updates running total for each char, and outputs msg.

    $('#attackbutton').on('click', function(attack) {
        characters[charSel].hp = characters[charSel].hp - characters[opponent].attack;
        characters[opponent].hp -= characters[charSel].attack;
        characters[charSel].attack += 5;
        var myCharHp = characters[charSel].hp;
        var opponentCharHp = characters[opponent].hp;
        if (myCharHp < 0) {
            myCharHp = 0;
        }
        if (opponentCharHp < 0) {
            opponentCharHp = 0;
        }
        $('#myHpValue').text(myCharHp);
        $('#opponentHpValue').text(opponentCharHp);

        if (characters[charSel].hp <= 0) {
            document.getElementById('ticker').innerHTML = "Yada Yada... you died";
        }

        if (characters[opponent].hp <= 0) {
            charElement = '';
            $('#opponent').empty();
            document.getElementById('ticker').innerHTML = "Yada Yada You win the battle";
            opponentHp = '';
            opponent = '';
            enemsBeaten++;
            
        if (enemsBeaten < 3) {
                document.getElementById('ticker').innerHTML = "Pick another clown";
            };
        }

        if (enemsBeaten === 3) {
            document.getElementById('ticker').innerHTML ="You Win";
        }

    })
    // Resets game to initial conditions, clears out values. 
    function reset() {
        characters = {
        elaine: {
            hp: 200,
            attack: 10,
            name: 'Elaine',
            imgSrc: "assets/images/elaine.jpg",
            audio: elaineWav,
        },
        george: {
            hp: 100,
            attack: 8,
            name: 'George',
            imgSrc: "assets/images/george.jpg",
            audio: georgeWav,
        },
        jerry: {
            hp: 150,
            attack: 12,
            name: ' Jerry ',
            imgSrc: "assets/images/jerry.jpg",
            audio: jerryWav,
        },
        kramer: {
            hp: 300,
            attack: 2,
            name: 'Kramer',
            imgSrc: "assets/images/kramer.jpg",
            audio: kramerWav,
            }
        };

        charElement = '';
        opponent = '';
        opponentToggle = false;
        charSel = '';
        enemsBeaten = 0;
        $('.characters').empty();
        $('#charSel').empty();
        $('#opponent').empty();
        $('#myHpValue').empty();
        $('#opponentHpValue').empty();
        $('#ticker').empty();
        setCond();
    }

    $('#resetbutton').on('click', function() {
        reset();

    })
});
