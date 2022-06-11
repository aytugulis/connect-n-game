import { getPrompt } from "./helpers/prompt";
import { Matrix } from "./helpers/matrix";

(async function () {
  // Getting N value
  const nConnect = await getPrompt({
    name: "Please type an N. Hint: N is the number of pieces that need to line up in order for a player to win",
    required: true,
  });

  // Welcome message
  console.log(
    `You are playing Connect ${nConnect}! The first player to get ${nConnect} pieces of the same colorvertically, horizontally, or diagonally wins.`
  );

  // Creating matrix
  const matrix = new Matrix();
  matrix.log();
})();
