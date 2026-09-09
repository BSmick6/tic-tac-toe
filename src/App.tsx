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

function calculateWinner(squares: (Player | null)[]): Player | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
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

  const winner = calculateWinner(squares)

  function handleClick(i: number) {
    if (squares[i] || winner) return
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
