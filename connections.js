document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreBoard = document.getElementById('score');
    let score = 0;
    let activeTiles = [];


    // fuction where allows the user to see the message box with timer set to 5 seconds
    function showMessageBox(message) {
        const messageBox = document.getElementById('message-box');
        messageBox.innerText = message;
        messageBox.style.display = 'block';

        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 4000);
    }

    // This function allows user to deselect boxes that are selected
    function deselectTiles() {
        document.querySelectorAll('.tile--active').forEach(tile => {
            tile.classList.remove('tile--active');
        });
        activeTiles.length = 0; // Correctly reset the global activeTiles array
    }
    
    // This function allows the user to shuffle the tiles
    function shuffleTiles() {
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
    }

    function createTiles() {
        for (let i = 0; i < 4; i++) { // For each row
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

    // This is where content is saved to the tiles
    function assignTileContent() {
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
        assignTileContent(); // allows for random tile content
        score = 0;  
        updateScore(); 
        activeTiles = []; 

        document.getElementById('game-board').style.display = 'flex';
    }

    //
    function checkForMatch() {
        const selectedTiles = activeTiles.map(tileIndex => 
            document.querySelector(`.tile[data-index="${tileIndex}"]`));
    
        // Get the word categories of the selected tiles
        const selectedCategories = selectedTiles.map(tile => 
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
            // also remove the automatic checkForMatch() call
        }
    }

    
    document.getElementById('message-box').addEventListener('click', function() {
        this.style.display = 'none';
    });
    
    function updateScore() { // updates scores show the user that the matches tiles
        scoreBoard.innerText = `Score: ${score}`;
    }
    
    document.getElementById('play-button').addEventListener('click', function() { 
        const gameBoard = document.getElementById('game-board');
        // slide out the play button 
        this.style.animation = 'slideOut 0.5s forwards'; // This action is refer to play button
    
        // After the menu slides out, it display the game board
        setTimeout(() => {
            this.style.display = 'none'; // This allows to hide the play button
            gameBoard.style.display = 'flex'; 
            gameBoard.style.animation = 'slideIn 0.5s forwards'; // this action is refer to game board

            // loads once the grid is fully displayed
            setTimeout(() => {
            document.getElementById('shuffle-button').style.display = 'inline-block'; // This allows the shuffle button to appear
            document.getElementById('deselect-button').style.display = 'inline-block'; // This allows the deselection button to appear
            document.getElementById('submit-button').style.display = 'inline-block'; // This allows the submit button to appear
            }, 500);

            initGame(); // begins the game after play button is clicked
        }, 500); // Time when the boxes appears 
    });
    
    // This is the submit button
    document.getElementById('submit-button').addEventListener('click', function() {
        if (activeTiles.length > 0) {
        checkForMatch();}    
    });

    document.getElementById('deselect-button').addEventListener('click', deselectTiles); // This is the deselect button
    document.getElementById('shuffle-button').addEventListener('click', shuffleTiles); // This is the shuffle button
  
    gameBoard.addEventListener('click', handleTileClick);


});