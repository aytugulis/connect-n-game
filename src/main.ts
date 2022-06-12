import { getPrompt } from "./helpers/prompt";
import { Game } from "./helpers/Game";
import { Move, NConnect } from "./types/Game";

(async function () {
  // Getting N value
  const nConnect = await getPrompt({
    name: "Please type an N.(Must be between 3 and 6) Hint: N is the number of pieces that need to line up in order for a player to win",
    required: true,
    pattern: /^[3456]$/,
    message: "N Connect must be between 3 and 6 and it is required.",
  });

  // Welcome message
  console.log(
    `You are playing Connect ${nConnect}! The first player to get ${nConnect} pieces of the same colorvertically, horizontally, or diagonally wins.`
  );

  // Creating game
  const game = new Game(+nConnect as NConnect);

  // Game processing
  while (true) {
    // Logging the matrix
    game.log();

    // Geting move value from the user
    const move = await getPrompt({
      name: `Player ${game.currentPlayer}'s turn (between 0 and 6)`,
      required: true,
      pattern: /^[0123456]$/,
      message: "Move value must be between 0 and 6 and it is required.",
    });

    // Checking move availability
    const availability = game.checkMove(+move as Move);
    if (!availability) {
      console.log("Invalid move");
      continue;
    }

    // Confirmin move if it is available
    game.confirmMove();

    // Checking game ending or not
    game.checkGameEnd();
    if (game.getGameStatus) {
      game.log();
      console.log(game.getGameStatus);
      break;
    }

    // If game is not over switch player and move up
    game.switchPlayer();
  }
})();
