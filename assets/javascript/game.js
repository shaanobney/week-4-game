$(document).ready(function() {

//CHARACTER BANK WITH COMBAT STATS.

    var characters = {
        elaine: {
            name: 'Elaine',
            hitPoints: 120,
            attack: 10,
            acounter: 10,
            charPort: "assets/images/elaine.jpg",
            clip: new Audio('dingo.wav'),
         },
        george: {
            name: 'George',
            hitPoints: 130,
            attack: 8,
            acounter:  9,
            charPort: "assets/images/george.jpg",
            clip: new Audio('ah_hah.wav'),
        },
        jerry: {
            name: 'Seinfeld',
            hitPoints: 110,
            attack: 7,
            acounter: 11,
            charPort: "assets/images/jerry.jpg",
            clip: new Audio('dream_hamburger.wav'),
        },
        kramer: {
            name: 'Kramer',
            hitPoints: 140,
            attack: 8,
            acounter: 8,
            charPort: "assets/images/kramer.jpg",
            clip: new Audio('assman.wav'),
        }
    };

    // VARIABLES.
    var charElement = '';
    var charSel = 0;
    var charPick = 0;
    var opponent = '';
    var opponentHp = '';
    var myWav = "";
    var myHp = 0;
    var enemsBeaten = 0;
    var elaineWav = new Audio('dingo.wav');
    var georgeWav = new Audio('ah_hah.wav');
    var jerryWav = new Audio('dream_hamburger.wav');
    var kramerWav = new Audio('assman.wav');
    var themeFeld = new Audio('seinfeld.mp3');
    var lostFeld = new Audio('lostfeld.wav');
    var myCharToggle = false;
    var opponentToggle = false;

    // CREATES CHARACTERS.
    function setCond() {
        for (var property in characters) {
            var charStat = characters[property];
            $('.characters').append("<div class='char' id='" + property + "'>" + charStat.name + "<img src='" + charStat.charPort +"'></div>");
	    }
    }

    setCond();
    // STOPS RETRIGGERING OF CHARACTER DIVS, INPUT DECIDES BETWEEN CHARACTER AND OPPONENT, PLAYS AUDIO, CHANGES HEADING STYLES.
    $('body').on('click', '.char', function(run) {
        run.preventDefault();
        run.stopPropagation();
        charElement = $(this).attr('id');
        charPick = charElement;
        $('charselect').css('color', 'red');
        document.getElementById('charselect').innerHTML = "CLICK BELOW TO CHOOSE VILLAIN";
        $("#charselect").css({"color": "red", "text-shadow": "1px 1px black"});
        characters[charPick].clip.play();

        if (opponentToggle === false) {
            charSel = charElement;
            $("#charSel").append($('#' + charSel));
            myWav = characters[charSel].clip;
            myHp = characters[charSel].hitPoints;
            $('#myHpValue').text(characters[charSel].hitPoints);
            opponentToggle = true;
        }
 
        else {
            if (opponent === '') {
                opponent = charElement;
                $("#opponent").append($('#' + opponent));
                opponentHp = characters[opponent].hitPoints;
                $('#opponentHpValue').text(characters[opponent].hitPoints);
                $('#ticker').empty();
                $('#sticker').empty();
            }
        }
    })

 //FIGHT FUNCTION. OPPONENET ACOUNTER IS SUBTRACTED FROM CHARACTER'S HP, CHAR ATK SUBTRACTED FROM ENEMY HP. CHAR'S ATTACK POWER
 //AT A RANDOM INTERVAL BETWEEN 1 AND 6 ON EACH SUBSEQUENTLY SUCCESSFUL ATTACK. WHEN ENEMY HP RUNS OUT, YOU WIN ROUND. YOUR HP IS ZERO, YOU LOSE.
    $('#attackbutton').on('click', function(attack) {
        characters[charSel].hitPoints = characters[charSel].hitPoints - characters[opponent].acounter;
        characters[opponent].hitPoints -= characters[charSel].attack;
        characters[charSel].attack += (Math.floor(Math.random() * 7) + 4);
;
        var myCharHp = characters[charSel].hitPoints;
        var opponentCharHp = characters[opponent].hitPoints;
        if (myCharHp <= 0) {
            myCharHp = 0;
        }
        if (opponentCharHp <= 0) {
            opponentCharHp = 0;
        }
        $('#myHpValue').text(myCharHp);
        $('#opponentHpValue').text(opponentCharHp);

        if (characters[charSel].hitPoints <= 0) {
            document.getElementById('ticker').innerHTML = "Yada Yada Yada... You Died";
            $("#attackbutton").prop("disabled" , true);
            lostFeld.play();
            
        }

        if (characters[opponent].hitPoints <= 0) {
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
            hitPoints: 120,
            attack: 10,
            acounter: 10,
            charPort: "assets/images/elaine.jpg",
            clip: new Audio('dingo.wav'),
         },
        george: {
            name: 'George',
            hitPoints: 130,
            attack: 8,
            acounter:  9,
            charPort: "assets/images/george.jpg",
            clip: new Audio('ah_hah.wav'),
        },
        jerry: {
            name: 'Seinfeld',
            hitPoints: 110,
            attack: 7,
            acounter: 11,
            charPort: "assets/images/jerry.jpg",
            clip: new Audio('dream_hamburger.wav'),
        },
        kramer: {
            name: 'Kramer',
            hitPoints: 140,
            attack: 8,
            acounter: 8,
            charPort: "assets/images/kramer.jpg",
            clip: new Audio('assman.wav'),
            }
        };

        charElement = '';
        opponent = '';
        opponentToggle = false;
        charSel = '';
        enemsBeaten = 0;
        $('.characters').empty();
        $('#myHpValue').empty();
        $('#opponentHpValue').empty();
        $('#charSel').empty();
        $('#opponent').empty();
        $('#ticker').empty();
        $('#charselect').html("CLICK BELOW TO CHOOSE HERO");
        $("#charselect").css({"color": "black", "text-shadow": "1px 1px aqua"});
        $("#attackbutton").prop("disabled" , false);
        setCond();
    }

    $('#resetbutton').on('click', function() {
        reset();

    })
});
