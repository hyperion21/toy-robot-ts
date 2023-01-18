import { describe, expect, test } from '@jest/globals';
import Robot, { directions } from '../src/robot';
import Table from '../src/table';

const robotIsNotPlaced = 'FAILED: Robot is not yet placed\n';
const table: Table = new Table();

describe("Robot", () => {
  describe('Create Robot', () => {
    test('should create robot', () => {
      const robot: Robot = new Robot();
      expect(robot.position).toBeNull;
      expect(robot.direction).toBeNull;
      expect(robot.toString()).toBe(robotIsNotPlaced);
    });
  });

  describe('Place Robot', () => {
    test('should create robot in 2,3 facing SOUTH', () => {
      const robot: Robot = new Robot();
      expect(robot.placeRobot(table, ['2','3','SOUTH'])).toBeTruthy;
    });

    test('invalid place x,y above maximum', () => {
      const robot: Robot = new Robot();
      expect(robot.placeRobot(table, ['12','13','WEST'])).toBeFalsy;
    });

    test('invalid place x,y below minimum', () => {
      const robot: Robot = new Robot();
      expect(robot.placeRobot(table, ['-2','-3','EAST'])).toBeFalsy;
    });
  });


  describe('Robot turn left', () => {
    test('should facing WEST from NORTH', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['0','0','NORTH']);
      robot.turnLeft();
      expect(directions[robot.direction!]).toBe('WEST');
    });

    test('should facing NORTH from EAST', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['0','0','EAST']);
      robot.turnLeft();
      expect(directions[robot.direction!]).toBe('NORTH');
    });

    test('invalid turn left', () => {
      const robot: Robot = new Robot();
      robot.turnLeft();
      expect(robot.position).toBeNull;
      expect(robot.direction).toBeNull;
      expect(robot.toString()).toBe(robotIsNotPlaced);
    });
  
  });

  
  describe('Robot turn right', () => {
    test('should facing SOUTH from EAST', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['0','0','EAST']);
      robot.turnRight();
      expect(directions[robot.direction!]).toBe('SOUTH');
    });

    test('should facing NORTH from WEST', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['0','0','WEST']);
      robot.turnRight();
      expect(directions[robot.direction!]).toBe('NORTH');
    });

    test('invalid turn right', () => {
      const robot: Robot = new Robot();
      robot.turnRight();
      expect(robot.position).toBeNull;
      expect(robot.direction).toBeNull;
      expect(robot.toString()).toBe(robotIsNotPlaced);
    });
  });

  describe('Robot move', () => {
    test('should move north', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['2','2','NORTH']);
      robot.move(table);
      expect(robot.position!.x).toBe(2);
      expect(robot.position!.y).toBe(3);
    });

    test('invalid move north', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['2','4','NORTH']);
      robot.move(table);
      expect(robot.position!.x).toBe(2);
      expect(robot.position!.y).toBe(4);
    });

    test('should move east', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['2','2','EAST']);
      robot.move(table);
      expect(robot.position!.x).toBe(3);
      expect(robot.position!.y).toBe(2);
    });

    test('invalid move east', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['4','2','EAST']);
      robot.move(table);
      expect(robot.position!.x).toBe(4);
      expect(robot.position!.y).toBe(2);
    });

    test('should move south', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['2','2','SOUTH']);
      robot.move(table);
      expect(robot.position!.x).toBe(2);
      expect(robot.position!.y).toBe(1);
    });

    test('invalid move south', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['2','0','SOUTH']);
      robot.move(table);
      expect(robot.position!.x).toBe(2);
      expect(robot.position!.y).toBe(0);
    });

    test('should move west', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['2','2','WEST']);
      robot.move(table);
      expect(robot.position!.x).toBe(1);
      expect(robot.position!.y).toBe(2);
    });

    test('invalid move west', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['0','2','WEST']);
      robot.move(table);
      expect(robot.position!.x).toBe(0);
      expect(robot.position!.y).toBe(2);
    });

    test('invalid move', () => {
      const robot: Robot = new Robot();
      robot.move(table);
      expect(robot.position).toBeNull;
      expect(robot.direction).toBeNull;
      expect(robot.toString()).toBe(robotIsNotPlaced);
    });
  });

  describe('Robot report', () => {
    test('should report its current position', () => {
      const robot: Robot = new Robot();
      robot.placeRobot(table, ['3','3','EAST']);
      expect(robot.toString()).toBe('SUCCESS: Robot is in 3,3 and facing EAST');
    });
  });
  
});