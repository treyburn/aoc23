import { match } from 'assert'

export function parse(input: string): Guide {
  let result = new Map<string, Node>()

  const lines = input.split('\n')

  lines
    .slice(1)
    .map(line => line.match(/^(\w{3})\s=\s\((\w{3}),\s(\w{3})\)$/))
    .filter(matched => matched)
    .map(matched => {
      const [_, key, left, right] = matched
      result.set(key, { Left: left, Right: right })
    })

  return { Instructions: lines[0], DesertMaps: result }
}

export function partOne(input: ReturnType<typeof parse>): number {
  const start = 'AAA'
  const end = 'ZZZ'

  return countSteps(start, end, input)
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let current: string[] = []

  for (const key of input.DesertMaps.keys()) {
    if (key.endsWith('A')) {
      current.push(key)
    }
  }

  let counts: number[] = []

  for (let key of current) {
    counts.push(countSteps(key, 'Z', input))
  }

  return findLCM(counts)
}

export function countSteps(start: string, end: string, map: Guide): number {
  let result = 0
  let current = start

  let idx = 0
  while (!current.endsWith(end)) {
    result++
    // reset to start of instructions
    if (idx >= map.Instructions.length) {
      idx = 0
    }

    if (map.Instructions.charAt(idx) == 'R') {
      current = map.DesertMaps.get(current).Right
    } else {
      current = map.DesertMaps.get(current).Left
    }

    idx++
  }

  return result
}

export type Guide = {
  Instructions: string
  DesertMaps: Map<string, Node>
}

export type Node = {
  Left: string
  Right: string
}

function gcd(a: number, b: number): number {
  if (b == 0) return a
  return gcd(b, a % b)
}

export function findLCM(arr: number[]): number {
  let ans = arr[0]

  for (let i = 1; i < arr.length; i++) {
    ans = (arr[i] * ans) / gcd(arr[i], ans)
  }

  return ans
}
