import { describe, expect, test } from 'bun:test'
import {
  calculateWinPossibilities,
  maxDistance,
  parse,
  partOne,
  partTwo,
  unBamboozleRaces
} from '@/06/06.ts'

describe('Day 6', () => {
  const testInputText = `Time:      7  15   30
Distance:  9  40  200`
  test('parse', () => {
    const want = [
      { Time: 7, Distance: 9 },
      { Time: 15, Distance: 40 },
      { Time: 30, Distance: 200 }
    ]
    expect(parse(testInputText)).toEqual(want)
  })

  const testInput = parse(testInputText)

  describe('maxDistance', () => {
    const tests = [
      { name: 'one', timeToHold: 1, time: 7, want: 6 },
      { name: 'two', timeToHold: 2, time: 7, want: 10 },
      { name: 'three', timeToHold: 3, time: 7, want: 12 },
      { name: 'four', timeToHold: 4, time: 7, want: 12 },
      { name: 'five', timeToHold: 5, time: 7, want: 10 },
      { name: 'six', timeToHold: 6, time: 7, want: 6 },
      { name: 'five', timeToHold: 7, time: 7, want: 0 }
    ]

    tests.map(t => {
      test(t.name, () => {
        expect(maxDistance(t.timeToHold, t.time)).toBe(t.want)
      })
    })
  })

  describe('calculateWinPossibilities', () => {
    const tests = [
      { name: 'first', race: testInput[0], want: 4 },
      { name: 'second', race: testInput[1], want: 8 },
      { name: 'third', race: testInput[2], want: 9 }
    ]

    tests.map(t => {
      test(t.name, () => {
        expect(calculateWinPossibilities(t.race)).toBe(t.want)
      })
    })
  })

  describe('Part One', () => {
    test('partOne', () => {
      const want = 288
      expect(partOne(testInput)).toBe(want)
    })
  })

  describe('Part Two', () => {
    test('unBamboozleRaces', () => {
      const want = { Time: 71530, Distance: 940200 }

      expect(unBamboozleRaces(testInput)).toEqual(want)
    })

    test('partTwo', () => {
      const want = 71503
      expect(partTwo(testInput)).toEqual(want)
    })
  })
})
