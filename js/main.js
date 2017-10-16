'use strict';

//VARIABLES DE BASES
var word = "";
var wordGuess = [];
var wrongGuess = [];
var rightList = [];
var guessBomb = 0;
var winCount = 1;
var guess = "";
var dif = 0;
// var wordGuessString;


//CHOIX DE LA DIFFICULTÉ________________________________________________________
function chooseDif1() {
    dif = 1;
    document.getElementById('startButton').style.display='block';
    document.getElementById('chooseDifficulty').style.display='none';
    start();
}

function chooseDif2() {
    dif = 2;
    document.getElementById('startButton').style.display='block';
    document.getElementById('chooseDifficulty').style.display='none';
    start();
}

function chooseDif3() {
    dif = 3;
    document.getElementById('startButton').style.display='block';
    document.getElementById('chooseDifficulty').style.display='none';
    start();
}

// CHOIX ALEATOIRE DANS UN TABLEAU DE MOTS _____________________________________
function wordw() {
    var randomWords = ["embauchez", "moi", "vite", "premier", "factuel", "happy", "end", "rigoureux"]
    var raNum = Math.floor(Math.random() * 8);
    return randomWords[raNum]
    }

//AFFICHAGE DU MOT CHOISI DANS UN TABLEAU AVEC DES TIRETS EN LIEU ET PLACE DES
//LETTRES_______________________________________________________________________
function wordStart() {
    var wordLength = word.length;
    var wordL_ = "";
    var count = wordLength;

    while(count > 0) {
        wordGuess.push("  _  ");
        count -= 1;
        }
        console.log(wordGuess);
}
//COMPTEUR D ERREURS S INCREMENTANT_____________________________________________
function winCountFunc() {
    var num = 0;
    var lettUsed = "";
    var count = word.length;

    while(count > 0) {
        if(lettUsed.includes(word[count - 1])) {
        }
        else{
            num += 1;
            lettUsed += word[count - 1];
        }
        count -= 1;
    }
    return num;
}
//##############################################################################
//############# LANCEMENT DU JEU EN FONCTION DES DIFFERENTS NIVEAUX ############
//##############################################################################
function start() {
    word = wordw();
    winCount = winCountFunc();
    //MODE FACILE TAILLE DU MOT + 5 CHANCES
    if(dif == 1) {
        guessBomb = word.length + 5;
    }
    //MODE NORMAL TAILLE DU MOT
    else if(dif == 2) {
        guessBomb = word.length;
    }
    //MODE DIFFICILE TAILLE DU MOT DIVISE PAR 2
    else if(dif == 3) {
        if(word.length % 2 == 0) {
           guessBomb = word.length / 2;
        }
        //MODE DIFFICILE MAIS NOMBRE IMPAIR
        else {
           guessBomb = (word.length - 1) / 2;
        }
    }
    // AFFICHAGE DANS LA CONSOLE JS DU MOT
    console.log(word);
    document.getElementById('mainGame').style.display='block';
    document.getElementById('startButton').style.display='none';

    document.getElementById("question").innerHTML = "A toi de jouer";

    wordStart();

    document.getElementById('RRguess').style.display='block';
    document.getElementById("rightGuess").innerHTML = "Mot : " + wordGuess.join(" ");
    document.getElementById("wrongGuess").innerHTML = "Mauvaise(s) lettre(s) : " + wrongGuess.join(" ");
    document.getElementById("guessesLeft").innerHTML = "Vie(s) restante(s) : " + guessBomb;

    var x = document.getElementById("guess").maxLength;
}

//verifier une lettre
function enterGuess() {
    // ACCEPTER LES MAJ COMME LES MIN DANS LE CHAMPS
    var lett = document.getElementById("guess").value.toLowerCase();
    document.getElementById("guess").value = "";

    if (lett.length === 1){
        var rightOnot = isRightOnot(lett);
        if (rightOnot == true) {
            NewCW(lett);
        }
        else {
            if(!wrongGuess.includes(lett)) {
                console.log("Cette lettre n'est pas contenue dans le mot à deviner!");
                wrongGuess.push(lett);
            }
            guessBomb -= 1;
        }
    }
    else if (lett.length < 1) {
    }
    else {
        guessBomb -= 1;
    }
    if (guessBomb <= 0) {
        // AFFICHAGE DE LA PERTE
        gameLose()
    }

    if (winCount <= 0) {
        // AFFICHAGE DE LA VICTOIRE
        gameWin()
    }
    $("#guess").keypress(function(event) {
        if (event.keyCode == 13) {
            $("#searchButton").click();
    };

});
    document.getElementById("rightGuess").innerHTML = "Mot: " + wordGuess.join(" ");
    document.getElementById("wrongGuess").innerHTML = "Mauvaise(s) lettre(s) : " + wrongGuess.join(" ");
    document.getElementById("guessesLeft").innerHTML = "Vie(s) restante(s) : " + guessBomb;
}

// RETOURNE TRUE SI LA LETTRE EST DANS LE MOT__________________________________
function isRightOnot(a) {
    var n = word.includes(a);
    return n;
}

//______________________________________________________________________________
function NewCW(letter) {
    var count = 0;
    //VERIFICATION POUR NE PAS RECOMPTABILISER LES MAUVAISES OU BONNES LETTRES
        if (!rightList.includes(letter)) {
            rightList.push(letter);
            winCount -= 1;
            };

    while (count <= word.length - 1) {
        if (letter === word[count]) {
            if(wordGuess[count] === letter) {
            }
            else {
            }
            wordGuess[count] = letter;
            count += 1;
        }
        else {
            count += 1;
        }
    }
}
// PARTIE PERDUE _______________________________________________________________
function gameLose() {
    document.getElementById('mainGame').style.display='none';
    document.getElementById('RRguess').style.display='none';
    document.getElementById('youLose').style.display='block';
    document.getElementById("correctWordWas").innerHTML = "Le bon mot était " + word;
}
//PARTIE GAGNEE_________________________________________________________________
function gameWin() {
    document.getElementById('mainGame').style.display='none';
    document.getElementById('RRguess').style.display='none';
    document.getElementById('youWin').style.display='block';
}
//RAFFRAICHISSEMENT REINITIALISATION____________________________________________
function restart() {
    document.getElementById('mainGame').style.display='none';
    document.getElementById('RRguess').style.display='none';
    document.getElementById('youLose').style.display='none';
    document.getElementById('youWin').style.display='none';
    document.getElementById('chooseDifficulty').style.display='block';

    word = "";
    wordGuess = [];
    wrongGuess = [];
    guessBomb = 0;
    winCount = 1;
    guess = "";
    dif = 0;
}
