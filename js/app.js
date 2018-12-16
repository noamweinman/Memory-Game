
var cardOpen = 0;

const MED_STAR = 16;
const LOW_STAR = 32;
let matches = 0;
let starCounter = 0;

let arr = [];
const cardTypes = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
]

init(); 

function init() {
    for (i=0; i<8 ; i++) {
        arr.push(cardTypes[i]);
        arr.push(cardTypes[i]);
    }
    shuffle(arr);
    var deck = document.querySelector('.deck');
    for (i=0; i<arr.length ; i++) {
        var card = getCard(arr[i]);
        deck.appendChild(card);
    }
    document.querySelector('.restart').addEventListener('click',initBoard);
}


function initBoard() {
    document.querySelector('.deck').innerHTML = "";
    var stars = document.querySelector('.stars');
    stars.innerHTML = "";

    for (i=0; i < 3 ; i++) {
        var li = document.createElement('li');
        var star = document.createElement('i');
        star.classList = 'fa fa-star';
        li.appendChild(star);
        stars.appendChild(li);
    }

    document.querySelector('.moves').innerHTML = 0;
    starCounter = 0;
    arr = [];
    cardOpen = 0;
    init();
}


function getCard(cardType) {
    var i = document.createElement('i');
    i.className = cardType;
    i.classList = 'fa ' + cardType;
    var element = document.createElement('li');
    element.className = "card";
    element.appendChild(i);
    element.addEventListener('click', cardClicked);
    return element;
}

function cardClicked(event) {
    updateStars();
    var target = event.target;
    if (cardOpen == 0) {
        target.classList = 'card open show';
        target.removeEventListener('click',cardClicked);
        cardOpen = 1;
    }
    else {
            var oldCard = document.querySelector('.card.open.show');
            var card1 = oldCard.firstChild.classList;
            var card2 = target.firstChild.classList;
            if (card1.value == card2.value) { //It's a match!
                oldCard.classList = 'card match';
                target.classList = 'card match';
                target.removeEventListener('click',cardClicked);
                matches ++;
                checkwin();
            }
            else {
                target.classList = 'card open show';
                setTimeout(function() {
                    target.classList = 'card';
                    oldCard.classList = 'card';
                },2000);
                oldCard.addEventListener('click',cardClicked);
            }
            cardOpen = 0;
        }
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function updateStars() {
    starCounter = starCounter + 1;
    document.querySelector('.moves').innerHTML = starCounter;
    if (starCounter == MED_STAR || starCounter == LOW_STAR) {
        var elem = document.querySelector('.stars');
        elem.removeChild(elem.firstElementChild);
    }
}


function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}


function checkwin() {
    if (matches == cardTypes.length) {
        alert ('You Won! in ' + starCounter + ' moves')
    }
}