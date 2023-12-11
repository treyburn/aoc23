import { describe, expect, test } from 'bun:test'
import { findStartLocation, parse, partOne } from '@/10/10.ts'

describe('Day 10', () => {
  const testSimpleText = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`

  const testComplexText = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`

  describe('parse', () => {
    const tests = [
      { Name: 'simple', Input: testSimpleText, WantRows: 5, WantCols: 5 },
      { Name: 'complex', Input: testComplexText, WantRows: 5, WantCols: 5 }
    ]

    tests.map(t => {
      test(t.Name, () => {
        const got = parse(t.Input)
        expect(got.length).toBe(t.WantRows)
        got.map(row => {
          expect(row.length).toBe(t.WantCols)
        })
      })
    })
  })

  const testSimple = parse(testSimpleText)
  const testComplex = parse(testComplexText)

  describe('findStart', () => {
    const tests = [
      { Name: 'simple', Input: testSimple, Want: { X: 1, Y: 1 } },
      { Name: 'complex', Input: testComplex, Want: { X: 0, Y: 2 } }
    ]

    tests.map(t => {
      test(t.Name, () => {
        expect(findStartLocation(t.Input)).toEqual(t.Want)
      })
    })
  })

  describe('Part One', () => {
    const tests = [
      { Name: 'simple', Input: testSimple, WantSteps: 4 },
      { Name: 'complex', Input: testComplex, WantSteps: 8 }
    ]

    tests.map(t => {
      test(t.Name, () => {
        expect(partOne(t.Input)).toBe(t.WantSteps)
      })
    })
  })

  describe('Part Two', () => {})
})
