import run from 'aocrunner'
import { maxBy, minBy } from 'lodash-es'

const parseInput = (rawInput: string) => rawInput.split('\n')

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)
    let sum = 0
    for (const line of input) {
        const f = line.match(/(\d)/)!
        const l = line.match(/(\d)\D*$/)!
        sum += parseInt(`${f[1]}${l[1]}`, 10)
    }
    return sum
}

const part1alt = (rawInput: string) => combined(rawInput, false)
const part2 = (rawInput: string) => combined(rawInput, true)

const combined = (rawInput: string, withWords: boolean = true) => {
    const input = parseInput(rawInput)

    const digits: { [key: string]: number } = Object.fromEntries(
        Array.from({ length: 9 }, (_, i) => [String(i + 1), i + 1]),
    )
    if (withWords) {
        Object.assign(digits, {
            'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
            'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
        })
    }
    const keys = Object.keys(digits)
    const valid = (p: { k: string, i: number }) => p.i !== -1

    let sum = 0
    for (const line of input) {
        const first = minBy(keys.map((k) => ({ i: line.indexOf(k), k })).filter(valid), 'i')!.k
        const last = maxBy(keys.map((k) => ({ i: line.lastIndexOf(k), k })).filter(valid), 'i')!.k
        sum += digits[first] * 10 + digits[last]
    }
    return sum
}

run({
    part1: {
        tests: [
            {
                input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
    `,
                expected: 142,
            },
        ],
        solution: part1alt,
    },
    part2: {
        tests: [
            {
                input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
    `,
                expected: 281,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
