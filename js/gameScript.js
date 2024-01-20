$(document).ready(function () {
  let playerSymbol = sessionStorage.getItem("playerSymbol");
  let opponentSymbol = playerSymbol === "X" ? "O" : "X";
  let currentPlayer = playerSymbol;
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameEnded = false;

  for (let i = 0; i < 9; i++) {
    $("#gameBoard").append('<div id="cell' + i + '" class="game-cell"></div>');
  }

  $("#currentPlayer").text(currentPlayer === "X" ? "Хрестик" : "Нолик");

  $(".game-cell").on("click", function () {
    if (!gameEnded && !$(this).hasClass("occupied")) {
      let symbol =
        currentPlayer === "X"
          ? "<i class='fas fa-times'></i>"
          : "<i class='far fa-circle'></i>";
      $(this).html(symbol).addClass("occupied");
      board[$(this).attr("id").replace("cell", "")] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      $("#currentPlayer").text(currentPlayer === "X" ? "Хрестик" : "Нолик");
      checkGameStatus();
    }
  });

  function checkGameStatus() {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winCombinations.forEach(function (combo) {
      if (
        board[combo[0]] !== "" &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[0]] === board[combo[2]]
      ) {
        gameEnded = true;
        let winner = board[combo[0]] === "X" ? playerSymbol : opponentSymbol;
        alert(winner === "X" ? "Хрестик переміг!" : "Нолик переміг!");
        saveGameResults(winner);
        window.location.href = "../html/results.html";
      }
    });

    if (!gameEnded && !board.includes("")) {
      gameEnded = true;
      alert("Нічия!");
      window.location.href = "../html/results.html";
    }
  }

  $("#endGame").on("click", function () {
    window.location.href = "../html/results.html";
  });

  function saveGameResults(winner) {
    let results = JSON.parse(sessionStorage.getItem("gameResults")) || [];
    let newResult =
      winner === "X" ? { player1: 1, player2: 0 } : { player1: 0, player2: 1 };
    results.push(newResult);
    sessionStorage.setItem("gameResults", JSON.stringify(results));
  }
});
