export function parse(input: string): string[][] {
  let result: string[][] = []
  input.split('\n').map(line => {
    let row: string[] = []
    line.split('').map(char => row.push(char))
    result.push(row)
  })
  return result
}

export function partOne(input: ReturnType<typeof parse>): number {
  let result = 0
  const parts = findPartNumbers(input)
  parts.map(part => {
    if (isValidPartNumber(part)) {
      result += part.Value
    }
  })

  return result
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let result = 0
  const gears = findGears(input)

  for (const key of gears.keys()) {
    let ratio = gears.get(key)

    result += ratio[0] * ratio[1]
  }

  return result
}

// calculateBounds returns zero indexed boundaries of a 2D matrix
export function calculateBounds(input: string[][]): Bounds {
  const rowCount = input.length
  const charCount = input[0].length

  return { Up: 0, Down: rowCount - 1, Left: 0, Right: charCount - 1 }
}

export type Bounds = {
  Up: number
  Down: number
  Left: number
  Right: number
}

export function findPartNumbers(input: string[][]): PartNumber[] {
  let parts: PartNumber[] = []

  const boundary = calculateBounds(input)
  let strNum = ''
  let start = 0
  let end = 0

  // iterate over each row and look for part numbers
  for (let i = 0; i <= boundary.Down; i++) {
    // iterate over each char in the row and build the part number
    for (let j = 0; j <= boundary.Right; j++) {
      // cast char to rune so that we can check if it's a number
      let rune = input[i][j].charCodeAt(0)
      // check if char is number
      if (rune >= 48 && rune <= 57) {
        // if first number then save start position in row
        if (strNum.length == 0) {
          start = j
        }
        // append char to number string and continue
        strNum += input[i][j]
        continue
      }

      // number ended at previous char. build the PartNumber
      if (strNum.length > 0) {
        end = j - 1
        let partNum = parseInt(strNum) || 0
        let partBorder = buildBorder(input, i, start, end)
        let part = { Value: partNum, Border: partBorder }
        parts.push(part)
        // set strNum back to empty
        strNum = ''
      }

      // not a number - so continue
      strNum = ''
    }

    // handle parts numbers that ended at right border
    if (strNum.length > 0) {
      end = boundary.Right
      let partNum = parseInt(strNum) || 0
      let partBorder = buildBorder(input, i, start, end)
      let part = { Value: partNum, Border: partBorder }
      parts.push(part)
      strNum = ''
    }
  }

  return parts
}

export function buildBorder(
  input: string[][],
  row: number,
  cLeft: number,
  cRight: number
): string[] {
  let border: string[] = []
  const boundary = calculateBounds(input)

  let left = boundary.Left
  let right = boundary.Right
  if (cLeft > boundary.Left) {
    left = cLeft - 1
  }
  if (cRight < boundary.Right) {
    right = cRight + 1
  }

  // not on top row
  if (row > boundary.Up) {
    input
      .at(row - 1)
      .slice(left, right + 1)
      .map(char => border.push(char))
  }

  // not at left bound
  if (cLeft > boundary.Left) {
    border.push(input.at(row).at(left))
  }

  // not at right bound
  if (cRight < boundary.Right) {
    border.push(input.at(row).at(right))
  }

  // not on bottom row
  if (row < boundary.Down) {
    input
      .at(row + 1)
      .slice(left, right + 1)
      .map(char => border.push(char))
  }

  return border
}

export function isValidPartNumber(part: PartNumber): boolean {
  let foundSymbol = false

  part.Border.map(char => {
    if (char !== '.') {
      foundSymbol = true
    }
  })

  return foundSymbol
}

export type PartNumber = {
  Value: number
  Border: string[]
}

export function findPotentialGears(
  input: string[][],
  row: number,
  cLeft: number,
  cRight: number
): string[] {
  let keys: string[] = []
  const boundary = calculateBounds(input)

  let left = boundary.Left
  let right = boundary.Right
  if (cLeft > boundary.Left) {
    left = cLeft - 1
  }
  if (cRight < boundary.Right) {
    right = cRight + 1
  }

  // check top row for gear
  if (row > boundary.Up) {
    for (let i = left; i <= right; i++) {
      if (input[row - 1][i] == '*') {
        keys.push(`${row - 1}-${i}`)
      }
    }
  }

  // check left for gear
  if (left < cLeft) {
    if (input[row][left] == '*') {
      keys.push(`${row}-${left}`)
    }
  }

  // check right for gear
  if (right > cRight) {
    if (input[row][right] == '*') {
      keys.push(`${row}-${right}`)
    }
  }

  // check bottom row for gear
  if (row < boundary.Down) {
    for (let i = left; i <= right; i++) {
      if (input[row + 1][i] == '*') {
        keys.push(`${row + 1}-${i}`)
      }
    }
  }

  return keys
}

export function findGears(input: string[][]): Map<string, number[2]> {
  let potentialGears = new Map<string, number[2]>()

  const boundary = calculateBounds(input)
  let strNum = ''
  let start = 0
  let end = 0

  // iterate over each row and look for part numbers
  for (let i = 0; i <= boundary.Down; i++) {
    // iterate over each char in the row and build the part number
    for (let j = 0; j <= boundary.Right; j++) {
      // cast char to rune so that we can check if it's a number
      let rune = input[i][j].charCodeAt(0)
      // check if char is number
      if (rune >= 48 && rune <= 57) {
        // if first number then save start position in row
        if (strNum.length == 0) {
          start = j
        }
        // append char to number string and continue
        strNum += input[i][j]
        continue
      }

      // number ended at previous char. build the PartNumber
      if (strNum.length > 0) {
        end = j - 1
        let partNum = parseInt(strNum) || 0
        let potentialGearKeys = findPotentialGears(input, i, start, end)

        // insert part numbers to potentialGears cache
        potentialGearKeys.map(key => {
          let gearPair: number[2] = []
          if (potentialGears.has(key)) {
            gearPair = potentialGears.get(key)
          }

          // add part number to the pair and set to cache
          gearPair.push(partNum)
          potentialGears.set(key, gearPair)
        })

        // set strNum back to empty
        strNum = ''
      }

      // not a number - so continue
      strNum = ''
    }

    // handle parts numbers that ended at right border
    if (strNum.length > 0) {
      end = boundary.Right
      let partNum = parseInt(strNum) || 0
      let potentialGearKeys = findPotentialGears(input, i, start, end)
      // insert part numbers to potentialGears cache
      potentialGearKeys.map(key => {
        let gearPair: number[2] = []
        if (potentialGears.has(key)) {
          gearPair = potentialGears.get(key)
        }

        // add part number to the pair and set to cache
        gearPair.push(partNum)
        potentialGears.set(key, gearPair)
      })
      strNum = ''
    }
  }

  for (const key of potentialGears.keys()) {
    if (potentialGears.get(key).length != 2) {
      potentialGears.delete(key)
    }
  }

  return potentialGears
}
