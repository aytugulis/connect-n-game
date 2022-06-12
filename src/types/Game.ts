export type Move = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Player = 1 | 2;
export type MatrixValue = Player | 0;
export type NConnect = 3 | 4 | 5;
export type GameStatus =
  | "Player 1 wins!"
  | "Player 2 wins!"
  | "Game ends in a draw!";
