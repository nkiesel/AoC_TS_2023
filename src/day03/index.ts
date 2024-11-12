import run from 'aocrunner'
import { sum } from 'lodash-es'

const parseInput = (rawInput: string) => rawInput.split('\n')

const point = (x: number, y: number) => `${x},${y}`

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)
    const symbols = new Set(input.flatMap((line, y) => [...line.matchAll(/[^\d.]/g)].map((r) => point(r.index!, y))))
    const isSymbol = (x: number, y: number): boolean => symbols.has(point(x, y))
    const nextToSymbol = (xs: number, l: number, y: number): boolean => {
        if (isSymbol(xs - 1, y) || isSymbol(xs + l, y)) return true
        for (let x = xs - 1; x <= xs + l; x++) {
            if (isSymbol(x, y - 1) || isSymbol(x, y + 1)) return true
        }
        return false
    }
    let result = 0
    input.forEach((line, y) => {
        result += sum([...line.matchAll(/\d+/g)].filter((r) => nextToSymbol(r.index!, r[0].length, y)).map((r) => Number(r[0])))
    })
    return result
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)
    const symbols = new Set(input.flatMap((line, y) => [...line.matchAll(/[^\d.]/g)].map((r) => point(r.index!, y))))
    const symbolNeighbors = (xs: number, l: number, y: number): string[] => {
        const p: string[] = []
        const check = (x: number, y: number) => {
            const s = point(x, y)
            if (symbols.has(s)) p.push(s)
        }
        check(xs - 1, y)
        check(xs + l, y)
        for (let x = xs - 1; x <= xs + l; x++) {
            check(x, y - 1)
            check(x, y + 1)
        }
        return p
    }
    const n: Map<string, number[]> = new Map()
    input.forEach((line, y) => {
        for (const r of line.matchAll(/\d+/g)) {
            const v = Number(r[0])
            symbolNeighbors(r.index!, r[0].length, y).forEach((s) => {
                const l = n.get(s)
                if (l === undefined) {
                    n.set(s, [v])
                } else {
                    l.push(v)
                }
            })
        }
    })

    let sum = 0
    n.forEach((values) => {
        if (values.length === 2) sum += values[0] * values[1]
    })
    return sum
}

const sample = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`
run({
    part1: {
        tests: [
            {
                input: sample,
                expected: 4361,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: sample,
                expected: 467835,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
