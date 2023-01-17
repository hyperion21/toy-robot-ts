import * as process from 'process';
import Table from "./table.js";

const invalidMove = 'Robot will fall\n';
const invalidPlace = 'FAILED: Robot is not yet placed\n';

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
  public direction: number | null;
  public position: IPosition | null;
  
  constructor() {
    this.direction = null;
    this.position = null;
  }

  public placeRobot(options: IRobotOptions): void {
    const { x, y, direction } = options;
    this.direction = direction;
    this.position = { x, y };
    process.stdout.write(`SUCCESS: Placing robot at ${x},${y} facing ${directions[this.direction]}\n`);
  }

  public turnLeft(): void {
    if (this.direction !== null) {
      const newDirection: number = this.direction === 0 ? 3 : this.direction - 1;
      this.direction = newDirection;
      process.stdout.write(`SUCCESS: Robot is now facing ${directions[this.direction]}\n`);
    } else {
      process.stdout.write(invalidPlace);
    }
  }

  public turnRight(): void {
    if (this.direction !== null) {
      const newDirection: number = this.direction === 3 ? 0 : this.direction + 1;
      this.direction = newDirection;
      process.stdout.write(`SUCCESS: Robot is now facing ${directions[this.direction]}\n`);
    } else {
      process.stdout.write(invalidPlace);
    }
  }

  public move(table: Table): void {
    let successMsg = invalidPlace;
    if (this.position) {
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
      successMsg = `Robot is now at ${this.position.x},${this.position.y}\n`; 
    };
    process.stdout.write(successMsg);
  }

  public toString(): string {
    return this.direction !== null && this.position ? `SUCCESS: Robot is in ${this.position.x},${this.position.y} and facing ${directions[this.direction]}` : invalidPlace; 
  }
}