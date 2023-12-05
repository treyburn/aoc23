export function parse(input: string): ScratchCard[] {
  let result: ScratchCard[] = []
  const lines = input.split('\n')
  lines.map(line => {
    let matched = line.match(/Card\s+(\d)+:([\d\s]+)+\|([\d\s]+)+$/)
    if (!matched || matched.length !== 4) {
      console.log('Matched:', matched)
      // this is just to debug on the full input
      throw Error(`invalid line: ${line}`)
    }

    let gameIDstr = matched[1]
    let winningNumbersToParse = matched[2]
    let cardNumbersToParse = matched[3]
    let winningNums = new Set<Number>()
    let cardNumbers = new Set<Number>()

    winningNumbersToParse
      .split(/\s+/)
      .map(num => parseInt(num))
      .filter(num => !isNaN(num))
      .map(num => {
        if (winningNums.has(num)) {
          // debugging for the full input
          throw Error(
            `invalid line: ${line}\nnumber already in winning nums: ${num}`
          )
        }
        winningNums.add(num)
      })

    cardNumbersToParse
      .split(/\s+/)
      .map(num => parseInt(num))
      .filter(num => !isNaN(num))
      .map(num => {
        if (cardNumbers.has(num)) {
          // debugging for the full input
          throw Error(
            `invalid line: ${line}\nnumber already in card nums: ${num}`
          )
        }
        cardNumbers.add(num)
      })

    result.push({
      ID: parseInt(gameIDstr) || 0,
      WinningNumbers: winningNums,
      CardNumbers: cardNumbers
    })
  })

  return result
}

export function partOne(input: ReturnType<typeof parse>) {
  let result = 0

  input.map(card => {
    result += calculateCardValue(card)
  })

  return result
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let result = 0
  let cache = new Map<number, number>()

  for (let i = 0; i < input.length; i++) {
    // set cache value
    let curr = 1
    if (cache.has(i)) {
      curr = cache.get(i)
    }
    cache.set(i, curr)

    // determine copies
    let copies = calculateWinningNums(input[i])

    // update copies cache
    for (let j = 1; j <= copies; j++) {
      let update = 1
      if (cache.has(i + j)) {
        update = cache.get(i + j)
      }
      cache.set(i + j, update + curr)
    }
  }

  // if we incorrectly declared values beyond the number of cards then they will be excluded here
  for (let i = 0; i < input.length; i++) {
    let val = cache.get(i)
    result += val
  }

  return result
}

export type ScratchCard = {
  ID: number
  WinningNumbers: Set<number> // check for dupes?
  CardNumbers: Set<number> // check for dupes?
}

export function calculateCardValue(card: ScratchCard): number {
  let result = 0

  for (const cardNumber of card.CardNumbers) {
    if (card.WinningNumbers.has(cardNumber)) {
      if (result == 0) {
        result = 1
      } else {
        result = result * 2
      }
    }
  }

  return result
}

export function calculateWinningNums(card: ScratchCard): number {
  let result = 0

  for (const cardNumber of card.CardNumbers) {
    if (card.WinningNumbers.has(cardNumber)) {
      result++
    }
  }

  return result
}
