import { getPrompt } from "./helpers/prompt";
import { Matrix } from "./helpers/Matrix";
import { Move, Player } from "./types/Game";
import colors from "@colors/colors/safe";

(async function () {
  /*   // Getting N value
  const nConnect = await getPrompt({
    name: "Please type an N. Hint: N is the number of pieces that need to line up in order for a player to win",
    required: true,
  });

  // Welcome message
  console.log(
    `You are playing Connect ${nConnect}! The first player to get ${nConnect} pieces of the same colorvertically, horizontally, or diagonally wins.`
  ); */

  // Creating matrix
  const matrix = new Matrix();

  // Game processing
  let process = true;
  let player = 1 as Player;
  while (process) {
    /*     matrix.log(); */
    const move = await getPrompt({
      name: `Player ${player}'s turn`,
      required: true,
    });

    const checking = matrix.checkMove(+move as Move);
    console.log(checking);
    if (!checking) console.log("IT IS NOT TRUE MOVE"); // maybe we can run this this loop again for one

    matrix.confirmMove(player);
    matrix.log();
    // Check game end

    // if it is valid move
    player = player === 1 ? 2 : 1;
  }
})();
