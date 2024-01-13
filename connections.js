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
    

    function handleTileClick(event) { // allows for tile to be clicked on
        if (event.target.classList.contains('tile') && !event.target.classList.contains('tile--matched')) { //tile will click on but will not match
        const tileIndex = event.target.getAttribute('data-index'); 
            if (event.target.classList.contains('tile--active')) { // shows tile is active
                event.target.classList.remove('tile--active'); // deselects tile
                activeTiles = activeTiles.filter(index => index !== tileIndex);
            } else if (activeTiles.length < 4) { // only allows 4 tiles to be clicked on
                event.target.classList.add('tile--active'); 
                activeTiles.push(tileIndex); 
            }
    
            if (activeTiles.length === 4) {
                checkForMatch();
            }

       } else if (activeTiles.length === 4) {
           activeTiles.forEach(tile => {
               document.querySelector(`.tile[data-index="${tile}"]`).classList.remove('tile--active');
           });
           activeTiles = [];
       }
    }

    function updateScore() { // updates score user matches tiles
        scoreBoard.innerText = `Score: ${score}`;
    }

    document.getElementById('submit-button').addEventListener('click', initGame);
    gameBoard.addEventListener('click', handleTileClick);

    initGame();
});
