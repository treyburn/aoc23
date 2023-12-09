import { describe, expect, test } from 'bun:test'
import { countSteps, parse, partOne, partTwo, partTwoLCD } from '@/08/08.ts'

describe('Day 8', () => {
  const testInputText1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

  const testInputText2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

  const testInputText3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

  test('parse', () => {
    const wantInstructions = 'RL'
    const wantMapLength = 7
    const got = parse(testInputText1)
    expect(got.Instructions).toBe(wantInstructions)
    expect(got.DesertMaps.size).toBe(wantMapLength)
  })

  describe('countSteps', () => {
    const tests = [
      {
        Name: '1 pass',
        Start: 'AAA',
        End: 'ZZZ',
        Guide: parse(testInputText1),
        Want: 2
      },
      {
        Name: 'loop',
        Start: 'AAA',
        End: 'ZZZ',
        Guide: parse(testInputText2),
        Want: 6
      }
    ]

    tests.map(t => {
      test(t.Name, () => {
        expect(countSteps(t.Start, t.End, t.Guide)).toBe(t.Want)
      })
    })
  })

  test('Part One', () => {
    const wantSteps = 6

    expect(partOne(parse(testInputText2))).toBe(wantSteps)
  })

  test('Part Two', () => {
    const wantSteps = 6
    expect(partTwo(parse(testInputText3))).toBe(wantSteps)
  })
})
