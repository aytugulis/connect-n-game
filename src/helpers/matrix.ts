import { MatrixValue } from "../types/Matrix";
import { Move, Player } from "../types/Game";

export class Matrix {
  matrix: MatrixValue[][];
  col?: Move;
  row?: number;

  constructor() {
    this.matrix = Array(6).fill(Array(7).fill(0));
  }

  /*   get value() {
    return this.matrix;
  } */

  log() {
    for (const line of this.matrix) {
      console.log(line.toString().replaceAll(",", ""));
    }
  }

  checkMove(move: Move) {
    for (const [index, line] of this.matrix.entries()) {
      const col = line[move];
      if (!col) {
        this.col = move;
        this.row = index;
        return { availability: true };
      }
    }

    return { availability: false };
  }

  confirmMove(player: Player) {
    this.matrix[this.row!][this.col!] = player;
  }
}
