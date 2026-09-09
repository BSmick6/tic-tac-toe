import { useState } from 'react'
import './App.css'

type Player = 'X' | 'O'

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

  function handleClick(i: number) {
    if (squares[i]) return
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
