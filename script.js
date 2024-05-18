// script.js
document.addEventListener("DOMContentLoaded", () => {
  const boardSizeSelect = document.getElementById("boardSize");
  const generateBoardBtn = document.getElementById("generateBoard");
  const toggleBlackLayerBtn = document.getElementById("toggleBlackLayer");
  const boardContainer = document.getElementById("board");
  let boardSize = parseInt(boardSizeSelect.value);
  let blackLayerVisible = true;
  let board = [];

  generateBoardBtn.addEventListener("click", generateBoard);
  toggleBlackLayerBtn.addEventListener("click", toggleBlackLayer);

  function generateBoard() {
    boardSize = parseInt(boardSizeSelect.value);
    boardContainer.innerHTML = "";
    boardContainer.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;
    boardContainer.style.gridTemplateRows = `repeat(${boardSize}, 50px)`;

    board = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        boardContainer.appendChild(cell);

        const blackLayer = document.createElement("div");
        blackLayer.classList.add("sprite", "black-layer");
        cell.appendChild(blackLayer);

        row.push({
          element: cell,
          hasPlayer: false,
          hasGold: false,
          hasPit: false,
          hasWumpus: false,
        });
      }
      board.push(row);
    }
  }

  function toggleBlackLayer() {
    blackLayerVisible = !blackLayerVisible;
    const blackLayers = document.querySelectorAll(".black-layer");
    blackLayers.forEach((layer) => {
      const parentCell = layer.parentElement;
      const isPlayerCell = parentCell.querySelector(".player") !== null;
      if (isPlayerCell) return;

      if (blackLayerVisible) {
        layer.classList.remove("hidden");
      } else {
        layer.classList.add("hidden");
      }
    });
  }
});
