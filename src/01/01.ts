// parse converts the newline separated string into an array of strings split by newline
export function parse(input: string): string[] {
  return input.split('\n')
}

// partOne processes our input to return the solution of part 1
export function partOne(input: ReturnType<typeof parse>): number {
  let result: number = 0

  for (const line of input) {
    result += parseRunes(line)
  }

  return result
}

// partTwo processes our input to return the solution of part 2
export function partTwo(input: ReturnType<typeof parse>): number {
  let result: number = 0

  for (const line of input) {
    result += findValidNumbers(line)
  }

  return result
}

// parseRunes iterates over the runes (code points) of a string, checks if they are digits, and combines the first/last
// digits into a 2-digit number
export function parseRunes(input: string): number {
  // instantiate our local vars
  let foundFirst: boolean = false
  let first: number = 0
  let last: number = 0

  // iterate over every character
  for (let i = 0; i < input.length; i++) {
    // read the char as a rune
    let rune = input.charCodeAt(i)
    // handle if the rune is the codepoint for a number
    if (rune >= 48 && rune <= 57) {
      if (!foundFirst) {
        foundFirst = true
        first = rune - 48
        last = rune - 48
      } else {
        last = rune - 48
      }
    }
  }

  // convert digits into 2 digit number
  return first * 10 + last
}

// findValidNumbers searches for valid substrings contained within the input
// first and last valid numbers are combined into a 2-digit number
export function findValidNumbers(input: string): number {
  // default of 0 in case no values present
  let first: number = 0
  let last: number = 0

  // set index beyond max possible value so that it can be overridden in worst case scenario (first/last char)
  let firstIdx: number = input.length
  let lastIdx: number = -1

  // lookup table of valid answers
  const valid: Map<string, number> = new Map<string, number>([
    ['zero', 0],
    ['0', 0],
    ['one', 1],
    ['1', 1],
    ['two', 2],
    ['2', 2],
    ['three', 3],
    ['3', 3],
    ['four', 4],
    ['4', 4],
    ['five', 5],
    ['5', 5],
    ['six', 6],
    ['6', 6],
    ['seven', 7],
    ['7', 7],
    ['eight', 8],
    ['8', 8],
    ['nine', 9],
    ['9', 9]
  ])

  // iterate over keys
  for (const key of valid.keys()) {
    if (input.includes(key)) {
      let firstPos: number = input.indexOf(key)
      let lastPos: number = input.lastIndexOf(key)

      // update first value if key appears before previous entries
      if (firstPos < firstIdx) {
        first = valid.get(key)
        firstIdx = firstPos
      }

      // update last value if key appears after previous entries
      if (lastPos > lastIdx) {
        last = valid.get(key)
        lastIdx = lastPos
      }
    }
  }

  // convert digits into 2 digit number
  return first * 10 + last
}
