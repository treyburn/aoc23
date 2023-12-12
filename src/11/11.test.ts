import { describe, expect, test } from 'bun:test'
import {
  buildPairs,
  buildUniverse, Col,
  expandUniverse,
  findEmptyFields,
  manhattanDistance,
  parse,
  partOne,
  processUniverseExpandedBy, Row
} from '@/11/11.ts'

describe('Day 11', () => {
  const testInputText = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

  const testUniverseUnexpanded = buildUniverse(parse(testInputText))
  const testUniverseExpanded = expandUniverse(
    buildUniverse(parse(testInputText))
  )

  describe('setup', () => {
    test('parse', () => {
      const wantRows = 10
      const wantCols = 10

      const got = parse(testInputText)
      expect(got.length).toBe(wantRows)
      got.map(row => {
        expect(row.length).toBe(wantCols)
      })
    })

    test('buildUniverse', () => {
      const wantGalaxies = [
        { ID: 1, X: 3, Y: 0 },
        { ID: 2, X: 7, Y: 1 },
        { ID: 3, X: 0, Y: 2 },
        { ID: 4, X: 6, Y: 4 },
        { ID: 5, X: 1, Y: 5 },
        { ID: 6, X: 9, Y: 6 },
        { ID: 7, X: 7, Y: 8 },
        { ID: 8, X: 0, Y: 9 },
        { ID: 9, X: 4, Y: 9 }
      ]

      const got = buildUniverse(parse(testInputText))

      expect(got).toEqual(wantGalaxies)
    })
  })

  describe('expand universe', () => {
    test('findEmptyCols', () => {
      const wantCols = [2, 5, 8]

      expect(findEmptyFields(testUniverseUnexpanded, Col)).toEqual(wantCols)
    })

    test('findEmptyRows', () => {
      const wantRows = [3, 7]

      expect(findEmptyFields(testUniverseUnexpanded, Row)).toEqual(wantRows)
    })

    test('expandUniverse', () => {
      const wantGalaxies = [
        { ID: 1, X: 4, Y: 0 },
        { ID: 2, X: 9, Y: 1 },
        { ID: 3, X: 0, Y: 2 },
        { ID: 4, X: 8, Y: 5 },
        { ID: 5, X: 1, Y: 6 },
        { ID: 6, X: 12, Y: 7 },
        { ID: 7, X: 9, Y: 10 },
        { ID: 8, X: 0, Y: 11 },
        { ID: 9, X: 5, Y: 11 }
      ]

      expect(expandUniverse(testUniverseUnexpanded)).toEqual(wantGalaxies)
    })
  })

  describe('travel universe', () => {
    test('buildPairs', () => {
      const wantPairs = 36

      expect(buildPairs(testUniverseExpanded).length).toBe(wantPairs)
    })

    test('manhattanDistance', () => {
      const pairs = [
        {
          Pair: { A: testUniverseExpanded[4], B: testUniverseExpanded[8] },
          Want: 9
        },
        {
          Pair: { A: testUniverseExpanded[0], B: testUniverseExpanded[6] },
          Want: 15
        },
        {
          Pair: { A: testUniverseExpanded[2], B: testUniverseExpanded[5] },
          Want: 17
        },
        {
          Pair: { A: testUniverseExpanded[7], B: testUniverseExpanded[8] },
          Want: 5
        },
        {
          Pair: { A: testUniverseExpanded[3], B: testUniverseExpanded[7] },
          Want: 14
        },
        {
          Pair: { A: testUniverseExpanded[1], B: testUniverseExpanded[0] },
          Want: 6
        }
      ]

      pairs.map(pair => {
        expect(manhattanDistance(pair.Pair)).toBe(pair.Want)
      })
    })
  })

  describe('Part One', () => {
    test('partOne', () => {
      const wantResult = 374

      expect(partOne(parse(testInputText))).toBe(wantResult)
    })
  })

  describe('Part Two', () => {
    test('expandUniverse by 10', () => {
      // const OldGalaxies = [
      //   {ID: 1, X: 3, Y: 0},
      //   {ID: 2, X: 7, Y: 1},
      //   {ID: 3, X: 0, Y: 2},
      //   {ID: 4, X: 6, Y: 4},
      //   {ID: 5, X: 1, Y: 5},
      //   {ID: 6, X: 9, Y: 6},
      //   {ID: 7, X: 7, Y: 8},
      //   {ID: 8, X: 0, Y: 9},
      //   {ID: 9, X: 4, Y: 9},
      // ]
      const wantGalaxies = [
        { ID: 1, X: 13, Y: 0 },
        { ID: 2, X: 27, Y: 1 },
        { ID: 3, X: 0, Y: 2 },
        { ID: 4, X: 26, Y: 14 },
        { ID: 5, X: 1, Y: 15 },
        { ID: 6, X: 39, Y: 16 },
        { ID: 7, X: 27, Y: 28 },
        { ID: 8, X: 0, Y: 29 },
        { ID: 9, X: 14, Y: 29 }
      ]

      expect(expandUniverse(buildUniverse(parse(testInputText)), 10)).toEqual(
        wantGalaxies
      )
    })

    test('expand By 10', () => {
      const wantResult = 1030

      expect(processUniverseExpandedBy(parse(testInputText), 10)).toBe(
        wantResult
      )
    })

    test('expand By 100', () => {
      const wantResult = 8410

      expect(processUniverseExpandedBy(parse(testInputText), 100)).toBe(
        wantResult
      )
    })
  })
})
