export function parse(input: string): Hand[] {
  return input
    .split('\n')
    .map(line => line.split(/\s/))
    .map(([cards, bid]) => ({ Cards: cards, Bid: parseInt(bid) }))
}

export function partOne(input: ReturnType<typeof parse>): number {
  let result = 0

  const sorted = sortByScores(scoreHands(input))
  for (let i = 0; i < sorted.length ; i++) {
    result += sorted[i].Hand.Bid * (i + 1)
  }

  return result
}

export function partTwo(input: ReturnType<typeof parse>) {}

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

export function calculateHandType(hand: Hand): HandType {
  let draw = new Map<string, number>()
  hand.Cards.split('').map(char => {
    let count = 1
    if (draw.has(char)) {
      count += draw.get(char)
    }
    draw.set(char, count)
  })

  let values: number[] = []

  for (const value of draw.values()) {
    values.push(value)
  }

  values.sort().reverse()


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

export function scoreHands(hands: Hand[]): ScoredHand[] {
  let result: ScoredHand[] = []

  hands.map(hand => {
    const score = calculateHandType(hand)
    result.push({Hand: hand, Type: score})
  })

  return result
}

export function sortByScores(hands: ScoredHand[]): ScoredHand[] {
  hands.sort((a, b) => {
    if (a.Type > b.Type) {
      return -1
    }
    if (a.Type < b.Type) {
      return 1
    }
    for (let i = 0; i < 5; i++) {
      const aCard = a.Hand.Cards[i].charCodeAt(i)
      const bCard = b.Hand.Cards[i].charCodeAt(i)
      if (aCard < 58 && bCard > 58) {
        return -1
      }
      if (aCard > 58 && bCard < 58) {
        return 1
      }
      if (aCard > bCard) {
        return -1
      }
      if (aCard < bCard) {
        return 1
      }
    }
    return 0
  })

  return hands
}