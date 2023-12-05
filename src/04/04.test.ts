import { describe, expect, test } from 'bun:test'
import { calculateCardValue, parse, partOne, partTwo } from '@/04/04.ts'

describe('Day 4', () => {
  const testTextInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

  test('parse', () => {
    const wantParsedLength = 6
    const wantCardNumCount = 8
    const wantWinningNumCount = 5
    const got = parse(testTextInput)
    expect(got.length).toBe(wantParsedLength)
    got.map(card => {
      expect(card.CardNumbers.size).toBe(wantCardNumCount)
      expect(card.WinningNumbers.size).toBe(wantWinningNumCount)
    })
  })

  const testInput = parse(testTextInput)

  describe('Part One', () => {
    describe('calculateCardValue', () => {
      const wantCardValues: number[] = [8, 2, 2, 1, 0, 0]

      for (let i = 0; i < testInput.length; i++) {
        test(`card #${i}`, () => {
          expect(calculateCardValue(testInput[i])).toBe(wantCardValues[i])
        })
      }
    })

    test('partOne', () => {
      const want = 13
      expect(partOne(testInput)).toBe(want)
    })
  })

  describe('Part Two', () => {
    test('partTwo', () => {
      const wantAnswer = 30
      expect(partTwo(testInput)).toBe(wantAnswer)
    })
  })
})
