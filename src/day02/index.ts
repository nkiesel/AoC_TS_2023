import run from 'aocrunner'
import { maxBy, sum } from 'lodash-es'

type Reveal = {
    red: number
    green: number
    blue: number
}

type Game = {
    id: number
    reveals: Reveal[]
}

const parseInput = (rawInput: string): Game[] =>
    rawInput
        .split('\n')
        .map((line) => line.match(/Game (\d+): (.+)/)!)
        .map((m) => ({
            id: Number(m[1]),
            reveals: m[2].split(';').map((r) => ({
                red: Number(r.match(/(\d+) red/)?.[1] ?? 0),
                green: Number(r.match(/(\d+) green/)?.[1] ?? 0),
                blue: Number(r.match(/(\d+) blue/)?.[1] ?? 0),
            })),
        }))

const part1 = (rawInput: string) =>
    sum(parseInput(rawInput).map((game) =>
        (game.reveals.every((r) => r.red <= 12 && r.green <= 13 && r.blue <= 14) ? game.id : 0),
    ))

const part2 = (rawInput: string) =>
    sum(parseInput(rawInput).map((game) => game.reveals).map((reveals) =>
        maxBy(reveals, 'red')!.red * maxBy(reveals, 'green')!.green * maxBy(reveals, 'blue')!.blue),
    )

const sample = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`
run({
    part1: {
        tests: [
            {
                input: sample,
                expected: 8,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: sample,
                expected: 2286,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
