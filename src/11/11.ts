export function parse(input: string): string[][] {
  return input.split('\n').map(line => line.split(''))
}

export function partOne(input: ReturnType<typeof parse>): number {
  return processUniverseExpandedBy(input, 1)
}

export function partTwo(input: ReturnType<typeof parse>) {
  return processUniverseExpandedBy(input, 1000000)
}

export type Galaxy = {
  ID: number
  X: number
  Y: number
}

export function buildUniverse(lines: string[][]): Galaxy[] {
  let result: Galaxy[] = []
  let foundGalaxies = 0

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] == '#') {
        foundGalaxies++
        result.push({ ID: foundGalaxies, X: j, Y: i })
      }
    }
  }

  return result
}

export function expandUniverse(
  universe: Galaxy[],
  increment: number = 1
): Galaxy[] {
  const colsToExpand = findEmptyFields(universe, Col)
  const rowsToExpand = findEmptyFields(universe, Row)

  colsToExpand.reverse().map(col => {
    universe.map(galaxy => {
      if (galaxy.X > col) {
        galaxy.X += increment
      }
    })
  })

  rowsToExpand.reverse().map(row => {
    universe.map(galaxy => {
      if (galaxy.Y > row) {
        galaxy.Y += increment
      }
    })
  })

  return universe
}

export function findEmptyFields(universe: Galaxy[], field: Field): number[] {
  let emptyFields: number[] = []
  let knownFields = new Set<number>()

  universe.map(galaxy => knownFields.add(field(galaxy)))

  for (let i = 0; i < universe.length; i++) {
    if (!knownFields.has(i)) {
      emptyFields.push(i)
    }
  }

  return emptyFields
}

export type Field = (Galaxy) => number

export function Row(g: Galaxy): number {
  return g.Y
}

export function Col(g: Galaxy): number {
  return g.X
}

export type GalacticPair = {
  A: Galaxy
  B: Galaxy
}

export function buildPairs(universe: Galaxy[]): GalacticPair[] {
  let pairs: GalacticPair[] = []

  for (let i = 0; i < universe.length; i++) {
    for (let j = i + 1; j < universe.length; j++) {
      pairs.push({ A: universe[i], B: universe[j] })
    }
  }

  return pairs
}

export function manhattanDistance(pair: GalacticPair): number {
  return Math.abs(pair.B.X - pair.A.X) + Math.abs(pair.B.Y - pair.A.Y)
}

export function processUniverseExpandedBy(
  input: string[][],
  factor: number
): number {
  let universe = buildUniverse(input)
  universe = expandUniverse(universe, factor - 1 || 1)
  const pairs = buildPairs(universe)

  let result = 0
  pairs.map(pair => {
    result += manhattanDistance(pair)
  })

  return result
}
