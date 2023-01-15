import * as process from 'process';
import Table from "./table.js";

const invalidMove = 'Robot will fall\n';

export const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export interface IRobotOptions {
  x: number;
  y: number;
  direction: number;
}

export interface IPosition {
	x: number;
	y: number;
}

export default class Robot {
  public direction: number;
  public position: IPosition;

  constructor(options: IRobotOptions) {
    const { x, y, direction } = options;
    this.direction = direction;
    this.position = { x, y };
  }

  public turnLeft(): number {
    const newDirection: number = this.direction === 0 ? 3 : this.direction - 1;
    return this.direction = newDirection;
  }

  public turnRight(): number {
    const newDirection: number = this.direction === 3 ? 0 : this.direction + 1;
    return this.direction = newDirection;
  }

  public move(table: Table): void {
    switch (this.direction) {
      case 0:
        this.position.y === table.height - 1 ? process.stdout.write(invalidMove) : ++this.position.y;
        break;
      case 1:
        this.position.x === table.width - 1 ? process.stdout.write(invalidMove) : ++this.position.x;
        break;
      case 2:
        this.position.y === 0 ? process.stdout.write(invalidMove) : --this.position.y;
        break;
      case 3:
        this.position.x === 0 ? process.stdout.write(invalidMove) : --this.position.x;
        break;
    }
  }

  public toString() {
    return `Robot is in ${this.position.x},${this.position.y} and facing ${directions[this.direction]}`;
  }
}