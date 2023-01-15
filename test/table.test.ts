import { describe, expect, test } from '@jest/globals';
import Table from "../src/table";

describe("Table", () => {
  describe('Create Table', () => {
    test('should create table with default 5x5 dimension', () => {
      const table: Table = new Table();
      expect(table.height).toBe(5);
      expect(table.width).toBe(5);
    });

    test('should create table with 7x7 dimension', () => {
      const table: Table = new Table(7);
      expect(table.height).toBe(7);
      expect(table.width).toBe(7);
    });

    test('should create table with 3x4 dimension', () => {
      const table: Table = new Table(3,4);
      expect(table.height).toBe(4);
      expect(table.width).toBe(3);
    });
  })
});
