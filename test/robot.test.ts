import { describe, expect, test } from '@jest/globals';
import Robot, { directions } from '../src/robot';
import Table from '../src/table';

describe("Robot", () => {
  describe('Create Robot', () => {
    test('should create robot in 0,0 facing NORTH', () => {
      const robot: Robot = new Robot({ x: 0, y:0, direction: 0});
      expect(robot.position.x).toBe(0);
      expect(robot.position.y).toBe(0);
      expect(directions[robot.direction]).toBe('NORTH');
    });

    test('should create robot in 2,3 facing SOUTH', () => {
      const robot: Robot = new Robot({ x: 2, y:3, direction: 2});
      expect(robot.position.x).toBe(2);
      expect(robot.position.y).toBe(3);
      expect(directions[robot.direction]).toBe('SOUTH');
    });
  });

  describe('Robot turn left', () => {
    test('should facing WEST from NORTH', () => {
      const robot: Robot = new Robot({ x: 0, y:0, direction: 0});
      robot.turnLeft();
      expect(directions[robot.direction]).toBe('WEST');
    });

    test('should facing NORTH from EAST', () => {
      const robot: Robot = new Robot({ x: 0, y:0, direction: 1});
      robot.turnLeft();
      expect(directions[robot.direction]).toBe('NORTH');
    });
  });

  describe('Robot turn right', () => {
    test('should facing SOUTH from EAST', () => {
      const robot: Robot = new Robot({ x: 0, y:0, direction: 1});
      robot.turnRight();
      expect(directions[robot.direction]).toBe('SOUTH');
    });

    test('should facing NORTH from WEST', () => {
      const robot: Robot = new Robot({ x: 0, y:0, direction: 3});
      robot.turnRight();
      expect(directions[robot.direction]).toBe('NORTH');
    });
  });

  describe('Robot move', () => {
    const table = new Table();
    test('should move north', () => {
      const robot: Robot = new Robot({ x: 2, y:2, direction: 0});
      robot.move(table);
      expect(robot.position.x).toBe(2);
      expect(robot.position.y).toBe(3);
    });

    test('invalid move north', () => {
      const robot: Robot = new Robot({ x: 2, y:4, direction: 0});
      robot.move(table);
      expect(robot.position.x).toBe(2);
      expect(robot.position.y).toBe(4);
    });

    test('should move east', () => {
      const robot: Robot = new Robot({ x: 2, y:2, direction: 1});
      robot.move(table);
      expect(robot.position.x).toBe(3);
      expect(robot.position.y).toBe(2);
    });

    test('invalid move east', () => {
      const robot: Robot = new Robot({ x: 4, y:2, direction: 1});
      robot.move(table);
      expect(robot.position.x).toBe(4);
      expect(robot.position.y).toBe(2);
    });

    test('should move south', () => {
      const robot: Robot = new Robot({ x: 2, y:2, direction: 2});
      robot.move(table);
      expect(robot.position.x).toBe(2);
      expect(robot.position.y).toBe(1);
    });

    test('invalid move south', () => {
      const robot: Robot = new Robot({ x: 2, y:0, direction: 2});
      robot.move(table);
      expect(robot.position.x).toBe(2);
      expect(robot.position.y).toBe(0);
    });

    test('should move west', () => {
      const robot: Robot = new Robot({ x: 2, y:2, direction: 3});
      robot.move(table);
      expect(robot.position.x).toBe(1);
      expect(robot.position.y).toBe(2);
    });

    test('invalid move west', () => {
      const robot: Robot = new Robot({ x: 0, y:2, direction: 3});
      robot.move(table);
      expect(robot.position.x).toBe(0);
      expect(robot.position.y).toBe(2);
    });
  });

  describe('Robot report', () => {
    test('should report its current position', () => {
      const robot: Robot = new Robot({ x: 3, y:3, direction: 1});
      expect(robot.toString()).toBe('Robot is in 3,3 and facing EAST');
    });
  });
  
});