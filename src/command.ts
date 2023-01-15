import * as process from 'process';
import Table from './table.js';
import Robot, { directions } from './robot.js';


const isCoordinatesValid = (table: Table, coordinates: string[]): boolean => {
  if (coordinates.length === 3) {
    switch(true) {
      case (Number.isNaN(+coordinates[0])) || (0 >= +coordinates[0] && table.width <= +coordinates[0]):
      case (Number.isNaN(+coordinates[1])) || (0 >= +coordinates[1] && table.height <= +coordinates[1]):
      case (!directions.includes(coordinates[2].toUpperCase())):
        return false;
      default:
        break;
    }
  } else {
    return false;
  }
  return true;
}

export default class Command {
  public robot: Robot;
  private table: Table;

  constructor(table: Table) {
    this.table = table;
    this.robot = new Robot({ x: 0, y: 0, direction: 0});
  };

  public execute(commandStr: string): void {
    const commands = commandStr.split(" ");
    let isPlaceCommand = false;
    commands.forEach((command: string) => {
      if (command.toUpperCase() === 'PLACE') {
        isPlaceCommand = true;
        return;
      };

      if (isPlaceCommand) {
        isPlaceCommand = false;
        const coordinates = command.split(",");
        if (isCoordinatesValid(this.table, coordinates)) {
          this.robot = new Robot(
            { x: +coordinates[0],
              y: +coordinates[1],
              direction: directions.indexOf(coordinates[2].toUpperCase()),
            }
          )
        } else {
          process.stdout.write('Incorrect PLACE Command \n');
          return;
        }
      } else {
        switch (command.toUpperCase()) {
          case 'MOVE':
            this.robot.move(this.table);
            break;
          case 'RIGHT':
            this.robot.turnRight();
            break;
          case 'LEFT':
            this.robot.turnLeft();
            break;
          case 'REPORT':
            process.stdout.write(this.robot.toString() + '\n');
            break;
          default:
            break;
        }
      }

    })
  }
}