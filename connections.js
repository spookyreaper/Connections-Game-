document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreBoard = document.getElementById('score');
    const submitButton = document.getElementById('submit-button');
    const helpBackdrop = document.getElementById('message-box2');
    const endGameBackdrop = document.getElementById('end-game-backdrop');
    let score = 0;
    let activeTiles = [];
    let matchedWords = [];
    let nextRowToReplace = 0;
    let triesLeft = 4;
    let gameStarted = false;
    let gameOver = false;
    let gameWon = false;
    let messageTimeout;

    const puzzleLevels = {
        easy: window.CONNECTION_PUZZLES,
        medium: window.CONNECTION_MEDIUM_PUZZLES,
        hard: window.CONNECTION_CHALLENGE_PUZZLES.hard,
        expert: window.CONNECTION_CHALLENGE_PUZZLES.expert,
    };
    const difficultyLabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert' };
    let selectedDifficulty = loadSelectedDifficulty();
    let puzzles = puzzleLevels[selectedDifficulty];
    const savedPuzzleIndex = loadCurrentPuzzleIndex();
    let currentPuzzleIndex = savedPuzzleIndex ?? 0;
    let lastPlayedPuzzleIndex = savedPuzzleIndex;
    const lastPlayedByDifficulty = {};
    let connection_words = puzzles[currentPuzzleIndex];

    function loadSelectedDifficulty() {
        try {
            const savedDifficulty = window.localStorage.getItem('connection-game:difficulty');
            if (Object.hasOwn(puzzleLevels, savedDifficulty)) return savedDifficulty;
        } catch {
            // The difficulty picker also works without browser storage.
        }
        return 'hard';
    }

    function selectDifficulty(difficulty) {
        if (gameStarted || !Object.hasOwn(puzzleLevels, difficulty)) return;
        selectedDifficulty = difficulty;
        puzzles = puzzleLevels[difficulty];
        const savedIndex = Object.hasOwn(lastPlayedByDifficulty, difficulty)
            ? lastPlayedByDifficulty[difficulty]
            : loadCurrentPuzzleIndex();
        currentPuzzleIndex = savedIndex ?? 0;
        lastPlayedPuzzleIndex = savedIndex;
        try {
            window.localStorage.setItem('connection-game:difficulty', difficulty);
        } catch {
            // Keep the selected level for this session when storage is unavailable.
        }
        resetGameState();
    }

    function puzzleStorageKey() {
        return `connection-game:puzzle-index:${selectedDifficulty}`;
    }

    function loadCurrentPuzzleIndex() {
        try {
            const savedValue = window.localStorage.getItem(puzzleStorageKey());
            if (savedValue === null || savedValue.trim() === '') return null;
            const savedIndex = Number(savedValue);
            if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < puzzles.length) return savedIndex;
        } catch {
            // The game still works when the browser blocks storage.
        }
        return null;
    }

    function saveCurrentPuzzleIndex() {
        try {
            window.localStorage.setItem(puzzleStorageKey(), String(currentPuzzleIndex));
        } catch {
            // Progress remains available for this session if storage is unavailable.
        }
    }

    function clearMessageBoxes() {
        clearTimeout(messageTimeout);
        document.getElementById('message-box').style.display = 'none';
    }

    function showMessageBox(message) {
        clearMessageBoxes();
        const messageBox = document.getElementById('message-box');
        messageBox.textContent = message;
        messageBox.style.display = 'block';
        messageTimeout = setTimeout(clearMessageBoxes, 4000);
    }

    function showHelpButton() {
        clearMessageBoxes();
        helpBackdrop.querySelector('.message-content').innerHTML = `
            <h2>How to play Connections</h2>
            <p>Find groups of four items that share something in common.</p>
            <ul>
                <li>Select four items and tap 'Submit' to check if your guess is correct.</li>
                <li>Find the groups without making 4 mistakes!</li>
                <li>Complete a puzzle to move on to a new set of words.</li>
                <li>Choose Easy, Medium, Hard, or Expert before playing. Harder puzzles use double meanings, phrases, and wordplay.</li>
            </ul>
            <h3>Group difficulty:</h3>
            <div class="color-explanation">
                <span class="difficulty-item"><span class="color-box easy"></span> Easy</span>
                <span class="difficulty-item"><span class="color-box moderate"></span> Moderate</span>
                <span class="difficulty-item"><span class="color-box hard"></span> Hard</span>
                <span class="difficulty-item"><span class="color-box tricky"></span> Tricky</span>
            </div>
        `;
        helpBackdrop.style.display = 'flex';
        document.getElementById('close-help-button').focus();
    }

    function closeHelpMessageBox() {
        helpBackdrop.style.display = 'none';
        document.getElementById('help-button').focus();
    }

    function closeEndGameMessageBox() {
        endGameBackdrop.style.display = 'none';
        document.getElementById('replay-button').focus();
    }

    function showEndGameMessageBox(isSuccess) {
        document.getElementById('end-game-message').textContent = isSuccess
            ? 'Good job! You matched all words.'
            : 'Better luck next time!';
        const nextButtonLabel = isSuccess ? 'Next Puzzle' : 'Try Again';
        ['next-puzzle-button', 'replay-button'].forEach(id => {
            document.getElementById(id).textContent = nextButtonLabel;
        });
        endGameBackdrop.style.display = 'flex';
        document.getElementById('next-puzzle-button').focus();
    }

    function updatePuzzleDisplay() {
        const puzzleNumber = document.getElementById('puzzle-number');
        if (puzzleNumber) puzzleNumber.textContent = `${difficultyLabels[selectedDifficulty]} · Puzzle ${currentPuzzleIndex + 1} of ${puzzles.length}`;
    }

    function startNextPuzzle() {
        if (!gameOver) return;
        if (gameWon) {
            currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
            saveCurrentPuzzleIndex();
        }
        initGame();
    }

    function startRandomPuzzle() {
        if (gameStarted) return;
        if (lastPlayedPuzzleIndex !== null && puzzles.length > 1) {
            // Pick from every index except the last puzzle without retrying a random draw.
            const randomIndex = Math.floor(Math.random() * (puzzles.length - 1));
            currentPuzzleIndex = randomIndex >= lastPlayedPuzzleIndex ? randomIndex + 1 : randomIndex;
        } else {
            currentPuzzleIndex = Math.floor(Math.random() * puzzles.length);
        }
        saveCurrentPuzzleIndex();
        initGame();
    }

    function createTiles() {
        for (let i = 0; i < 4; i++) {
            const row = document.getElementById(`row-${i}`);
            row.replaceChildren();
            for (let j = 0; j < 4; j++) {
                const tile = document.createElement('button');
                tile.type = 'button';
                tile.className = 'tile row-tile';
                tile.setAttribute('data-index', i * 4 + j);
                tile.setAttribute('aria-pressed', 'false');
                row.appendChild(tile);
            }
        }
    }

    function deselectTiles() {
        gameBoard.querySelectorAll('.tile--active').forEach(tile => {
            tile.classList.remove('tile--active');
            tile.setAttribute('aria-pressed', 'false');
        });
        activeTiles = [];
        submitButton.disabled = true;
    }

    function shuffle(contents) {
        for (let i = contents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [contents[i], contents[j]] = [contents[j], contents[i]];
        }
        return contents;
    }

    function shuffleTiles() {
        if (!gameStarted || gameOver) return;
        deselectTiles();
        const tiles = Array.from(gameBoard.querySelectorAll('.tile'));
        const contents = shuffle(tiles.map(tile => tile.getAttribute('data-content')));
        tiles.forEach((tile, index) => {
            tile.textContent = contents[index];
            tile.setAttribute('data-content', contents[index]);
        });
    }

    function resetGameState() {
        score = 0;
        activeTiles = [];
        matchedWords = [];
        nextRowToReplace = 0;
        triesLeft = 4;
        gameOver = false;
        gameWon = false;
        connection_words = puzzles[currentPuzzleIndex];
        submitButton.disabled = true;
        updatePuzzleDisplay();
        updateScoreDisplay();
        updateTriesDisplay();
        clearMessageBoxes();
    }

    function initGame() {
        // Clear solved words before assigning content for the next round.
        resetGameState();
        createTiles();
        assignTileContent();
        gameStarted = true;
        lastPlayedPuzzleIndex = currentPuzzleIndex;
        lastPlayedByDifficulty[selectedDifficulty] = currentPuzzleIndex;
        document.getElementById('game-base').classList.add('is-playing');
        helpBackdrop.style.display = 'none';
        endGameBackdrop.style.display = 'none';
        document.getElementById('menu').style.display = 'none';
        document.getElementById('hiding-this').style.display = 'none';
        document.getElementById('end-game-controls').style.display = 'none';
        document.getElementById('game-controls').style.display = 'block';
        document.getElementById('tries-left').style.display = 'flex';
        ['shuffle-button', 'deselect-button', 'submit-button', 'help-button', 'score-display'].forEach(id => {
            document.getElementById(id).style.display = 'inline-block';
        });
        gameBoard.style.display = 'flex';
        gameBoard.classList.add('fade-in-animation');
        gameBoard.querySelector('.tile').focus();
    }

    function showMainMenu(focusPlayButton = true) {
        gameStarted = false;
        document.getElementById('game-base').classList.remove('is-playing');
        resetGameState();
        helpBackdrop.style.display = 'none';
        endGameBackdrop.style.display = 'none';
        gameBoard.style.display = 'none';
        gameBoard.classList.remove('fade-in-animation');
        gameBoard.querySelectorAll('.row').forEach(row => row.replaceChildren());
        ['game-controls', 'end-game-controls', 'tries-left', 'help-button', 'score-display'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
        document.getElementById('menu').style.display = 'block';
        document.getElementById('hiding-this').style.display = 'block';
        if (focusPlayButton) document.getElementById('play-button').focus();
    }

    function finishGame(isSuccess) {
        gameOver = true;
        gameWon = isSuccess;
        deselectTiles();
        clearMessageBoxes();
        document.getElementById('game-controls').style.display = 'none';
        document.getElementById('end-game-controls').style.display = 'block';
        showEndGameMessageBox(isSuccess);
    }

    function checkForMatch() {
        if (!gameStarted || gameOver || activeTiles.length !== 4) return;
        const selectedWords = activeTiles.map(tileIndex =>
            gameBoard.querySelector(`.tile[data-index="${tileIndex}"]`).getAttribute('data-content')
        );
        const matchedGroup = connection_words.find(group =>
            selectedWords.every(word => group.words.includes(word))
        );
        if (matchedGroup) {
            score += matchedGroup.difficulty * 10;
            updateScoreDisplay();
            matchedWords.push(...matchedGroup.words);
            deselectTiles();
            const rowToReplace = document.getElementById(`row-${nextRowToReplace}`);
            displayBanner(matchedGroup.category, matchedGroup.difficulty, rowToReplace, matchedGroup.words, matchedGroup.explanation);
            nextRowToReplace++;
            assignTileContent();
            clearMessageBoxes();
            if (matchedWords.length === connection_words.length * 4) finishGame(true);
        } else {
            deselectTiles();
            triesLeft--;
            updateTriesDisplay();
            if (triesLeft === 0) {
                solveWords();
                finishGame(false);
            } else {
                const isOneAway = connection_words.some(group =>
                    selectedWords.filter(word => group.words.includes(word)).length === 3
                );
                showMessageBox(isOneAway ? 'One away! Try a different combination.' : 'Try again, those words do not match.');
            }
        }
        submitButton.disabled = true;
    }

    function assignTileContent() {
        const tileContents = shuffle(connection_words.flatMap(group =>
            group.words.filter(word => !matchedWords.includes(word))
        ));
        gameBoard.querySelectorAll('.tile').forEach((tile, index) => {
            tile.textContent = tileContents[index];
            tile.setAttribute('data-content', tileContents[index]);
        });
    }

    function handleTileClick(event) {
        if (!gameStarted || gameOver) return;
        const clickedTile = event.target.closest('.tile');
        if (!clickedTile || !gameBoard.contains(clickedTile)) return;
        const tileIndex = Number(clickedTile.getAttribute('data-index'));
        const isTileActive = clickedTile.classList.contains('tile--active');
        if (isTileActive) {
            clickedTile.classList.remove('tile--active');
            clickedTile.setAttribute('aria-pressed', 'false');
            activeTiles = activeTiles.filter(index => index !== tileIndex);
        } else if (activeTiles.length < 4) {
            clickedTile.classList.add('tile--active');
            clickedTile.setAttribute('aria-pressed', 'true');
            activeTiles.push(tileIndex);
        } else {
            return;
        }
        submitButton.disabled = activeTiles.length !== 4;
    }

    function updateTriesDisplay() {
        const triesDisplay = document.getElementById('tries-left');
        triesDisplay.setAttribute('aria-label', `${triesLeft} mistakes left`);
        triesDisplay.innerHTML = '<span class="mistakes-text">Mistakes left:</span>'
            + '<span class="try-circle" aria-hidden="true"></span>'.repeat(triesLeft);
    }

    function getDifficultyColor(difficulty) {
        return ['color-easy', 'color-normal', 'color-hard', 'color-tricky'][difficulty - 1];
    }

    function displayBanner(category, difficulty, rowToReplace, wordsToDisplay, explanation) {
        const banner = document.createElement('div');
        banner.className = `answer-banner ${getDifficultyColor(difficulty)} banner-appear-animation`;
        banner.innerHTML = `<p class="answer-category">${category}</p><p class="answer-words">${wordsToDisplay.join(', ')}</p>`;
        if (explanation) {
            const detail = document.createElement('p');
            detail.className = 'answer-explanation';
            detail.textContent = explanation;
            banner.appendChild(detail);
        }
        rowToReplace.replaceChildren(banner);
    }

    function solveWords() {
        connection_words.forEach(group => {
            if (!group.words.every(word => matchedWords.includes(word))) {
                const rowToReplace = document.getElementById(`row-${nextRowToReplace}`);
                displayBanner(group.category, group.difficulty, rowToReplace, group.words, group.explanation);
                nextRowToReplace++;
                matchedWords.push(...group.words);
            }
        });
    }

    function updateScoreDisplay() {
        scoreBoard.textContent = `Score: ${score}`;
    }

    document.getElementById('play-button').addEventListener('click', startRandomPuzzle);
    document.querySelectorAll('input[name="difficulty"]').forEach(input => {
        input.checked = input.value === selectedDifficulty;
        input.addEventListener('change', () => {
            if (input.checked) selectDifficulty(input.value);
        });
    });
    document.getElementById('next-puzzle-button').addEventListener('click', startNextPuzzle);
    document.getElementById('replay-button').addEventListener('click', startNextPuzzle);
    document.getElementById('main-menu-button').addEventListener('click', () => showMainMenu());
    document.getElementById('return-to-menu-button').addEventListener('click', () => showMainMenu());
    document.getElementById('close-end-game-button').addEventListener('click', closeEndGameMessageBox);
    document.getElementById('close-help-button').addEventListener('click', closeHelpMessageBox);
    submitButton.addEventListener('click', checkForMatch);
    document.getElementById('deselect-button').addEventListener('click', deselectTiles);
    document.getElementById('shuffle-button').addEventListener('click', shuffleTiles);
    document.getElementById('help-button').addEventListener('click', showHelpButton);
    document.getElementById('message-box').addEventListener('click', clearMessageBoxes);
    helpBackdrop.addEventListener('click', event => {
        if (event.target === helpBackdrop) closeHelpMessageBox();
    });
    endGameBackdrop.addEventListener('click', event => {
        if (event.target === endGameBackdrop) closeEndGameMessageBox();
    });
    document.addEventListener('keydown', event => {
        const visibleBackdrop = [helpBackdrop, endGameBackdrop].find(backdrop => backdrop.style.display === 'flex');
        if (!visibleBackdrop) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            if (visibleBackdrop === helpBackdrop) closeHelpMessageBox();
            else closeEndGameMessageBox();
        } else if (event.key === 'Tab') {
            const buttons = visibleBackdrop.querySelectorAll('button');
            const firstButton = buttons[0];
            const lastButton = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === firstButton) {
                event.preventDefault();
                lastButton.focus();
            } else if (!event.shiftKey && document.activeElement === lastButton) {
                event.preventDefault();
                firstButton.focus();
            }
        }
    });
    gameBoard.addEventListener('click', handleTileClick);
    showMainMenu(false);
});
