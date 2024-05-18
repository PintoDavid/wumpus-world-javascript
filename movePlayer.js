// movePlayer.js
document.addEventListener("DOMContentLoaded", () => {
  let playerPosition = { x: 0, y: 0 }; // Definir playerPosition

  const movePlayerBtn = document.getElementById("movePlayer");
  const toggleBlackLayerBtn = document.getElementById("toggleBlackLayer");
  const visitedCells = new Set(); // Conjunto para almacenar las celdas visitadas por el jugador

  function movePlayer() {
    const boardSize = parseInt(document.getElementById("boardSize").value);
    const cells = Array.from(document.getElementsByClassName("cell"));
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 }, // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }, // Right
    ];

    // Find a valid direction to move
    let newPosition;
    let validMove = false;

    while (!validMove) {
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
      const newX = playerPosition.x + direction.x;
      const newY = playerPosition.y + direction.y;

      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
        const newCellIndex = newY * boardSize + newX;
        const newCell = cells[newCellIndex];
        const hasStench = newCell.querySelector(".stench") !== null;
        const hasWater = newCell.querySelector(".water") !== null;

        // Si la nueva celda tiene mal olor o agua
        if (hasStench || hasWater) {
          const hasPit = newCell.querySelector(".pit") !== null;
          const hasWumpus = newCell.querySelector(".wumpus") !== null;

          // Si la nueva celda tiene un oyo o el Wumpus, retrocede
          if (hasPit || hasWumpus) {
            continue; // Vuelve al inicio del bucle para seleccionar otra dirección
          }
        }

        newPosition = { x: newX, y: newY };
        validMove = true;
      }
    }

    // Move player to new position
    const oldCellIndex = playerPosition.y * boardSize + playerPosition.x;
    const newCellIndex = newPosition.y * boardSize + newPosition.x;

    const oldCell = cells[oldCellIndex];
    const newCell = cells[newCellIndex];

    const playerSprite = oldCell.querySelector(".player");
    if (playerSprite) {
      oldCell.removeChild(playerSprite);
      newCell.appendChild(playerSprite);
    }

    // Update global player position
    playerPosition = newPosition;

    // Remove black layer from the new player's cell
    const blackLayer = newCell.querySelector(".black-layer");
    if (blackLayer) {
      blackLayer.classList.add("hidden");
      visitedCells.add(newCell); // Añadir la celda al conjunto de celdas visitadas
    }
  }

  function toggleBlackLayer() {
    const blackLayers = document.querySelectorAll(".black-layer");
    blackLayers.forEach((layer) => {
      const parentCell = layer.parentElement;
      const isPlayerCell = parentCell.querySelector(".player") !== null;
      if (isPlayerCell) return;

      if (layer.classList.contains("hidden")) {
        // Verificar si la celda ya fue visitada antes de volver a poner la capa negra
        if (!visitedCells.has(parentCell)) {
          layer.classList.remove("hidden");
        }
      } else {
        layer.classList.add("hidden");
      }
    });
  }

  movePlayerBtn.addEventListener("click", movePlayer);
  toggleBlackLayerBtn.addEventListener("click", toggleBlackLayer);
});
