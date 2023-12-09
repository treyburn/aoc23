import {describe, expect, test} from 'bun:test'
import {derive, deriveNext, derivePrevious, parse, partOne, partTwo} from "@/09/09.ts";

describe('Day 9', () => {
  const testInputText = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

  test('parse', () => {
    const wantLength = 3

    expect(parse(testInputText).length).toBe(wantLength)
  })

  const testInput = parse(testInputText)

  describe('derive next', () => {
    const tests = [
      {Name: 'first', Input: testInput[0], Want: 18},
      {Name: 'second', Input: testInput[1], Want: 28},
      {Name: 'third', Input: testInput[2], Want: 68},
    ]

    tests.map(t => {
      test(t.Name, () => {
        expect(derive(t.Input, deriveNext)).toBe(t.Want)
      })
    })
  })

  test('Part One', () => {
    const wantOutcome = 114

    expect(partOne(testInput)).toBe(wantOutcome)
  })

  describe('derive previous', () => {
    const tests = [
      {Name: 'first', Input: testInput[0], Want: -3},
      {Name: 'second', Input: testInput[1], Want: 0},
      {Name: 'third', Input: testInput[2], Want: 5},
    ]

    tests.map(t => {
      test(t.Name, () => {
        expect(derive(t.Input, derivePrevious)).toBe(t.Want)
      })
    })
  })
  
  test('Part Two', () => {
    const wantOutcome = 2

    expect(partTwo(testInput)).toBe(wantOutcome)
  })
})