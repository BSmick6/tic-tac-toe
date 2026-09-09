import { useState } from 'react'
import './App.css'

type Player = 'X' | 'O'

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const CELL = 100
const GAP = 4
const BOARD_SIZE = CELL * 3 + GAP * 2

function calculateWinner(
  squares: (Player | null)[],
): { winner: Player; line: number[] } | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line }
    }
  }
  return null
}

function cellCenter(i: number): { x: number; y: number } {
  const row = Math.floor(i / 3)
  const col = i % 3
  return {
    x: col * (CELL + GAP) + CELL / 2,
    y: row * (CELL + GAP) + CELL / 2,
  }
}

function StrikeLine({ line }: { line: number[] }) {
  const [a, , c] = line
  const start = cellCenter(a)
  const end = cellCenter(c)
  const dx = end.x - start.x
  const dy = end.y - start.y
  const len = Math.hypot(dx, dy)
  const extension = 50
  const ux = (dx / len) * extension
  const uy = (dy / len) * extension

  return (
    <svg
      className="win-line"
      viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
      aria-hidden="true"
    >
      <line
        x1={start.x - ux}
        y1={start.y - uy}
        x2={end.x + ux}
        y2={end.y + uy}
      />
    </svg>
  )
}

function Square({
  value,
  onClick,
}: {
  value: Player | null
  onClick: () => void
}) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board() {
  const [squares, setSquares] = useState<(Player | null)[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const result = calculateWinner(squares)

  function handleClick(i: number) {
    if (squares[i] || result) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => handleClick(i)} />
      ))}
      {result && <StrikeLine line={result.line} />}
    </div>
  )
}

function App() {
  return (
    <main className="game">
      <h1>Tic Tac Toe</h1>
      <Board />
    </main>
  )
}

export default App
