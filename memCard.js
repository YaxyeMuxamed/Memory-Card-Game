$(document).ready(function () {
    const cardValues = [
        'images/aiHealth.jpeg', 'images/aiHealth.jpeg',
        'images/animal.jpeg', 'images/animal.jpeg',
        'images/bird.jpeg', 'images/bird.jpeg',
        'images/images.jpeg', 'images/images.jpeg',
        'images/nature.jpeg', 'images/nature.jpeg',
        'images/rain.jpeg', 'images/rain.jpeg',
        'images/seattle.jpeg', 'images/seattle.jpeg',
        'images/technology.jpeg', 'images/technology.jpeg'
    ];

    let firstCard = null;
    let secondCard = null;
    let moveCount = 0;
    let timer = 0;
    let timerInterval;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        const gameBoard = $('#game-board');
        gameBoard.empty();
        const shuffledValues = shuffle([...cardValues]);
        shuffledValues.forEach(value => {
            const card = $('<div class="card"></div>');
            const frontFace = $('<div class="front-face"></div>');
            const backFace = $('<div class="back-face"><img src="' + value + '" alt="Card image"></div>');
            card.append(frontFace, backFace);
            card.on('click', handleCardClick);
            gameBoard.append(card);
        });
    }

    function handleCardClick() {
        if ($(this).hasClass('flipped') || $(this).hasClass('matched')) return;
        if (!firstCard) {
            firstCard = $(this).addClass('flipped');
        } else if (!secondCard) {
            secondCard = $(this).addClass('flipped');
            moveCount++;
            $('#move-counter').text(moveCount);
            if (firstCard.find('.back-face img').attr('src') === secondCard.find('.back-face img').attr('src')) {
                firstCard.addClass('matched');
                secondCard.addClass('matched');
                firstCard = null;
                secondCard = null;
                checkGameEnd();
            } else {
                setTimeout(() => {
                    firstCard.removeClass('flipped');
                    secondCard.removeClass('flipped');
                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    }

    function startGame() {
        moveCount = 0;
        timer = 0;
        $('#move-counter').text(moveCount);
        $('#timer').text(timer);
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer++;
            $('#timer').text(timer);
        }, 1000);
        createBoard();
    }

    function checkGameEnd() {
        if ($('.card.matched').length === cardValues.length) {
            clearInterval(timerInterval);
            alert(`Congratulations! You completed the game in ${moveCount} moves and ${timer} seconds.`);
        }
    }

    $('#restart-button').on('click', startGame);

    startGame();
});
