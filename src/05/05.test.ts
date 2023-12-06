import {describe, expect, test} from 'bun:test'
import {buildChannel, parse, parseLookupMap, parseSeeds, partOne, partTwo, processSeed} from "@/05/05.ts";

describe('Day 5', () => {
  const testInputText =
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

  describe('setup', () => {
    test('parse', () => {
      const wantSeedCount = 4
      const wantChannelCount = 7

      const got = parse(testInputText)
      expect(got.Seeds.length).toBe(wantSeedCount)
      expect(got.Funnel.length).toBe(wantChannelCount)
    })

    test('parseSeeds', () => {
      const input = '79 14 55 13'
      const wantSeedCount = 4
      const wantSeeds = [79, 14, 55, 13,]
      const got = parseSeeds(input)
      expect(got.length).toBe(wantSeedCount)
      expect(got).toEqual(wantSeeds)
    })

    test('parseLookupMap', () => {
      const input = ['0 15 37', '37 52 2', '39 0 15']
      const wantLookupLength = 3
      const wantLookupMap = [
          {Destination: 0, Source: 15, Range: 37},
        {Destination: 37, Source: 52, Range: 2},
        {Destination: 39, Source: 0, Range: 15},
      ]

      const got = parseLookupMap(input)
      expect(got.length).toBe(wantLookupLength)
      expect(got).toEqual(wantLookupMap)
    })

    test('buildChannel', () => {
      const testLookupMaps = [
        {Destination: 50, Source: 98, Range: 2},
        {Destination: 52, Source: 50, Range: 48},
      ]

      const testSeeds = [79, 14, 55, 13]
      const wantOutputs = [81, 14, 57, 13]

      const chan = buildChannel(testLookupMaps)

      for (let i = 0; i < testSeeds.length; i++) {
        expect(chan(testSeeds[i])).toBe(wantOutputs[i])
      }
    })

  })

  const day5TestInput = parse(testInputText)
  describe('Part One', () => {
    test('processSeeds', () => {
      const wantOutputs = [82, 43, 86, 35]

      for (let i = 0; i < day5TestInput.Seeds.length; i++) {
        const got = processSeed(day5TestInput.Seeds[i], day5TestInput.Funnel)
        expect(got).toBe(wantOutputs[i])
      }
    })

    test('partOne', () => {
      const wantOutput = 35

      expect(partOne(day5TestInput)).toBe(wantOutput)
    })
  })
  
  describe('Part Two', () => {
    test('partTwo', () => {
      const wantOutput = 46

      expect(partTwo(day5TestInput)).toBe(wantOutput)
    })
  })
})