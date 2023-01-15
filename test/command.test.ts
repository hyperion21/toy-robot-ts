import { describe, expect, test } from '@jest/globals';
import Command from '../src/command';
import Table from '../src/table';
import Robot, { directions } from '../src/robot';

describe("Command", () => {
  const table: Table = new Table();
  describe('Execute Commands', () => {
    test('should execute command string', () => {
      const command: Command = new Command(table);
      command.execute('PLACE 2,2,SOUTH MOVE MOVE LEFT MOVE RIGHT REPORT');
      expect(command.robot.position.x).toBe(3);
      expect(command.robot.position.y).toBe(0);
      expect(directions[command.robot.direction]).toBe('SOUTH');
    });

    test('should try to execute invalid command', () => {
      const command: Command = new Command(table);
      command.execute('PLACE 0,0,SOUTH WALK');
      expect(command.robot.position.x).toBe(0);
      expect(command.robot.position.x).toBe(0);
      expect(directions[command.robot.direction]).toBe('SOUTH');
    });

    test('should try to execute place with additional parameters', () => {
      const command: Command = new Command(table);
      command.execute('PLACE 2,2,SOUTH,WALK');
      expect(command.robot.position.x).toBe(0);
      expect(command.robot.position.x).toBe(0);
      expect(directions[command.robot.direction]).toBe('NORTH');
    });

    test('should try to execute place with incorrect parameters', () => {
      const command: Command = new Command(table);
      command.execute('PLACE A,B,C');
      expect(command.robot.position.x).toBe(0);
      expect(command.robot.position.x).toBe(0);
      expect(directions[command.robot.direction]).toBe('NORTH');
    });

    test('should try to execute place with additional parameters', () => {
      const command: Command = new Command(table);
      command.execute('PLACE 2,2,SOUTH,WALK');
      expect(command.robot.position.x).toBe(0);
      expect(command.robot.position.x).toBe(0);
      expect(directions[command.robot.direction]).toBe('NORTH');
    });

    test('should try to execute place with missing parameters', () => {
      const command: Command = new Command(table);
      command.execute('PLACE 1,3');
      expect(command.robot.position.x).toBe(0);
      expect(command.robot.position.x).toBe(0);
      expect(directions[command.robot.direction]).toBe('NORTH');
    });
  })

});