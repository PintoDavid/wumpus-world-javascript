// game.js
document.addEventListener("DOMContentLoaded", () => {
  let hasGold = false;
  let hasWon = false;
  let hasLost = false;
  let initialPlayerPosition = { x: 0, y: 0 };
  let goldPosition = null;

  const resetGame = () => {
    hasGold = false;
    hasWon = false;
    hasLost = false;
    document.getElementById("movePlayer").disabled = false;
    document.getElementById("resetBtn").classList.add("hidden");
    document.getElementById("message").innerText = "";
    resetPlayerPosition();
  };

  const resetPlayerPosition = () => {
    const playerCell = document.querySelector(".player").parentElement;
    playerCell.removeChild(playerCell.querySelector(".player"));
    const initialCell = document.getElementById(
      `cell-${initialPlayerPosition.y}-${initialPlayerPosition.x}`
    );
    initialCell.appendChild(createSprite("player"));
    // Actualizar la posición del jugador
    playerPosition = { ...initialPlayerPosition };
  };

  const checkConditions = () => {
    const currentCell = document.querySelector(".player").parentElement;
    const hasPit = currentCell.querySelector(".pit") !== null;
    const hasWumpus = currentCell.querySelector(".wumpus") !== null;
    const hasTreasure = currentCell.querySelector(".treasure") !== null;
    const hasGold = currentCell.querySelector(".gold") !== null;

    if (hasPit || hasWumpus) {
        hasLost = true;
        document.getElementById("message").innerText = hasPit
            ? "¡Has caído en el hoyo! ¡Has perdido!"
            : "¡El Wumpus te ha devorado! ¡Has perdido!";
        document.getElementById("movePlayer").disabled = true;
        document.getElementById("resetBtn").classList.remove("hidden");
    } else if (hasGold) {
        document.getElementById("message").innerText =
            "¡Felicidades! ¡Tienes el oro!";
        currentCell.removeChild(currentCell.querySelector(".treasure"));
        goldPosition = null;
    } else if (hasGold && currentCell.id === "cell-0-0") {
        hasWon = true;
        document.getElementById("message").innerText =
            "¡Has regresado al inicio con el oro! ¡Has ganado!";
        document.getElementById("movePlayer").disabled = true;
        document.getElementById("resetBtn").classList.remove("hidden");
    }
};


  const resetGameBtn = document.getElementById("resetBtn");
  resetGameBtn.addEventListener("click", resetGame);

  document.getElementById("generateBoard").addEventListener("click", () => {
    if (hasLost) {
      hasLost = false;
      resetGame();
    }
  });

  setInterval(checkConditions, 100); // Verificar condiciones cada 100ms

  // Función para establecer la posición del oro
  const setGoldPosition = () => {
    const boardSize = parseInt(document.getElementById("boardSize").value);
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);

    // Evitar que el oro esté en la misma posición que el jugador
    while (x === initialPlayerPosition.x && y === initialPlayerPosition.y) {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    }

    goldPosition = { x, y };
  };

  // Llamar a la función para establecer la posición del oro al generar el tablero
  document
    .getElementById("generateBoard")
    .addEventListener("click", setGoldPosition);
});
