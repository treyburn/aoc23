export function parse(input: string): Almanac {
  const lines = input.split('\n')

  const seedsToParse = lines[0].match(/seeds:\s([\d\s]+)+$/)
  if (!seedsToParse || seedsToParse.length != 2) {
    console.log('seedsToParse', seedsToParse)
    throw Error('unable to parse seeds with regex')
  }

  const seeds = parseSeeds(seedsToParse[1])
  let channels: Channel[] = []

  let lookupToParse: string[] = []
  for (const line of lines.slice(1)) {
    // check for end of block
    if (line == '') {
      // check if we actually have anything to parse
      if (lookupToParse.length > 0) {
        // parse into a LookupMap
        const lookup = parseLookupMap(lookupToParse)
        // convert to a channel
        const chan = buildChannel(lookup)
        // push channel to channels
        channels.push(chan)
      }
      // set to empty and continue
      lookupToParse = []
      continue
    }

    // otherwise handle strings
    // check if header - skip if match
    if (line.match(/\w+-\w+-\w+\smap:$/)) {
      continue
    }

    lookupToParse.push(line)
  }

  // check if we have anything left to parse
  if (lookupToParse.length > 0) {
    // parse into a LookupMap
    const lookup = parseLookupMap(lookupToParse)
    // convert to a channel
    const chan = buildChannel(lookup)
    // push channel to channels
    channels.push(chan)
  }

  return { Seeds: seeds, Funnel: channels }
}

export function partOne(input: ReturnType<typeof parse>): number {
  let min: number

  for (const seed of input.Seeds) {
    const got = processSeed(seed, input.Funnel)
    // set min if not yet set
    if (!min) {
      min = got
    }

    // update min if a lower output is recieved
    if (got < min) {
      min = got
    }
  }

  return min
}

// for those that wander into this repo - you may be lost but here is treasure.
// below I attempted to skip ranges where we had already processed these.
// my first attempt was to cache results in a map. I ran OOM. lol.
// next I attempted to just skip if we had been through the range.
// at least we were stateless - but alas I should have just looked at the input data.
// indeed there was no overlap.
// thus we let this bad boy brute force - took about 15 minutes.
export function partTwo(input: ReturnType<typeof parse>): number {
  let min = -1

  for (let i = 0; i < input.Seeds.length; i += 2) {
    let count = 0
    let skipCount = 0
    const start = input.Seeds[i]
    const range = input.Seeds[i + 1]

    for (let j = start; j < start + range; j++) {
      // for debug purposes
      count++
      if (count % 25_000_000 == 0) {
        console.log(
          `${Date()} iteration ${i / 2} in progress: counted ${count}`
        )
      }
      // check previous ranges and see if value is present
      let shouldSkip = false
      for (let k = 0; k < i; k += 2) {
        if (j >= input.Seeds[k] && j <= input.Seeds[k] + input.Seeds[k + 1]) {
          shouldSkip = true
          break
        }
      }
      // skip if necessary
      if (shouldSkip) {
        skipCount++
        continue
      }
      const got = processSeed(j, input.Funnel)
      if (!got) {
        console.log(
          `Received an invalid output for seed #${j} on iteration ${i / 2}`
        )
      }

      // set min if not yet set
      if (min < 0) {
        console.log('Updated min from -1')
        min = got
      }

      // update min if a lower output is received
      if (got < min) {
        min = got
      }
    }
    console.log('counted:', count)
    console.log('skipped:', skipCount)
  }

  console.log('Min:', min)
  return min
}

export type Almanac = {
  Seeds: number[]
  Funnel: Channel[]
}

export type LookupMap = {
  Destination: number
  Source: number
  Range: number
}

export type Channel = (num: number) => number

export function buildChannel(lookupTable: LookupMap[]): Channel {
  return (input: number): number => {
    for (const lookup of lookupTable) {
      // if the input is within the range of the source then calculate and return the destination
      if (input >= lookup.Source && input <= lookup.Source + lookup.Range) {
        const diff = input - lookup.Source
        return lookup.Destination + diff
      }
    }
    // otherwise the source and destination value are the same
    return input
  }
}

export function parseSeeds(input: string): number[] {
  let result: number[] = []

  input.split(/\s/).map(val => {
    const num = parseInt(val)
    if (num && !isNaN(num)) {
      result.push(num)
    }
  })

  return result
}

export function parseLookupMap(input: string[]): LookupMap[] {
  let result: LookupMap[] = []

  input.map(line => {
    const lookupToParse = line.match(/(\d+)\s(\d+)\s(\d+)$/)
    if (!lookupToParse || lookupToParse.length !== 4) {
      console.log('lookupToParse', lookupToParse)
      throw Error('invalid parsing of lookup')
    }

    const dst = parseInt(lookupToParse[1])
    const src = parseInt(lookupToParse[2])
    const range = parseInt(lookupToParse[3])

    result.push({ Destination: dst, Source: src, Range: range })
  })

  return result
}

export function processSeed(seed: number, funnel: Channel[]): number {
  let result = seed
  for (const chan of funnel) {
    result = chan(result)
  }

  return result
}
