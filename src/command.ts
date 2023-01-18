import * as process from 'process';
import Table from './table.js';
import Robot from './robot.js';


export default class Command {
  public robot: Robot;
  private table: Table;

  constructor() {
    this.table = new Table();
    this.robot = new Robot();
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
        const validPlace = this.robot.placeRobot(this.table, coordinates);
        if (!validPlace) {
          process.stdout.write(`FAILED: Incorrect PLACE Parameters (PLACE ${command}) \n`);
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
            process.stdout.write(`FAILED: Incorrect Command (${command}) \n`);
            break;
        }
      }

    })
  }
}