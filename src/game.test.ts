import { describe, expect, it } from 'vitest'
import { WINNING_LINES, calculateWinner, createEmptyBoard, makeMove } from './game'

describe('createEmptyBoard', () => {
  it('returns nine empty squares', () => {
    expect(createEmptyBoard()).toEqual(Array(9).fill(null))
  })
})

describe('calculateWinner', () => {
  it('returns null for an empty board', () => {
    expect(calculateWinner(createEmptyBoard())).toBeNull()
  })

  it('returns null when no line is fully occupied', () => {
    const squares = createEmptyBoard()
    squares[0] = 'X'
    squares[1] = 'X'
    squares[3] = 'O'
    squares[4] = 'O'
    expect(calculateWinner(squares)).toBeNull()
  })

  it('returns null when a line is blocked by the other player', () => {
    const squares = createEmptyBoard()
    squares[0] = 'X'
    squares[1] = 'O'
    squares[2] = 'X'
    expect(calculateWinner(squares)).toBeNull()
  })

  it.each(WINNING_LINES.map((line) => ({ line })))(
    'detects an X win on line %j',
    ({ line }: { line: number[] }) => {
      const squares = createEmptyBoard()
      line.forEach((index) => {
        squares[index] = 'X'
      })
      expect(calculateWinner(squares)).toEqual({ winner: 'X', line })
    },
  )

  it.each(WINNING_LINES.map((line) => ({ line })))(
    'detects an O win on line %j',
    ({ line }: { line: number[] }) => {
      const squares = createEmptyBoard()
      line.forEach((index) => {
        squares[index] = 'O'
      })
      expect(calculateWinner(squares)).toEqual({ winner: 'O', line })
    },
  )
})

describe('makeMove', () => {
  it('places the player at the given index', () => {
    const next = makeMove(createEmptyBoard(), 4, 'O')
    expect(next[4]).toBe('O')
  })

  it('returns a new board without mutating the input', () => {
    const squares = createEmptyBoard()
    const next = makeMove(squares, 0, 'X')
    expect(next).not.toBe(squares)
    expect(squares[0]).toBeNull()
    expect(next).toEqual(['X', ...Array(8).fill(null)])
  })
})