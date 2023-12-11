import { describe, expect, test } from 'bun:test'
import { findStartLocation, parse, partOne, partTwo } from '@/10/10.ts'

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

  describe('Part Two', () => {
    const openText = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`
    const squeezeText = `..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........`
    const complexText = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`
    const tests = [
      { Name: 'simple - open', Input: parse(openText), Want: 4 },
      { Name: 'simple - squeeze', Input: parse(squeezeText), Want: 4 },
      { Name: 'complex', Input: parse(complexText), Want: 10 }
    ]

    tests.map(t => {
      test(t.Name, () => {
        expect(partTwo(t.Input)).toBe(t.Want)
      })
    })
  })
})
