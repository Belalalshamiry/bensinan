const cards = [
    {name: '1', id: 1}, {name: '1', id: 2},
    {name: '2', id: 3}, {name: '2', id: 4},
    {name: '3', id: 5}, {name: '3', id: 6},
    {name: '4', id: 7}, {name: '4', id: 8},
    {name: '5', id: 9}, 
  
];

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let time = 0;

// Shuffle cards
function shuffleCards() {
    let shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create cards
function createCards() {
    const shuffledCards = shuffleCards();
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${card.name}</div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
}

// Start timer
function startTimer() {
    timer = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Flip card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
        updateMoves();
    }
}

// Check if cards match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.name === card2.dataset.name) {
        matchedCards.push(card1, card2);
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }

    if (matchedCards.length === cards.length) {
        clearInterval(timer);
        setTimeout(() => {
            alert('تهانينا! فزت باللعبة!');
        }, 500);
    }
}

// Update moves counter
function updateMoves() {
    moves++;
    document.getElementById('moves').textContent = `الحركات: ${moves}`;
}

// Reset game
function resetGame() {
    moves = 0;
    time = 0;
    document.getElementById('moves').textContent = `الحركات: 0`;
    document.getElementById('timer').textContent = '00:00';
    clearInterval(timer);
    createCards();
    startTimer();
}

document.querySelector('.reset-btn').addEventListener('click', resetGame);

createCards();
startTimer();
