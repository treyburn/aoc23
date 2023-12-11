export function parse(input: string): number[][] {
  return input
    .split('\n')
    .map(line => line.split(/\s/).map(str => parseInt(str)))
}

export function partOne(input: ReturnType<typeof parse>): number {
  let result = 0

  for (const row of input) {
    result += derive(row, deriveNext)
  }

  return result
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let result = 0

  for (const row of input) {
    result += derive(row, derivePrevious)
  }

  return result
}

export type direction = (input: number[], derivative: number) => number

export function derive(input: number[], direction: direction): number {
  if (input.length == 1) {
    return input[0]
  }

  let diffs: number[] = []

  for (let i = 1; i < input.length; i++) {
    diffs.push(input[i] - input[i - 1])
  }

  const derivative = derive(diffs, direction)

  return direction(input, derivative)
}

export function deriveNext(input: number[], derivative): number {
  return derivative + input[input.length - 1]
}

export function derivePrevious(input: number[], derivative): number {
  return input[0] - derivative
}
