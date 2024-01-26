document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreBoard = document.getElementById('score');
    let score = 0;
    let activeTiles = []; // this is where the active tiles are stored
    let matchedWords = []; // this is where the matched words are stored
    let nextRowToReplace = 0; // this `nextRowToReplace` variable will be used to determine which row to replace next
    let almostMatchedGroup = null; // add this at the beginning of your script


    function showMessageBox(message) { // this notifies the user does't have the correct answer
        const messageBox = document.getElementById('message-box');
        messageBox.innerText = message;
        messageBox.style.display = 'block';

        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 4000);
    }

    function showMessageBox2(message) { // this is where help box is displayed
        const messageBox = document.getElementById('message-box2');
        const messageContentBox = messageBox.querySelector('.message-content-box');
    
        messageContentBox.querySelector('.message-content').innerText = message;
        messageBox.style.display = 'flex'; // displays the box
    
        setTimeout(() => {
            // animate the message box
            messageBox.style.opacity = 1;
            messageContentBox.style.opacity = 1;
            messageContentBox.style.transform = 'translateY(0)';
        }, 10); 
    }

    function closeMessageBox() { // this allows user to close the message box
        const messageBox = document.getElementById('message-box2');
        const messageContentBox = messageBox.querySelector('.message-content-box');
    
        // animate the message box
        messageBox.style.opacity = 0;
        messageContentBox.style.opacity = 0;
        messageContentBox.style.transform = 'translateY(20%)';
    
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 500); 
    }
    
    function deselectTiles() { // this function allows user to deselect boxes that are selected
        document.querySelectorAll('.tile--active').forEach(tile => {
            tile.classList.remove('tile--active');
        });
        activeTiles.length = 0; // correctly reset the global activeTiles array
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
    }
    
    function shuffleTiles() {
        const tiles = Array.from(document.querySelectorAll('.tile'));
        let contents = tiles.map(tile => tile.getAttribute('data-content'));
    
        // store the number of currently active tiles
        const numberOfActiveTiles = activeTiles.length;
    
        // shuffle the contents array
        for (let i = contents.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [contents[i], contents[j]] = [contents[j], contents[i]];
        }
    
        // reassign shuffled contents to the tiles
        tiles.forEach((tile, index) => {
            tile.innerText = contents[index];
            tile.setAttribute('data-content', contents[index]);
        });
    
        // reset all tiles to be non-active
        tiles.forEach(tile => tile.classList.remove('tile--active'));
    
        // clear the current activeTiles array
        activeTiles = [];
    
        // randomly re-highlight the same number of tiles as before
        let indicesToHighlight = new Set();
        while (indicesToHighlight.size < numberOfActiveTiles) {
            let randomIndex = Math.floor(Math.random() * tiles.length);
            indicesToHighlight.add(randomIndex);
        }
    
        // highlight the tiles
        indicesToHighlight.forEach(index => {
            tiles[index].classList.add('tile--active');
            activeTiles.push(index);
        });
    
        // update the state of the submit button
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
    }
    
    
    
    

    function createTiles() { // This is where the tiles are created
        for (let i = 0; i < 4; i++) { // For each row of tiles 
            let row = document.getElementById(`row-${i}`);
            row.innerHTML = ''; 
    
            // Create 4 tiles for each row
            for (let j = 0; j < 4; j++) { 
                // Calculate the tile index
                let tileIndex = i * 4 + j;
                // Create a new div element for the tile
                let tile = document.createElement('div');
                // Add the classes and attributes to the tile
                tile.className = 'tile row-tile'; 
                // Add the tile to the row
                tile.setAttribute('data-index', tileIndex);
                // Add the tile to the row
                row.appendChild(tile);
            }
        }
    }

    // this is where arrays of words are stored
    const connection_words = [
        {
          category: "Topic of Discussion",
          words: ["ISSUE", "MATTER", "POINT", "SUBJECT"],
          difficulty: 1,
        },
        {
          category: "Section of One's Life",
          words: ["CHAPTER", "PERIOD", "PHASE", "STAGE"],
          difficulty: 2,
        },
        {
          category: "Part of a Car, Informally",
          words: ["DASH", "SHOCK", "TANK", "WHEEL"],
          difficulty: 3,
        },
        {
          category: "Color Homophones",
          words: ["BLEW", "CHORAL", "READ", "ROWS"],
          difficulty: 4,
        },
      ];

    // when the user matches the words it would show them the color of the difficulty
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
        // get all the words that have not been matched yet
        let tileContents = [];
        connection_words.forEach(group => {
            // Add only words that have not been matched yet
            const unmatchedWords = group.words.filter(word => !matchedWords.includes(word));
            // Add the words to the tileContents array
            tileContents = tileContents.concat(unmatchedWords);
        });
        tileContents.sort(() => Math.random() - 0.5);
    
        // assign the words to the tiles
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            if (index < tileContents.length) {
                // assign the word to the tile
                tile.innerText = tileContents[index];
                // store the word in the tile's data-content attribute
                tile.setAttribute('data-content', tileContents[index]); // 
            } else {
                // clear the tile's content
                tile.innerText = '';
                tile.removeAttribute('data-content');
            }
        });
    }



    function initGame() { // starts the game
        createTiles();
        assignTileContent(); 
        score = 0;  
        updateScore(); 
        activeTiles = []; 

        document.getElementById('game-board').style.display = 'flex';
    }

    function checkForMatch() { // this function checks if the user has the correct answer
        // get the selected tiles
        const selectedTiles = activeTiles.map(tileIndex => 
            // get the tile element from the tile index
            document.querySelector(`.tile[data-index="${tileIndex}"]`));

        // check if the selected tiles match any of the groups
        const matchedGroup = connection_words.find(group => 
            // check if the selected tiles match the group's words
            selectedTiles.every(tile => group.words.includes(tile.getAttribute('data-content')))
        );
    
        // if the selected tiles match a group, update the score and display the banner
        if (matchedGroup && selectedTiles.length === matchedGroup.words.length) {
            score += matchedGroup.difficulty * 10;
            updateScore();
            matchedWords.push(...matchedGroup.words);
    
            // display the banner
            if (nextRowToReplace < 4) {
                const rowToReplace = document.getElementById(`row-${nextRowToReplace}`);
                displayBanner(matchedGroup.category, matchedGroup.difficulty, rowToReplace, matchedGroup.words);
                nextRowToReplace++;
            }
    
            // reset the tiles
            resetTiles();
            // assign new words to the tiles
            assignTileContent();
            // reset the submit button
            almostMatchedGroup = null;
            activeTiles.length = 0; // correctly reset the global activeTiles array
        } else {
            // check if the selected tiles match any of the groups except for one word
            almostMatchedGroup = connection_words.find(group => 
                // check if the selected tiles match the group's words except for one word
                selectedTiles.filter(tile => group.words.includes(tile.getAttribute('data-content'))).length === 3
            );

            // if the selected tiles match a group except for one word, display the banner
            if (almostMatchedGroup && selectedTiles.length === 4) {
                showMessageBox('You are missing one!');
                // do not reset the tiles
                return;
            } else {
                showMessageBox('Try again, those words do not match.');
            }
        }
        // move the activeTiles.length above 
        document.getElementById('submit-button').disabled = true;
    }
    
    
    
    // this function displays the user the words that they matched
    function displayBanner(category, difficulty, rowToReplace, wordsToDisplay) {
        // create the banner element
        const bannerColor = getDifficultyColor(difficulty);
        const banner = document.createElement('div');
        //
        banner.className = `answer-banner ${bannerColor}`;
        // add the banner content
        banner.innerHTML = `<p>${category}<br>${wordsToDisplay.join(', ')}</p>`;
    
        // this replaces the row with the banner
        rowToReplace.innerHTML = '';
        // this adds the banner to the row
        rowToReplace.appendChild(banner);
    }
    
    
    function resetTiles() { // tiles are reset
        document.querySelectorAll('.tile--active').forEach(tile => {
            // remove the active class from the tile
            tile.classList.remove('tile--active');
            // remove the matched class from the tile
            tile.classList.remove('tile--matched'); // once matched the tiles are removed
        });
    }
    
    
    // remodified the handletileclick function to allow the user to deselect tiles and select tiles
    function handleTileClick(event) {
        const clickedTile = event.target;
        if (!clickedTile.classList.contains('tile')) {
            return;
        }
    
        const isTileActive = clickedTile.classList.contains('tile--active');
        const tileIndex = parseInt(clickedTile.getAttribute('data-index'), 10);
    
        // allows the active state of the tile regardless of the almostMatchedGroup
        if (isTileActive) {
            // tile is active it can be deselected
            clickedTile.classList.remove('tile--active');
            activeTiles = activeTiles.filter(index => index !== tileIndex);
        } else if (!isTileActive && activeTiles.length < 4) {
            // tile is not active less than 4 tiles are active, activate it
            clickedTile.classList.add('tile--active');
            activeTiles.push(tileIndex);
        }
    
        // the submit button should be enabled only when exactly 4 tiles are active
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
        event.stopPropagation();
    }
    
    function updateScore() { // updates scores show the user that the matches tiles
        scoreBoard.innerText = `Score: ${score}`;
    }
    
    
    document.getElementById('play-button').addEventListener('click', function() { 
        // slide out the play button animation
        this.style.animation = 'slideOut 0.9s forwards';
        setTimeout(() => {
            // hide the play button after animation
            this.style.display = 'none';
            document.getElementById('hiding-this').style.display = 'none';
            // display the game board
            const gameBoard = document.getElementById('game-board');
            gameBoard.style.display = 'flex';
            gameBoard.classList.add('fade-in-animation');
            // show other buttons with a slight delay
            setTimeout(() => {
                document.getElementById('shuffle-button').style.display = 'inline-block';
                document.getElementById('deselect-button').style.display = 'inline-block';
                document.getElementById('submit-button').style.display = 'inline-block';
                document.getElementById('help-button').style.display = 'inline-block';
                document.getElementById('line').style.display = 'inline-block';
                document.getElementById('feedback-button').style.display = 'inline-block';
            }, 410); // delay for the game board to appear
            // initialize the game
            initGame();
        }, 500); // duration of the slideOut animation
    });
    
    
    
    // this is the submit button
    document.getElementById('submit-button').disabled = true; // disable the submit to make sure the user selects 4 tiles
    document.getElementById('submit-button').addEventListener('click', function() {
        if (activeTiles.length > 0) {
        checkForMatch();}    
    });

    document.getElementById('deselect-button').addEventListener('click', deselectTiles); // this is the deselect button
    document.getElementById('shuffle-button').addEventListener('click', shuffleTiles); // this is the shuffle button


    document.getElementById('help-button').addEventListener('click', function() { // this is the help button
        showMessageBox2('Select 4 words that are related to each other. Click Submit to check your answer.');
    document.getElementById('message-box2').addEventListener('click', closeMessageBox);
    })
    document.getElementById('message-box').addEventListener('click', function() { // Message box
        this.style.display = 'none';
    });

    gameBoard.addEventListener('click', handleTileClick);


});