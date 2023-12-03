import { describe, expect, test } from 'bun:test'

import {
  parse,
  parseGame,
  isLegal,
  cubePower,
  partOne,
  partTwo
} from '@/02/02.ts'

describe('Day 2', () => {
  const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

  describe('Part One', () => {
    describe('isLegal', () => {
      type testCase = {
        name: string
        input: string
        want: boolean
      }

      const tests: testCase[] = [
        {
          name: 'first',
          input: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
          want: true
        },
        {
          name: 'second',
          input:
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
          want: true
        },
        {
          name: 'third',
          input:
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
          want: false
        },
        {
          name: 'fourth',
          input:
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
          want: false
        },
        {
          name: 'fifth',
          input: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
          want: true
        }
      ]

      tests.map(t =>
        test(t.name, () => {
          expect(isLegal(parseGame(t.input))).toBe(t.want)
        })
      )
    })

    const want = 8

    test('partOne', () => {
      expect(partOne(parse(testInput))).toBe(want)
    })
  })

  describe('Part Two', () => {
    describe('cubePower', () => {
      type testCase = {
        name: string
        input: string
        want: number
      }

      const tests: testCase[] = [
        {
          name: 'first',
          input: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
          want: 48
        },
        {
          name: 'second',
          input:
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
          want: 12
        },
        {
          name: 'third',
          input:
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
          want: 1560
        },
        {
          name: 'fourth',
          input:
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
          want: 630
        },
        {
          name: 'fifth',
          input: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
          want: 36
        }
      ]

      tests.map(t =>
        test(t.name, () => {
          expect(cubePower(parseGame(t.input))).toBe(t.want)
        })
      )
    })
    const want = 2286

    test('partTwo', () => {
      expect(partTwo(parse(testInput))).toBe(want)
    })
  })
})
