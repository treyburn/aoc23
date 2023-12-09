export function parse(input: string): Hand[] {
  return input
    .split('\n')
    .map(line => line.split(/\s/))
    .map(([cards, bid]) => ({ Cards: cards, Bid: parseInt(bid) }))
}

export function partOne(input: ReturnType<typeof parse>): number {
  let result = 0

  const sorted = sortByScores(scoreHands(input))
  for (let i = 0; i < sorted.length; i++) {
    result += sorted[i].Hand.Bid * (i + 1)
  }

  return result
}

export function partTwo(input: ReturnType<typeof parse>) {
  let result = 0

  const sorted = sortByScores(scoreHands(input, true), true)
  for (let i = 0; i < sorted.length; i++) {
    result += sorted[i].Hand.Bid * (i + 1)
  }

  return result
}

export enum HandType {
  FiveKind,
  FourKind,
  FullHouse,
  ThreeKind,
  TwoPair,
  OnePair,
  HighCard
}

export type Hand = {
  Cards: string
  Bid: number
}

export type ScoredHand = {
  Hand: Hand
  Type: HandType
}

export function calculateHandType(hand: Hand, useWildcards = false): HandType {
  let draw = new Map<string, number>()
  let wildCards = 0
  hand.Cards.split('').map(char => {
    let count = 1
    if (useWildcards && char == 'J') {
      wildCards++
      return
    }
    if (draw.has(char)) {
      count += draw.get(char) || 0
    }
    draw.set(char, count)
  })

  let values: number[] = []

  for (const value of draw.values()) {
    values.push(value)
  }

  values.sort().reverse()

  if (useWildcards) {
    values[0] += wildCards
  }

  if (values.length == 1) {
    return HandType.FiveKind
  }
  if (values.length == 2 && values[0] == 4) {
    return HandType.FourKind
  }
  if (values.length == 2 && values[0] == 3) {
    return HandType.FullHouse
  }
  if (values.length >= 3 && values[0] == 3) {
    return HandType.ThreeKind
  }
  if (values.length >= 3 && values[0] == 2 && values[1] == 2) {
    return HandType.TwoPair
  }
  if (values.length >= 3 && values[0] == 2 && values[1] == 1) {
    return HandType.OnePair
  }

  // default is just high-card
  return HandType.HighCard
}

export function scoreHands(hands: Hand[], useWildCards = false): ScoredHand[] {
  let result: ScoredHand[] = []

  hands.map(hand => {
    const score = calculateHandType(hand, useWildCards)
    result.push({ Hand: hand, Type: score })
  })

  return result
}

export function sortByScores(
  hands: ScoredHand[],
  useWildCards = false
): ScoredHand[] {
  hands.sort((a, b) => {
    let orderedValueOfCards: string
    if (useWildCards) {
      orderedValueOfCards = 'AKQT98765432J'
    } else {
      orderedValueOfCards = 'AKQJT98765432'
    }
    if (a.Type > b.Type) {
      return -1
    }
    if (a.Type < b.Type) {
      return 1
    }

    for (let i = 0; i < a.Hand.Cards.length; i++) {
      const aCard = a.Hand.Cards.charAt(i)
      const bCard = b.Hand.Cards.charAt(i)
      if (
        orderedValueOfCards.indexOf(aCard) > orderedValueOfCards.indexOf(bCard)
      ) {
        return -1
      }

      if (
        orderedValueOfCards.indexOf(aCard) < orderedValueOfCards.indexOf(bCard)
      ) {
        return 1
      }
    }

    // shouldn't reach - but does this matter??
    return 0
  })

  return hands
}
