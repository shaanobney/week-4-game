$(document).ready(function() {

//CHARACTER BANK WITH COMBAT STATS.

    var characters = {
        elaine: {
            name: 'Elaine',
            hp: 120,
            attack: 10,
            acounter: 10,
            imgSrc: "assets/images/elaine.jpg",
            clip: new Audio('dingo.wav'),
         },
        george: {
            name: 'George',
            hp: 130,
            attack: 8,
            acounter:  9,
            imgSrc: "assets/images/george.jpg",
            clip: georgeWav,
        },
        jerry: {
            name: 'Seinfeld',
            hp: 110,
            attack: 7,
            acounter: 11,
            imgSrc: "assets/images/jerry.jpg",
            clip: jerryWav,
        },
        kramer: {
            name: 'Kramer',
            hp: 140,
            attack: 8,
            acounter: 8,
            imgSrc: "assets/images/kramer.jpg",
            clip: kramerWav,
        }
    };

    // VARIABLES.
    var charElement = '';
    var charSel = 0;
    var opponent = '';
    var opponentHp = '';
    var myCharToggle = false;
    var opponentToggle = false;
    var myHp = 0;
    var myWav = "";
    var enemsBeaten = 0;
    var elaineWav = new Audio('dingo.wav');
    var georgeWav = new Audio('ah_hah.wav');
    var jerryWav = new Audio('dream_hamburger.wav');
    var kramerWav = new Audio('assman.wav');
    var themeFeld = new Audio('seinfeld.mp3');
    var lostFeld = new Audio('lostfeld.wav');

    // CREATES CHARACTERS.
    function setCond() {
        for (var property in characters) {
            var charStat = characters[property];
            $('.characters').append("<div class='char' id='" + property + "'>" + charStat.name + "<img src='" + charStat.imgSrc +"'></div>");
	    }
    }

    setCond();
    // STOPS RETRIGGERING OF CHARACTER DIVS, INPUT DECIDES BETWEEN CHARACTER AND OPPONENT.
    $('body').on('click', '.char', function(run) {
        run.preventDefault();
        run.stopPropagation();
        charElement = $(this).attr('id');
        $('charselect').css('color', 'red');
        document.getElementById('charselect').innerHTML = "CLICK BELOW TO CHOOSE VILLAIN";
        $("#charselect").css("color", "red");

        if (opponentToggle === false) {
            charSel = charElement;
            $("#charSel").append($('#' + charSel));
            myHp = characters[charSel].hp;
            myWav = characters[charSel].clip;
            $('#myHpValue').text(characters[charSel].hp);
            opponentToggle = true;
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
        characters[charSel].attack += (Math.floor(Math.random() * 7) + 4);
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
            lostFeld.play();
            
        }

        if (characters[opponent].hp <= 0) {
            charElement = '';
            $('#opponent').empty();
            document.getElementById('ticker').innerHTML = "You Won This Round";
            opponentHp = '';
            opponent = '';
            enemsBeaten++;
            
        if (enemsBeaten < 3) {
                document.getElementById('sticker').innerHTML = "Pick Another Clownshoe";
            };
        }

        if (enemsBeaten === 3) {
            document.getElementById('ticker').innerHTML ="It's a Festivus Miracle! (You Win)";
            themeFeld.play();
        }

    })
    // RESET CHARACTER STATS, ELEMENTS ON PAGE. 
    function reset() {
        characters = {
        elaine: {
            name: 'Elaine',
            hp: 130,
            attack: 13,
            acounter: 13,
            imgSrc: "assets/images/elaine.jpg",
            clip: elaineWav,
         },
        george: {
            name: 'George',
            hp: 120,
            attack: 11,
            acounter:  13,
            imgSrc: "assets/images/george.jpg",
            clip: georgeWav,
        },
        jerry: {
            name: 'Seinfeld',
            hp: 120,
            attack: 9,
            acounter: 11,
            imgSrc: "assets/images/jerry.jpg",
            clip: jerryWav,
        },
        kramer: {
            name: 'Kramer',
            hp: 180,
            attack: 5,
            acounter: 9,
            imgSrc: "assets/images/kramer.jpg",
            clip: kramerWav,
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
        $('#charselect').html("CLICK BELOW TO CHOOSE HERO");
        $("#charselect").css("color", "black");
        $("#attackbutton").prop("disabled" , false);
        setCond();
    }

    $('#resetbutton').on('click', function() {
        reset();

    })
});
