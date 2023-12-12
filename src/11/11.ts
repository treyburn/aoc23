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
  const colsToExpand = findEmptyCols(universe)
  const rowsToExpand = findEmptyRows(universe)

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

export function findEmptyCols(universe: Galaxy[]): number[] {
  let emptyCols: number[] = []
  let knownCols = new Set<number>()

  universe.map(galaxy => knownCols.add(galaxy.X))

  for (let i = 0; i < universe.length; i++) {
    if (!knownCols.has(i)) {
      emptyCols.push(i)
    }
  }

  return emptyCols
}

export function findEmptyRows(universe: Galaxy[]): number[] {
  let emptyRows: number[] = []
  let knownRows = new Set<number>()

  universe.map(galaxy => knownRows.add(galaxy.Y))

  for (let i = 0; i < universe.length; i++) {
    if (!knownRows.has(i)) {
      emptyRows.push(i)
    }
  }

  return emptyRows
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
