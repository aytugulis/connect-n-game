import { Move, Player, MatrixValue, NConnect, GameStatus } from "../types/Game";

export class Game {
  matrix: MatrixValue[][];
  player: Player;
  col?: Move;
  row?: number;
  nConnect: NConnect;
  gameStatus?: GameStatus;

  constructor(nConnect: NConnect) {
    this.player = 1;
    this.gameStatus;
    this.nConnect = nConnect;
    this.matrix = Array(6)
      .fill(null)
      .map(() => Array(7).fill(0));
  }

  get currentPlayer() {
    return this.player;
  }

  get getGameStatus() {
    return this.gameStatus;
  }

  log() {
    for (const row of [...this.matrix].reverse()) {
      console.log(row.toString().replaceAll(",", ""));
    }
  }

  switchPlayer() {
    this.player = this.player === 1 ? 2 : 1;
  }

  checkMove(move: Move) {
    for (const [index, line] of this.matrix.entries()) {
      const col = line[move];
      if (!col) {
        this.col = move;
        this.row = index;
        return true;
      }
    }

    return false;
  }

  confirmMove() {
    this.matrix[this.row!][this.col!] = this.player;
  }

  checkGameEnd() {
    this.checkDraw();
    this.checkHorizontal();
    this.checkVertical();
    this.checkDiagonal();
  }

  private checkHorizontal() {
    this.checkWinner(this.matrix);
  }

  private checkVertical() {
    const transposedMatrix = this.matrix[0].map((_, colIndex) =>
      this.matrix.map((row) => row[colIndex])
    );
    this.checkWinner(transposedMatrix);
  }

  private checkDiagonal() {
    const diagonalArray = [
      ...this.diagonal(this.matrix, false),
      ...this.diagonal(this.matrix, true),
    ];

    this.checkWinner(diagonalArray);
  }

  private checkWinner(matrix: MatrixValue[][]) {
    for (const row of matrix) {
      const result = this.groupRepeatedValues(row);
      for (const arr of result) {
        if (arr.length === this.nConnect) {
          this.gameStatus =
            this.player === 1 ? "Player 1 wins!" : "Player 2 wins!";
        }
      }
    }
  }

  private checkDraw() {
    let drawStatus = true;
    for (const row of this.matrix) {
      for (const col of row) {
        if (!col) drawStatus = false;
      }
    }
    if (drawStatus) this.gameStatus = "Game ends in a draw!";
  }

  private groupRepeatedValues(arr: MatrixValue[]) {
    return arr.reduce<{ arr: MatrixValue[][]; last: MatrixValue | null }>(
      (previous, current) => {
        if (previous.last !== current) {
          previous.last = current;
          previous.arr.push([]);
        }
        if (current) previous.arr[previous.arr.length - 1].push(current);
        return previous;
      },
      { arr: [], last: null }
    ).arr;
  }

  private diagonal(matrix: MatrixValue[][], bottomToTop: boolean) {
    const Ylength = matrix.length;
    const Xlength = matrix[0].length;
    const maxLength = Math.max(Xlength, Ylength);

    const result = [];

    for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
      const temp = [];

      for (let y = Ylength - 1; y >= 0; --y) {
        const x = k - (bottomToTop ? Ylength - y : y);
        if (x >= 0 && x < Xlength) temp.push(matrix[y][x]);
      }

      result.push(temp.filter(Boolean));
    }
    return result as MatrixValue[][];
  }
}
