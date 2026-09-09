export type Player = 'X' | 'O'
export type Squares = (Player | null)[]

export const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function createEmptyBoard(): Squares {
  return Array(9).fill(null)
}

export function calculateWinner(
  squares: Squares,
): { winner: Player; line: number[] } | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line }
    }
  }
  return null
}

export function makeMove(squares: Squares, index: number, player: Player): Squares {
  const next = squares.slice()
  next[index] = player
  return next
}

export function isBoardFull(squares: Squares): boolean {
  return squares.every((square) => square !== null)
}

export function randomBotMove(squares: Squares): number | null {
  const free: number[] = []
  squares.forEach((square, i) => {
    if (square === null) free.push(i)
  })
  if (free.length === 0) return null
  return free[Math.floor(Math.random() * free.length)]
}