import { describe, test, expect } from 'bun:test'
import {findValidNumbers, parseRunes, partOne, partTwo} from "@/01/01.ts";

describe('Day 1', () => {
  describe('Part One', () => {
    describe('parseRune', () => {
      type testCase = {
        name: string;
        input: string;
        want: number;
      }

      const tests: testCase[] = [
        {name:'first', input: '1abc2', want: 12},
        {name:'second', input: 'pqr3stu8vwx', want: 38},
        {name:'third', input: 'a1b2c3d4e5f', want: 15},
        {name:'fourth', input: 'treb7uchet', want: 77},
      ]

      for (const t of tests) {
        test(t.name, () => {
          expect(parseRunes(t.input)).toBe(t.want)
        })
      }
    })

    test('partOne', () => {
      type testCase = {
        input: string[];
        want: number;
      }

      const t: testCase = {input: ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'], want: 142}

      expect(partOne(t.input)).toBe(t.want)
    })
  })
  
  describe('Part Two', () => {
    describe('findValidNumbers', () => {
      type testCase = {
        name: string;
        input: string;
        want: number;
      }

      const tests: testCase[] = [
        {name:'first', input: 'two1nine', want: 29},
        {name:'second', input: 'eightwothree', want: 83},
        {name:'third', input: 'abcone2threexyz', want: 13},
        {name:'fourth', input: 'xtwone3four', want: 24},
        {name:'fifth', input: '4nineeightseven2', want: 42},
        {name:'sixth', input: 'zoneight234', want: 14},
        {name:'seventh', input: '7pqrstsixteen', want: 76},
        {name: 'overlap', input: 'onetwone', want: 11}
      ]

      for (const t of tests) {
        test(t.name, () => {
          expect(findValidNumbers(t.input)).toBe(t.want)
        })
      }
    })

    test('partTwo', () => {
      type testCase = {
        input: string[];
        want: number;
      }

      const t: testCase = {input: [
          'two1nine',
          'eightwothree',
          'abcone2threexyz',
          'xtwone3four',
          '4nineeightseven2',
          'zoneight234',
          '7pqrstsixteen'
        ], want: 281}

      expect(partTwo(t.input)).toBe(t.want)
    })
  })
})