export function parse(input: string): string[][] {
  return input.split('\n').map(line => line.split(''))
}

export function partOne(input: ReturnType<typeof parse>): number {
  let steps = 0
  const start = findStartLocation(input)
  let next = getFirstDirectionFromStart(input, start)
  let heading = getDirection(start, next)

  while (next != start) {
    steps++
    let current = next
    if (current.X == start.X && current.Y == start.Y) {
      break
    }
    next = getNextCoord(input, current, heading)
    heading = getDirection(current, next)
  }

  return steps / 2
}

export function partTwo(input: ReturnType<typeof parse>) {}

export type Coordinate = {
  X: number
  Y: number
}

export function findStartLocation(input: string[][]): Coordinate {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == 'S') {
        return { X: j, Y: i }
      }
    }
  }

  return { X: 0, Y: 0 }
}

export function getFirstDirectionFromStart(
  input: string[][],
  start: Coordinate
): Coordinate {
  // look North
  if (start.Y > 0) {
    let up = input[start.Y - 1][start.X]
    if (up == '|' || up == 'F' || up == '7') {
      return { X: start.X, Y: start.Y - 1 }
    }
  }

  // look East
  if (start.X + 1 < input[0].length) {
    let right = input[start.Y][start.X + 1]
    if (right == '-' || right == 'J' || right == '7') {
      return { X: start.X + 1, Y: start.Y }
    }
  }

  // look South
  if (start.Y + 1 < input.length) {
    let down = input[start.Y + 1][start.X]
    if (down == '|' || down == 'L' || down == 'J') {
      return { X: start.X, Y: start.Y + 1 }
    }
  }

  // look West
  if (start.X > 0) {
    let left = input[start.Y][start.X - 1]
    if (left == '-' || left == 'F' || left == 'L') {
      return { X: start.X - 1, Y: start.Y }
    }
  }

  throw Error('no suitable connection from start')
}

export enum Direction {
  North = 'North',
  South = 'South',
  East = 'East',
  West = 'West'
}

export function getDirection(from: Coordinate, to: Coordinate): Direction {
  if (from.X == to.X) {
    if (from.Y < to.Y) {
      return Direction.South
    }
    return Direction.North
  }

  if (from.X > to.X) {
    return Direction.West
  }

  return Direction.East
}

export function getNextCoord(
  input: string[][],
  from: Coordinate,
  heading: Direction
): Coordinate {
  let char = input[from.Y][from.X]
  let to: Coordinate

  switch (char) {
    case '|':
      switch (heading) {
        case Direction.South:
          to = { X: from.X, Y: from.Y + 1 } // go south
          break
        case Direction.North:
          to = { X: from.X, Y: from.Y - 1 } // go north
          break
      }
      break
    case '-':
      switch (heading) {
        case Direction.East:
          to = { X: from.X + 1, Y: from.Y } // go east
          break
        case Direction.West:
          to = { X: from.X - 1, Y: from.Y } // go west
          break
      }
      break
    case 'L':
      switch (heading) {
        case Direction.West:
          to = { X: from.X, Y: from.Y - 1 } // go north
          break
        case Direction.South:
          to = { X: from.X + 1, Y: from.Y } // go east
          break
      }
      break
    case 'J':
      switch (heading) {
        case Direction.South:
          to = { X: from.X - 1, Y: from.Y } // go west
          break
        case Direction.East:
          to = { X: from.X, Y: from.Y - 1 } // go north
          break
      }
      break
    case '7':
      switch (heading) {
        case Direction.North:
          to = { X: from.X - 1, Y: from.Y } // go west
          break
        case Direction.East:
          to = { X: from.X, Y: from.Y + 1 } // go south
          break
      }
      break
    case 'F':
      switch (heading) {
        case Direction.North:
          to = { X: from.X + 1, Y: from.Y } // go east
          break
        case Direction.West:
          to = { X: from.X, Y: from.Y + 1 } // go south
          break
      }
      break
    case '.':
      throw Error(`next time from ${from} headed ${heading} is empty`)
    case 'S':
      throw Error('this function not intended to handle the start location')
  }

  if (!to) {
    throw Error(
      `could not generate a valid move from < ${from.X}, ${from.Y} > with heading ${heading}`
    )
  }

  return to
}
