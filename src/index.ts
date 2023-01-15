import * as process from 'process';
import readline from 'readline';
import chalk from 'chalk';
import boxen from 'boxen';

import Command from './command.js';

const command = new Command();

const content = 
  chalk.blue.bold('COMMANDS:') + '\n\n' +
  chalk.green.bold('- PLACE X,Y,DIRECTION') + '\n' + 
  'X and Y are integers that indicate a location on the tabletop\n' +
  'DIRECTION is a string indicating which direction the robot should face. It it one of the four cardinal directions: NORTH, EAST, SOUTH or WEST.\n' + 
  chalk.red.bold('***X,Y,DIRECTION is required after PLACE, PLACE will be ignored if incomplete***') + '\n\n' +
  chalk.green.bold('- MOVE') + '\n' +
  'Instructs the robot to move 1 square in the direction it is facing.\n' +
  chalk.red.bold('***MOVE is ignored if robot will fall***') + '\n\n' +
  chalk.green.bold('- LEFT') + '\n' +
  'Instructs the robot to rotate 90° anticlockwise/counterclockwise.\n\n' +
  chalk.green.bold('- RIGHT') + '\n' +
  'Instructs the robot to rotate 90° clockwise.\n\n' +
  chalk.green.bold('- REPORT') + '\n' +
  'Outputs the robot\'s current location on the tabletop and the direction it is facing.\n\n' +
  chalk.green.bold('- EXIT') + '\n' +
  'To Stop Command.\n\n' +
  chalk.green.bold('DEFAULT ROBOT is in 0,0 and facing NORTH') + '\n';
  
const instructions = boxen(content, {padding: 1, borderColor: 'gray', dimBorder: true});
  process.stdout.write(instructions);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fetchCommand = () => {
  rl.question('Command: ', (answer) => {
    if (answer.toUpperCase() === 'EXIT') {
      return rl.close();
    }
    command.execute(answer);
    fetchCommand();
  })
};

fetchCommand();
