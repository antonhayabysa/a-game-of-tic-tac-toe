$(document).ready(function () {
  let results = JSON.parse(sessionStorage.getItem("gameResults")) || [];

  function updateScoreBoard() {
    $("#scoreBoard").empty();
    results.forEach(function (result, index) {
      $("#scoreBoard").append(
        `<tr><td>Игра ${index + 1}</td><td>${result.player1}</td><td>${
          result.player2
        }</td></tr>`
      );
    });
  }

  updateScoreBoard();

  $("#playAgain").on("click", function () {
    window.location.href = "../html/game.html";
  });

  $("#finishGame").on("click", function () {
    sessionStorage.clear();
    window.location.href = "../html/index.html";
  });
});
