import run from 'aocrunner'
import { sum } from 'lodash-es'

type Card = {
    wins: number
    count: number
}

const parseInput = (rawInput: string): Card[] => {
    return rawInput.split('\n').map((line) => {
        const m = line.match(/Card\s+\d+:\s*(.+)\s*\|\s*(.+)/)!
        const winning = [...m[1].matchAll(/\d+/g)].map((n) => Number(n))
        const have = [...m[2].matchAll(/\d+/g)].map((n) => Number(n))
        return { wins: winning.filter((w) => have.includes(w)).length, count: 1 }
    })
}

const part1 = (rawInput: string) =>
    sum(parseInput(rawInput)
        .filter((c) => c.wins > 0)
        .map((c) => Math.pow(2, c.wins - 1)),
    )

const part2 = (rawInput: string) => {
    const cards = parseInput(rawInput)
    cards.forEach((c, i) => {
        for (let w = 1; w <= c.wins; w++) cards[i + w].count += c.count
    })
    return sum(cards.map((c) => c.count))
}

const sample = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

run({
    part1: {
        tests: [
            {
                input: sample,
                expected: 13,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: sample,
                expected: 30,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
