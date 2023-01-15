import * as process from 'process';
import chalk from 'chalk';
import Table, { IPosition } from "./table.js";
import { directions } from "./constants.js";

const invalidMove = chalk.red.bold('Robot will fall' + '\n');

export interface IRobotOptions {
  x: number;
  y: number;
  direction: number;
}

export default class Robot {
  public direction: number;
  private position: IPosition;

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
      default:
        break;
    }
  }

  public toString() {
    return `Robot is in ${this.position.x},${this.position.y} and facing ${directions[this.direction]}`;
  }
}