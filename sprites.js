// sprites.js
let playerPosition = { x: 0, y: 0 }; // Variable global para almacenar la posición del jugador

document.addEventListener("DOMContentLoaded", () => {
  const boardContainer = document.getElementById("board");

  function generateSprites() {
    const cells = Array.from(boardContainer.getElementsByClassName("cell"));
    const boardSize = Math.sqrt(cells.length);
    const positions = {
      gold: getRandomPosition(boardSize),
      player: { x: 0, y: 0 },
      pits: [],
      wumpus: [],
    };

    // Ensure gold is not placed on the player's initial position
    while (positions.gold.x === 0 && positions.gold.y === 0) {
      positions.gold = getRandomPosition(boardSize);
    }

    // Generate pits and surrounding water
    for (let i = 0; i < Math.floor(boardSize / 2); i++) {
      let pitPosition = getRandomPosition(boardSize);
      while (isConflict(pitPosition, positions)) {
        pitPosition = getRandomPosition(boardSize);
      }
      positions.pits.push(pitPosition);
      generateSurrounding(cells, pitPosition, "water", boardSize);
    }

    // Generate Wumpus and surrounding stench
    for (let i = 0; i < Math.floor(boardSize / 2); i++) {
      let wumpusPosition = getRandomPosition(boardSize);
      while (isConflict(wumpusPosition, positions)) {
        wumpusPosition = getRandomPosition(boardSize);
      }
      positions.wumpus.push(wumpusPosition);
      generateSurrounding(cells, wumpusPosition, "stench", boardSize);
    }

    // Place the sprites on the board
    placeSprite(cells, positions.gold, "gold");
    placeSprite(cells, positions.player, "player");
    positions.pits.forEach((pit) => placeSprite(cells, pit, "pit"));
    positions.wumpus.forEach((w) => placeSprite(cells, w, "wumpus"));

    // Remove the black layer from the player's cell
    const playerIndex = positions.player.y * boardSize + positions.player.x;
    const playerCell = cells[playerIndex];
    const blackLayer = playerCell.querySelector(".black-layer");
    if (blackLayer) {
      blackLayer.classList.add("hidden");
    }

    // Update global player position
    playerPosition = positions.player;
  }

  function getRandomPosition(boardSize) {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }

  function isConflict(position, positions) {
    if (position.x === 0 && position.y === 0) return true; // Player's initial position
    if (positions.gold.x === position.x && positions.gold.y === position.y)
      return true;
    if (positions.pits.some((p) => p.x === position.x && p.y === position.y))
      return true;
    if (positions.wumpus.some((w) => w.x === position.x && w.y === position.y))
      return true;
    return false;
  }

  function generateSurrounding(cells, position, spriteClass, boardSize) {
    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];
    directions.forEach((dir) => {
      const newX = position.x + dir.x;
      const newY = position.y + dir.y;
      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
        const index = newY * boardSize + newX;
        const cell = cells[index];
        const sprite = document.createElement("div");
        sprite.classList.add("sprite", spriteClass);
        cell.appendChild(sprite);
      }
    });
  }

  function placeSprite(cells, position, spriteClass) {
    const boardSize = Math.sqrt(cells.length);
    const index = position.y * boardSize + position.x;
    const cell = cells[index];
    const sprite = document.createElement("div");
    sprite.classList.add("sprite", spriteClass);
    cell.appendChild(sprite);
  }

  // Add event listener to generate sprites when the board is generated
  const generateBoardBtn = document.getElementById("generateBoard");
  generateBoardBtn.addEventListener("click", generateSprites);
});
