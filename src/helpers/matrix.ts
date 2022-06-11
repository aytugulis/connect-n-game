type MatrixValue = 1 | 2 | 3;

export class Matrix {
  matrix: MatrixValue[];

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
}
