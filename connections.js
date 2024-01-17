document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreBoard = document.getElementById('score');
    let score = 0;
    let activeTiles = [];


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



    function initGame() { //
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
        } else {
            alert("Incorrect match. Try again!");
            // Do not reset active tiles here. Let the user deselect manually
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
                activeTiles.push(tileIndex);
            }
            // also remove the automatic checkForMatch() call
        }
    }
    
    
    

    function updateScore() { // updates scores show the user that the matches tiles
        scoreBoard.innerText = `Score: ${score}`;
    }
    
    document.getElementById('play-button').addEventListener('click', function() { 
        const gameBoard = document.getElementById('game-board'); // 
    
        // slide out the play button 
        this.style.animation = 'slideOut 0.5s forwards'; // This action is refer to play button
    
        // After the menu slides out, it display the game board
        setTimeout(() => {
            this.style.display = 'none'; // This allows to hide the play button
            gameBoard.style.display = 'flex'; 
            gameBoard.style.animation = 'slideIn 0.5s forwards'; // this action is refer to game board
            initGame(); // begins the game after play button is clicked
        }, 500); // Time when the boxes appears 
    });
    
    // This is the submit button
    document.getElementById('submit-button').addEventListener('click', function() {
        if (activeTiles.length > 0) {
        checkForMatch();
        } else {
        alert("Please select some tiles before submitting.");
        }
        });

     gameBoard.addEventListener('click', handleTileClick);


});