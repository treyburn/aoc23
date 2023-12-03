export function parse(input: string): Game[] {
  const lines = input.split('\n')
  let games: Game[] = []

  lines.map(line => games.push(parseGame(line)))

  return games
}

export function parseGame(input: string): Game {
  let matches = input.trim().match(/^Game (\d+): (.+)$/)
  const gameID = parseInt(matches[1]) || 1
  let rounds: Map<string, number>[] = []

  matches[2].split(';').map(roundStr => {
    let round = new Map<string, number>()
    roundStr.split(',').map(r => {
      const m = r.match(/(\d+) (.+)$/)
      if (m && m.length == 3) {
        round.set(m[2], parseInt(m[1]))
      }
    })
    rounds.push(round)
  })

  return { id: gameID, rounds: rounds }
}

export function isLegal(input: Game): boolean {
  const legal = new Map<string, number>([
    ['green', 13],
    ['blue', 14],
    ['red', 12]
  ])

  for (const round of input.rounds) {
    for (const [color, value] of legal) {
      if (round.has(color)) {
        if (round.get(color) > value) {
          return false
        }
      }
    }
  }

  return true
}

export function cubePower(input: Game): Number {
  let maxGreen = 1
  let maxBlue = 1
  let maxRed = 1

  input.rounds.map(round => {
    if (round.has('green') && round.get('green') > maxGreen) {
      maxGreen = round.get('green') || maxGreen
    }
    if (round.has('blue') && round.get('blue') > maxBlue) {
      maxBlue = round.get('blue') || maxBlue
    }
    if (round.has('red') && round.get('red') > maxRed) {
      maxRed = round.get('red') || maxRed
    }
  })

  return maxGreen * maxRed * maxBlue
}

export function partOne(input: ReturnType<typeof parse>): number {
  let result: number = 0

  input
    .map(game => game)
    .filter(game => isLegal(game))
    .map(game => (result += game.id))

  return result
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let result: number = 0

  input.map(game => (result += cubePower(game)))

  return result
}

export type Game = {
  id: number
  rounds: Map<string, number>[]
}
