$(document).ready(function () {
  $("#startGame").on("click", function () {
    $("#symbolChoice").show();
  });

  $("#chooseX, #chooseO").on("click", function () {
    let playerSymbol = $(this).attr("id") === "chooseX" ? "X" : "O";
    sessionStorage.setItem("playerSymbol", playerSymbol);
    window.location.href = "../html/game.html";
  });
});
