export function parse(input: string): Race[] {
  let result: Race[] = []

  const lines = input.split('\n')
  if (!lines || lines.length !== 2) {
    throw Error(`invalid line parse: ${lines}`)
  }

  const times = lines[0]
    ?.substring(6)
    .split(/\s/)
    .filter(char => char.length)
    .map(num => parseInt(num))

  const distances = lines[1]
    ?.substring(10)
    .split(/\s/)
    .filter(char => char.length)
    .map(num => parseInt(num))

  if (!times || !distances || times.length !== distances.length) {
    throw Error(
      `invalid time/distance parse: time: ${times}, distance: ${distances}`
    )
  }

  for (let i = 0; i < times.length; i++) {
    result.push({ Time: times[i], Distance: distances[i] })
  }

  return result
}

export function partOne(input: ReturnType<typeof parse>): number {
  let result = 1

  input.map(race => {
    result *= calculateWinPossibilities(race) || 1
  })

  return result
}

export function partTwo(input: ReturnType<typeof parse>): number {
  const actualRace = unBamboozleRaces(input)

  return calculateWinPossibilities(actualRace)
}

export type Race = {
  Time: number
  Distance: number
}

export function maxDistance(timeToHold: number, time: number): number {
  return timeToHold * (time - timeToHold)
}

export function calculateWinPossibilities(race: Race): number {
  let result = 0

  for (let i = 1; i < race.Time; i++) {
    const dist = maxDistance(i, race.Time)
    if (dist > race.Distance) {
      result++
    }
  }

  return result
}

export function unBamboozleRaces(races: Race[]): Race {
  let totalTimeStr = ''
  let totalDistanceStr = ''
  for (let i = 0; i < races.length; i++) {
    totalTimeStr += races[i].Time.toString()
    totalDistanceStr += races[i].Distance.toString()
  }

  return { Time: parseInt(totalTimeStr), Distance: parseInt(totalDistanceStr) }
}
