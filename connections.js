document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreBoard = document.getElementById('score');
    let score = 0;
    let activeTiles = [];


    function showMessageBox(message) { // This notifies the user does't have the correct answer
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
            messageBox.style.opacity = 1;
            messageContentBox.style.opacity = 1;
            messageContentBox.style.transform = 'translateY(0)';
        }, 10); 
    }

    function closeMessageBox() { // This allows user to close the message box
        const messageBox = document.getElementById('message-box2');
        const messageContentBox = messageBox.querySelector('.message-content-box');
    
        messageBox.style.opacity = 0;
        messageContentBox.style.opacity = 0;
        messageContentBox.style.transform = 'translateY(20%)';
    
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 500); 
    }
    
    function deselectTiles() { // This function allows user to deselect boxes that are selected
        document.querySelectorAll('.tile--active').forEach(tile => {
            tile.classList.remove('tile--active');
        });
        activeTiles.length = 0; // Correctly reset the global activeTiles array
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
    }
    
    function shuffleTiles() { // This function allows the user to shuffle the tiles
        const tiles = Array.from(document.querySelectorAll('.tile'));
        let contents = tiles.map(tile => tile.getAttribute('data-content'));
        let activeContents = activeTiles.map(index => tiles[index].getAttribute('data-content'));
    
        // Shuffle the contents array
        for (let i = contents.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [contents[i], contents[j]] = [contents[j], contents[i]];
        }
    
        // Reassign shuffled contents to the tiles
        tiles.forEach((tile, index) => {
            tile.innerText = contents[index];
            tile.setAttribute('data-content', contents[index]);
        });
    
        // reselect the active words after being shuffled
        activeTiles.length = 0;
        tiles.forEach((tile, index) => {
            if (activeContents.includes(tile.getAttribute('data-content'))) {
                tile.classList.add('tile--active');
                activeTiles.push(index);
            } else {
                tile.classList.remove('tile--active');
            }
        });
        document.getElementById('submit-button').disabled = activeTiles.length !== 4;
    }

    function createTiles() { // This is where the tiles are created
        for (let i = 0; i < 4; i++) { // For each row of tiles 
            let row = document.getElementById(`row-${i}`);
            row.innerHTML = ''; 
    
            for (let j = 0; j < 4; j++) { 
                let tileIndex = i * 4 + j;
                // Create a new div element for the tile
                let tile = document.createElement('div');
                tile.className = 'tile row-tile'; 
                tile.setAttribute('data-index', tileIndex);
                row.appendChild(tile);
            }
        }
    }

    // This is the list of categories and words that will be used in the game
    const categories = {
        "Topic of Discussion": ["ISSUE", "MATTER", "POINT", "SUBJECT"],
        "Section of One's Life": ["CHAPTER", "PERIOD", "PHASE", "STAGE"],
        "Part of a Car, Informally": ["DASH", "SHOCK", "TANK", "WHEEL"],
        "Color Homophones": ["BLEW", "CHORAL", "READ", "ROWS"]
    };

   
    function assignTileContent() {  // This is where content is saved to the tiles
    let tileContents = [];
    for (const category in categories) {
        tileContents = tileContents.concat(categories[category]);
    }
    tileContents.sort(() => Math.random() - 0.5);

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        tile.innerText = tileContents[index]; // Display the word on the tile
        tile.setAttribute('data-content', tileContents[index]);
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

    function checkForMatch() { // This is where the tiles are checked for matches
        const selectedTiles = activeTiles.map(tileIndex => 
            document.querySelector(`.tile[data-index="${tileIndex}"]`));
    
        const selectedCategories = selectedTiles.map(tile =>  // Get the word categories of the selected tiles
            Object.keys(categories).find(category => 
                categories[category]. includes(tile.getAttribute('data-content'))
            )
        );
        
        // checks if words are from the same category
        const allMatch = selectedCategories.every(category => 
            category === selectedCategories[0]);

        if (allMatch) {
            score += 10;
            updateScore();
            selectedTiles.forEach(tile => { // Add matched class to matched tiles
                tile.classList.add('tile--matched');
                tile.classList.remove('tile--active'); // Remove active class on matched tiles
            });
            activeTiles = []; // Clear the activeTiles array
            document.getElementById('message-box').style.display = 'none'; // doesn't display the message box
        } else {
            showMessageBox('Nice try! Please try again.'); // display the message box
        }
    }
    
    
    // Remodified the handletileclick function to allow the user to deselect tiles
    function handleTileClick(event) {
        if (event.target.classList.contains('tile') && !event.target.classList.contains('tile--matched')) {
            const tileIndex = parseInt(event.target.getAttribute('data-index'), 10);
            
            // If the tile is already active, remove the active class and remove the tile index from the activeTiles array
            if (event.target.classList.contains('tile--active')) {
                event.target.classList.remove('tile--active');
                const indexToRemove = activeTiles.indexOf(tileIndex);
                if (indexToRemove !== -1) { //
                    activeTiles.splice(indexToRemove, 1); 
                }
            } else if (activeTiles.length < 4) { 
                event.target.classList.add('tile--active');
                if (!activeTiles.includes(tileIndex)) { 
                    activeTiles.push(tileIndex);
                }
            }

            document.getElementById('submit-button').disabled = activeTiles.length !== 4;
            // also remove the automatic checkForMatch() call
        }
    }
    
    function updateScore() { // updates scores show the user that the matches tiles
        scoreBoard.innerText = `Score: ${score}`;
    }
    
    document.getElementById('play-button').addEventListener('click', function() { 
        // Slide out the play button animation
        this.style.animation = 'slideOut 0.9s forwards';
        setTimeout(() => {
            // Hide the play button after animation
            this.style.display = 'none';
            document.getElementById('hiding-this').style.display = 'none';
            // Display the game board
            const gameBoard = document.getElementById('game-board');
            gameBoard.style.display = 'flex';
            gameBoard.classList.add('fade-in-animation');
            // Show other buttons with a slight delay
            setTimeout(() => {
                document.getElementById('shuffle-button').style.display = 'inline-block';
                document.getElementById('deselect-button').style.display = 'inline-block';
                document.getElementById('submit-button').style.display = 'inline-block';
                document.getElementById('help-button').style.display = 'inline-block';
                document.getElementById('line').style.display = 'inline-block';
                document.getElementById('feedback-button').style.display = 'inline-block';
            }, 410); // Delay for the game board to appear
            // Initialize the game
            initGame();
        }, 500); // Duration of the slideOut animation
    });
    
    
    
    // This is the submit button
    document.getElementById('submit-button').disabled = true; // Disable the submit to make sure the user selects 4 tiles
    document.getElementById('submit-button').addEventListener('click', function() {
        if (activeTiles.length > 0) {
        checkForMatch();}    
    });

    document.getElementById('deselect-button').addEventListener('click', deselectTiles); // This is the deselect button
    document.getElementById('shuffle-button').addEventListener('click', shuffleTiles); // This is the shuffle button


    document.getElementById('help-button').addEventListener('click', function() { // This is the help button
        showMessageBox2('Select 4 words that are related to each other. Click Submit to check your answer.');
    document.getElementById('message-box2').addEventListener('click', closeMessageBox);
    })
    document.getElementById('message-box').addEventListener('click', function() { // Message box
        this.style.display = 'none';
    });

    gameBoard.addEventListener('click', handleTileClick);


});