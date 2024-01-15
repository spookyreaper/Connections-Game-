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
    
    

    function assignTileContent() {
        const tileContents = [];
        for (let i = 0; i < 8; i++) {
            tileContents.push(i, i);
        }
        tileContents.sort(() => Math.random() - 0.5);
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
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

    function checkForMatch() { 
        if (activeTiles.length === 4) {
            const tiles = activeTiles.map(tile => document.querySelector(`.tile[data-index="${tile}"]`));
            const allMatch = tiles.every(tile => tile.getAttribute('data-content') === tiles[0].getAttribute('data-content'));
    
            if (allMatch) {
                score += 10; 
                updateScore();
                tiles.forEach(tile => tile.classList.add('tile--matched'));
                activeTiles = []; 
            }
           
        }
    }
    

    function handleTileClick(event) {
        if (event.target.classList.contains('tile') && !event.target.classList.contains('tile--matched')) { //tile will click on but will not match
            const tileIndex = event.target.getAttribute('data-index');
    
            // allow for tiles to be active only if they are not already active and there are less than 4 active tiles
            if (!event.target.classList.contains('tile--active') && activeTiles.length < 4) {
                event.target.classList.add('tile--active');
                activeTiles.push(tileIndex);
            }
    
            // Check for a match only when 4 tiles are active
            if (activeTiles.length === 4) {
                checkForMatch();
                // Tiles will be active unless they are matched
            }
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
    
    
    document.getElementById('submit-button').addEventListener('click', initGame);
    gameBoard.addEventListener('click', handleTileClick);

});
