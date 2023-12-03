import {describe, expect, test} from 'bun:test'
import {
  buildBorder,
  calculateBounds,
  findPartNumbers,
  isValidPartNumber,
  parse,
  PartNumber,
  partOne,
  partTwo
} from '@/03/03.ts'

describe('Day 3', () => {
  const testData = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

  const testInput = parse(testData)

  test('parse', () => {
    const wantRows = 10
    const wantChars = 10
    const input = parse(testData)
    expect(input.length).toBe(wantRows)
    expect(input[0].length).toBe(wantChars)
    expect(input[9].length).toBe(wantChars)
  })

  test('calculateBounds', () => {
    const wantRows = 9
    const wantChars = 9
    const boundary = calculateBounds(testInput)
    expect(boundary.Up).toBe(0)
    expect(boundary.Left).toBe(0)
    expect(boundary.Right).toBe(wantChars)
    expect(boundary.Down).toBe(wantRows)
  })

// `467..114..
//  ...*......
//  ..35..633.
//  ......#...
//  617*......
//  .....+.580
//  ..592.....
//  ......755.
//  ...$.*....
//  .664.598..`

  describe('buildBorder', () => {
    type testCase = {
      name: string,
      row: number,
      left: number,
      right: number,
      want: string[],
    }

    const tests: testCase[] = [
      {name: "top left", row: 0, left: 0, right: 2, want: [".", ".", ".", ".", "*"]},
      {name: "top", row: 0, left: 1, right: 3, want: ["4", ".", ".", ".", ".", "*", "."]},
      {name: "top right", row: 0, left: 7, right: 9, want: ["1", ".", ".", ".", "."]},
      {name: "middle left", row: 4, left: 0, right: 2, want: [".", ".", ".", ".", "*", ".", ".", ".", "."]},
      {name: " middle", row: 4, left: 2, right: 4, want: [".", ".", ".", ".", ".", "1", ".", ".", ".", ".", ".", "+"]},
      {name: "middle right", row: 4, left: 7, right: 9, want: ["#", ".", ".", ".", ".", ".", "5", "8", "."]},
      {name: "bottom left", row: 9, left: 0, right: 2, want: [".", ".", ".", "$", "4"]},
      {name: "bottom", row: 9, left: 1, right: 3, want: [".", ".", ".", "$", ".", ".", "."]},
      {name: "bottom right", row: 9, left: 7, right: 9, want: [".", ".", ".", ".", "9"]},
    ]

    for (const t of tests) {
      test(t.name, () => {
        expect(buildBorder(testInput, t.row, t.left, t.right)).toEqual(t.want)
      })
    }
  })

  describe('Part One', () => {
    test('findPartNumbers', () => {
      const wantPartNums = 10
      expect(findPartNumbers(testInput).length).toBe(wantPartNums)
    })

    describe("isValidPartNumber", () => {
      type testCase = {
        name: string,
        input: PartNumber,
        want: boolean,
      }

      const tests: testCase[] = [
        {name: "has symbol", input: {Value: 0, Border: ["?", ".", "."]}, want: true},
        {name: "lacks symbol", input: {Value: 0, Border: [".", ".", "."]}, want: false},
      ]

      for (const t of tests) {
        test(t.name, () => {
          expect(isValidPartNumber(t.input)).toBe(t.want)
        })
      }
    })

    test('partOne', () => {
      const wantSum = 4361
      expect(partOne(testInput)).toBe(wantSum)
    })
  })
  
  describe('Part Two', () => {
    const wantGearRatio = 467835
    test('partTwo', () => {
      expect(partTwo(testInput)).toBe(wantGearRatio)
    })
  })
})