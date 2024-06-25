document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreBoard = document.getElementById('score');
    const playButton = document.getElementById('play-button');
    let score = 0;
    let activeTiles = [];
    let matchedWords = [];
    let nextRowToReplace = 0;
    let almostMatchedGroup = null;
    let triesLeft = 4;

    function showMessageBox(message) {
        const messageBox = document.getElementById('message-box');
        messageBox.innerText = message;
        messageBox.style.display = 'block';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 4000);
    }

    function showMessageBox2() {
        const messageBox = document.getElementById('message-box2');
        const messageContentBox = messageBox.querySelector('.message-content-box');
        const helpContentHTML = `
            <h2>How to play Connections</h2>
            <p>Find groups of four items that share something in common.</p>
            <ul>
                <li>Select four items and tap 'Submit' to check if your guess is correct.</li>
                <li>Find the groups without making 4 mistakes!</li>
            </ul>
            <h3>Group Examples:</h3>
            <p id="examples">Bank: Coins, Teller, Vault, Checks</p>
            <p id="examples">Tom ___: Cruise, Hanks, Bradley, Holland</p>
            <p id="examples">Each group is always going to be more detailed than "5-LETTER WORDS," "NAMES" or "VERBS."</p>
            <p id="examples">Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!</p>
            <p id="examples">Each group of words you match will show you the difficulty as you solve:</p>
            <div class="color-explanation">
                <span class="color-box easy"></span> Easy
                <span class="color-box moderate"></span> Moderate
                <span class="color-box hard"></span> Hard
                <span class="color-box tricky"></span> Tricky
            </div>
            <p id="examples">Have general feedback? <a href="#">Tell us!</a></p>
        `;
        messageContentBox.innerHTML = helpContentHTML;
        messageBox.style.display = 'flex';
        setTimeout(() => {
            messageBox.style.opacity = 1;
            messageContentBox.style.opacity = 1;
            messageContentBox.style.transform = 'translateY(0)';
        }, 10);
    }

    function showEndGameMessageBox(isSuccess) {
        const backdrop = document.getElementById('end-game-backdrop');
        const messageBox = document.getElementById('end-game-message-box');
        messageBox.innerHTML = `
            <p>${isSuccess ? 'Good job! You matched all words.' : 'Better luck next time!'}</p>
            ${isSuccess ? '<button onclick="nextPuzzle()">Next Puzzle</button>' : ''}
            <button onclick="closeEndGameMessageBox()">Main Menu</button>
        `;
        backdrop.style.display = 'flex';
    }

    function closeEndGameMessageBox() {
        const backdrop = document.getElementById('end-game-backdrop');
        backdrop.style.display = 'none';
        restartGame();
    }

    window.closeEndGameMessageBox = closeEndGameMessageBox;

    function restartGame() {
        score = 0;
        activeTiles = [];
        matchedWords = [];
        nextRowToReplace = 0;
        triesLeft = 4;
        document.getElementById('menu').style.display = 'flex';
        document.getElementById('score-display').style.display = 'none';
        document.getElementById('game-board').style.display = 'none';
        document.getElementById('shuffle-button').style.display = 'none';
        document.getElementById('deselect-button').style.display = 'none';
        document.getElementById('submit-button').style.display = 'none';
        document.getElementById('help-button').style.display = 'none';
        playButton.style.display = 'block';
        playButton.style.animation = '';
        document.getElementById('tries-left').innerHTML = '';
        updateScore();
    }

    function closeMessageBox() {
        const messageBox = document.getElementById('message-box2');
        const messageContentBox = messageBox.querySelector('.message-content-box');
        messageBox.style.opacity = 0;
        messageContentBox.style.opacity = 0;
        messageContentBox.style.transform = 'translateY(20%)';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 500);
    }

    function hideAlmostMatchedMessageBox() {
        const messageBox = document.getElementById('message-box');
        messageBox.style.display = 'none';
    }

    function deselectTiles() {
        document.querySelectorAll('.tile--active').forEach(tile => {
            tile.classList.remove('tile--active');
        });
        activeTiles.length = 0;
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
        hideAlmostMatchedMessageBox();
    }

    function shuffleTiles() {
        const tiles = Array.from(document.querySelectorAll('.tile'));
        let contents = tiles.map(tile => tile.getAttribute('data-content'));
        const numberOfActiveTiles = activeTiles.length;
        for (let i = contents.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [contents[i], contents[j]] = [contents[j], contents[i]];
        }
        tiles.forEach((tile, index) => {
            tile.innerText = contents[index];
            tile.setAttribute('data-content', contents[index]);
        });
        tiles.forEach(tile => tile.classList.remove('tile--active'));
        activeTiles = [];
        let indicesToHighlight = new Set();
        while (indicesToHighlight.size < numberOfActiveTiles) {
            let randomIndex = Math.floor(Math.random() * tiles.length);
            indicesToHighlight.add(randomIndex);
        }
        indicesToHighlight.forEach(index => {
            tiles[index].classList.add('tile--active');
            activeTiles.push(index);
        });
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
    }

    function mistakesLeft() {
        triesLeft -= 1;
        updateTriesDisplay();
        if (triesLeft === 0) {
            solveWords();
        }
    }

    function updateTriesDisplay() {
        const triesDisplay = document.getElementById('tries-left');
        let displayContent = '<span class="mistakes-text">Mistakes left:</span> ';
        for (let i = 0; i < triesLeft; i++) {
            displayContent += '<i class="fa-solid fa-skull-crossbones skull-icon"></i>';
        }
        triesDisplay.innerHTML = displayContent;
    }

    function createTiles() {
        for (let i = 0; i < 4; i++) {
            let row = document.getElementById(`row-${i}`);
            row.innerHTML = '';
            for (let j = 0; j < 4; j++) {
                let tileIndex = i * 4 + j;
                let tile = document.createElement('div');
                tile.className = 'tile row-tile';
                tile.setAttribute('data-index', tileIndex);
                row.appendChild(tile);
            }
        }
    }

    const connection_words = [
        {
            category: "Bit of Magic",
            words: ["CHARM", "CURSE", "HEX", "SPELL"],
            difficulty: 1,
        },
        {
            category: "Found Around A Fireplace",
            words: ["FLUE", "GRATE", "LOG", "POKER"],
            difficulty: 2,
        },
        {
            category: "Things Seen At A Casino",
            words: ["CARDS", "CHIPS", "DICE", "SLOTS"],
            difficulty: 3,
        },
        {
            category: "Ways To Prepare Cheese",
            words: ["CRUMBLE", "MELT", "SHRED", "SLICE"],
            difficulty: 4,
        },
    ];

    function getDifficultyColor(difficulty) {
        switch (difficulty) {
            case 1: return 'color-easy';
            case 2: return 'color-normal';
            case 3: return 'color-hard';
            case 4: return 'color-tricky';
            default: return 'color-default';
        }
    }

    function assignTileContent() {
        let tileContents = [];
        connection_words.forEach(group => {
            const unmatchedWords = group.words.filter(word => !matchedWords.includes(word));
            tileContents = tileContents.concat(unmatchedWords);
        });
        tileContents.sort(() => Math.random() - 0.5);
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            if (index < tileContents.length) {
                tile.innerText = tileContents[index];
                tile.setAttribute('data-content', tileContents[index]);
            } else {
                tile.innerText = '';
                tile.removeAttribute('data-content');
            }
        });
    }

    function initGame() {
        createTiles();
        assignTileContent();
        score = 0;
        updateScore();
        activeTiles = [];
        triesLeft = 4;
        updateTriesDisplay();
        document.getElementById('game-board').style.display = 'flex';
        document.getElementById('score-display').style.display = 'block';
    }

    function checkForMatch() {
        const selectedTiles = activeTiles.map(tileIndex =>
            document.querySelector(`.tile[data-index="${tileIndex}"]`));
        const matchedGroup = connection_words.find(group =>
            selectedTiles.every(tile => group.words.includes(tile.getAttribute('data-content')))
        );
        if (matchedGroup && selectedTiles.length === matchedGroup.words.length) {
            score += matchedGroup.difficulty * 10;
            updateScore();
            matchedWords.push(...matchedGroup.words);
            if (nextRowToReplace < 4) {
                const rowToReplace = document.getElementById(`row-${nextRowToReplace}`);
                displayBanner(matchedGroup.category, matchedGroup.difficulty, rowToReplace, matchedGroup.words);
                nextRowToReplace++;
            }
            resetTiles();
            assignTileContent();
            almostMatchedGroup = null;
            activeTiles.length = 0;
            const allMatched = connection_words.every(group =>
                group.words.every(word => matchedWords.includes(word))
            );
            if (allMatched) {
                showEndGameMessageBox(true);
            }
        } else {
            mistakesLeft();
            if (triesLeft <= 0) {
                showMessageBox('Better luck next time!');
                solveWords();
                showEndGameMessageBox(false);
            } else {
                almostMatchedGroup = connection_words.find(group =>
                    selectedTiles.filter(tile => group.words.includes(tile.getAttribute('data-content'))).length === 3
                );
                if (almostMatchedGroup && selectedTiles.length === 4) {
                    showMessageBox('You are missing one!');
                    return;
                } else {
                    showMessageBox('Try again, those words do not match.');
                }
            }
        }
        document.getElementById('submit-button').disabled = true;
    }

    function displayBanner(category, difficulty, rowToReplace, wordsToDisplay) {
        const bannerColor = getDifficultyColor(difficulty);
        const banner = document.createElement('div');
        banner.className = `answer-banner ${bannerColor}`;
        banner.innerHTML = `<p>${category}<br>${wordsToDisplay.join(', ')}</p>`;
        rowToReplace.innerHTML = '';
        rowToReplace.appendChild(banner);
        banner.classList.add('banner-appear-animation');
    }

    function resetTiles() {
        document.querySelectorAll('.tile--active').forEach(tile => {
            tile.classList.remove('tile--active');
            tile.classList.remove('tile--matched');
        });
    }

    function handleTileClick(event) {
        hideAlmostMatchedMessageBox();
        const clickedTile = event.target;
        if (!clickedTile.classList.contains('tile')) {
            return;
        }
        const isTileActive = clickedTile.classList.contains('tile--active');
        const tileIndex = parseInt(clickedTile.getAttribute('data-index'), 10);
        if (isTileActive) {
            clickedTile.classList.remove('tile--active');
            activeTiles = activeTiles.filter(index => index !== tileIndex);
        } else if (!isTileActive && activeTiles.length < 4) {
            clickedTile.classList.add('tile--active');
            activeTiles.push(tileIndex);
        }
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
        event.stopPropagation();
    }

    function updateScore() {
        scoreBoard.innerText = `Score: ${score}`;
    }

    playButton.addEventListener('click', function() {
        this.style.animation = 'slideOut 0.9s forwards';
        setTimeout(() => {
            this.style.display = 'none';
            document.getElementById('menu').style.display = 'none';
            const gameBoard = document.getElementById('game-board');
            gameBoard.style.display = 'flex';
            gameBoard.classList.add('fade-in-animation');
            setTimeout(() => {
                document.getElementById('shuffle-button').style.display = 'inline-block';
                document.getElementById('deselect-button').style.display = 'inline-block';
                document.getElementById('submit-button').style.display = 'inline-block';
                document.getElementById('help-button').style.display = 'inline-block';
                document.getElementById('score-display').style.display = 'inline-block';
            }, 410);
            initGame();
        }, 500);
    });

    function solveWords() {
        connection_words.forEach(group => {
            if (!group.words.every(word => matchedWords.includes(word))) {
                if (nextRowToReplace < 4) {
                    const rowToReplace = document.getElementById(`row-${nextRowToReplace}`);
                    displayBanner(group.category, group.difficulty, rowToReplace, group.words);
                    nextRowToReplace++;
                }
                matchedWords.push(...group.words);
            }
        });
        document.getElementById('submit-button').disabled = true;
    }

    document.getElementById('submit-button').disabled = true;
    document.getElementById('submit-button').addEventListener('click', function() {
        if (activeTiles.length > 0) {
            checkForMatch();
        }
    });

    document.getElementById('deselect-button').addEventListener('click', deselectTiles);
    document.getElementById('shuffle-button').addEventListener('click', shuffleTiles);
    document.getElementById('help-button').addEventListener('click', function() {
        showMessageBox2();
    });
    document.getElementById('message-box2').addEventListener('click', closeMessageBox);
    document.getElementById('message-box').addEventListener('click', function() {
        this.style.display = 'none';
    });
    gameBoard.addEventListener('click', handleTileClick);
});
