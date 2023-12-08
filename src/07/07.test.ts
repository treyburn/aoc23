import {describe, expect, test} from 'bun:test'
import {calculateHandType, HandType, parse, partOne, scoreHands, sortByScores} from "@/07/07.ts";

describe('Day 7', () => {
  const testInputText = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
  test('parse', () => {
    const wantLength = 5
    const got = parse(testInputText)
    expect(got.length).toBe(wantLength)
  })

  const testInput = parse(testInputText)

  describe('calculations', () => {
    describe('calculateHandType', () => {
      const tests = [
        {Name: 'First', Hand: {Cards: "32T3K", Bid: 0}, Want: HandType.OnePair},
        {Name: 'Second', Hand: {Cards: "T55J5", Bid: 0}, Want: HandType.ThreeKind},
        {Name: 'Third', Hand: {Cards: "KK677", Bid: 0}, Want: HandType.TwoPair},
        {Name: 'Forth', Hand: {Cards: "KTJJT", Bid: 0}, Want: HandType.TwoPair},
        {Name: 'Fifth', Hand: {Cards: "QQQJA", Bid: 0}, Want: HandType.ThreeKind},
        {Name: 'Example 1', Hand: {Cards: "AAAAA", Bid: 0}, Want: HandType.FiveKind},
        {Name: 'Example 2', Hand: {Cards: "AA8AA", Bid: 0}, Want: HandType.FourKind},
        {Name: 'Example 3', Hand: {Cards: "23332", Bid: 0}, Want: HandType.FullHouse},
        {Name: 'Example 4', Hand: {Cards: "TTT98", Bid: 0}, Want: HandType.ThreeKind},
        {Name: 'Example 5', Hand: {Cards: "23432", Bid: 0}, Want: HandType.TwoPair},
        {Name: 'Example 6', Hand: {Cards: "A23A4", Bid: 0}, Want: HandType.OnePair},
        {Name: 'Example 7', Hand: {Cards: "23456", Bid: 0}, Want: HandType.HighCard},
      ]

      tests.map(t => {
        test(t.Name, () => {
          expect(calculateHandType(t.Hand)).toBe(t.Want)
        })
      })
    })

    test('sortByScores', () => {
      const wantSorted = [
        {Hand: {Cards: "32T3K", Bid: 765}, Type: HandType.OnePair},
        {Hand: {Cards: "KTJJT", Bid: 220}, Type: HandType.TwoPair},
        {Hand: {Cards: "KK677", Bid: 28}, Type: HandType.TwoPair},
        {Hand: {Cards: "T55J5", Bid: 684}, Type: HandType.ThreeKind},
        {Hand: {Cards: "QQQJA", Bid: 483}, Type: HandType.ThreeKind},
      ]

      expect(sortByScores(scoreHands(testInput))).toEqual(wantSorted)
    })
  })

  describe('Part One', () => {
    test('partOne', () => {
      const wantScore = 6440

      expect(partOne(testInput)).toBe(wantScore)
    })
  })

  describe('Part Two', () => {})
})
