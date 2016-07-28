$(document).ready(function() {





//CHARACTER BANK WITH COMBAT STATS.

    var characters = {
        elaine: {
            name: 'Elaine',
            hp: 120,
            attack: 10,
            acounter: 10,
            imgSrc: "assets/images/elaine.jpg",
            audio: elaineWav,
         },
        george: {
            name: 'George',
            hp: 130,
            attack: 8,
            acounter:  9,
            imgSrc: "assets/images/george.jpg",
            audio: georgeWav,
        },
        jerry: {
            name: 'Seinfeld',
            hp: 110,
            attack: 7,
            acounter: 11,
            imgSrc: "assets/images/jerry.jpg",
            audio: jerryWav,
        },
        kramer: {
            name: 'Kramer',
            hp: 140,
            attack: 8,
            acounter: 8,
            imgSrc: "assets/images/kramer.jpg",
            audio: kramerWav,
        }
    };

//VARIABLES.
    var charElement = '';
    var charSel = 0;
    var opponent = '';
    var opponentHp = '';
    var myCharToggle = false;
    var opponentToggle = false;
    var charSel = 0;
    var myHp = 0;
    var myWav = "";
    var enemsBeaten = 0;
    var elaineWav = new Audio('dingo.wav');
    var georgeWav = new Audio('ah_hah.wav');
    var jerryWav = new Audio('dream_hamburger.wav');
    var kramerWav = new Audio('assman.wav');

    // CREATES CHARACTERS.
    function setCond() {
        for (var property in characters) {
            var charStat = characters[property];
            $('.characters').append("<div class='char' id='" + property + "'>" + charStat.name + "<img src='" + charStat.imgSrc +"'></div>");
	    }
    }

    setCond();
    // STOPS RETRIGGERING OF CHARACTER DIVS, DECIDES BETWEEN CHARACTER AND OPPONENT.
    $('body').on('click', '.char', function(run) {
        run.preventDefault();
        run.stopPropagation();
        charElement = $(this).attr('id');

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
                $('#ticker').empty();
                $('#sticker').empty();
            }
        }
    })

 //FIGHT FUNCTION. OPPONENET ACOUNTER IS SUBTRACTED FROM CHARACTER'S HP, CHAR ATK SUBTRACTED FROM ENEMY HP. CHAR'S ATTACK POWER
 //AT A RANDOM INTERVAL BETWEEN 1 AND 6 ON EACH SUBSEQUENTLY SUCCESSFUL ATTACK. WHEN ENEMY HP RUNS OUT, YOU WIN ROUND. YOUR HP IS ZERO, YOU LOSE.
    $('#attackbutton').on('click', function(attack) {
        characters[charSel].hp = characters[charSel].hp - characters[opponent].acounter;
        characters[opponent].hp -= characters[charSel].attack;
        characters[charSel].attack += (Math.floor(Math.random() * 5) + 2);
;
        var myCharHp = characters[charSel].hp;
        var opponentCharHp = characters[opponent].hp;
        if (myCharHp <= 0) {
            myCharHp = 0;
        }
        if (opponentCharHp <= 0) {
            opponentCharHp = 0;
        }
        $('#myHpValue').text(myCharHp);
        $('#opponentHpValue').text(opponentCharHp);

        if (characters[charSel].hp <= 0) {
            document.getElementById('ticker').innerHTML = "Yada Yada Yada... You Died";
            $("#attackbutton").prop("disabled" , true);
            
        }

        if (characters[opponent].hp <= 0) {
            charElement = '';
            $('#opponent').empty();
            document.getElementById('ticker').innerHTML = "You Won This Round";
            opponentHp = '';
            opponent = '';
            enemsBeaten++;
            
        if (enemsBeaten < 3) {
                document.getElementById('sticker').innerHTML = "Pick another Clownshoe";
            };
        }

        if (enemsBeaten === 3) {
            document.getElementById('ticker').innerHTML ="It's a Festivus Miracle! (You Win)";
        }

    })
    // RESET CHARACTER STATS, ELEMENTS ON PAGE. 
    function reset() {
        characters = {
        elaine: {
            name: 'Elaine',
            hp: 130,
            attack: 12,
            acounter: 13,
            imgSrc: "assets/images/elaine.jpg",
            audio: elaineWav,
         },
        george: {
            name: 'George',
            hp: 120,
            attack: 10,
            acounter:  13,
            imgSrc: "assets/images/george.jpg",
            audio: georgeWav,
        },
        jerry: {
            name: 'Seinfeld',
            hp: 120,
            attack: 8,
            acounter: 11,
            imgSrc: "assets/images/jerry.jpg",
            audio: jerryWav,
        },
        kramer: {
            name: 'Kramer',
            hp: 180,
            attack: 5,
            acounter: 9,
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
        $("#attackbutton").prop("disabled" , false);
        setCond();
    }

    $('#resetbutton').on('click', function() {
        reset();

    })
});
