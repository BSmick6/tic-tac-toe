import { describe, expect, it } from 'vitest'
import {
  WINNING_LINES,
  calculateWinner,
  createEmptyBoard,
  isBoardFull,
  makeMove,
  randomBotMove,
  type Squares,
} from './game'

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

describe('isBoardFull', () => {
  it('returns false for an empty board', () => {
    expect(isBoardFull(createEmptyBoard())).toBe(false)
  })

  it('returns false while squares remain free', () => {
    const squares = createEmptyBoard()
    squares[0] = 'X'
    squares[1] = 'O'
    expect(isBoardFull(squares)).toBe(false)
  })

  it('returns true when every square is filled', () => {
    const squares: Squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']
    expect(isBoardFull(squares)).toBe(true)
  })
})

describe('randomBotMove', () => {
  it('returns null when the board is full', () => {
    const squares: Squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']
    expect(randomBotMove(squares)).toBeNull()
  })

  it('returns the only free square', () => {
    const squares: Squares = ['X', 'O', 'X', 'O', 'X', 'O', null, 'X', 'O']
    expect(randomBotMove(squares)).toBe(6)
  })

  it('returns a free square on a partially filled board', () => {
    const squares = createEmptyBoard()
    squares[0] = 'X'
    squares[4] = 'O'
    const free = [1, 2, 3, 5, 6, 7, 8]
    const move = randomBotMove(squares)
    expect(move).not.toBeNull()
    if (move === null) return // narrows the type; the assertion above already failed
    expect(free).toContain(move)
    expect(squares[move]).toBeNull()
  })
})