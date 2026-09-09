import { useState } from 'react'
import { calculateWinner, createEmptyBoard, makeMove, type Squares } from '../game'
import { Square } from './Square'
import { StrikeLine } from './StrikeLine'

export function Board() {
  const [squares, setSquares] = useState<Squares>(createEmptyBoard)
  const [xIsNext, setXIsNext] = useState(true)

  const result = calculateWinner(squares)

  function handleClick(i: number) {
    if (squares[i] || result) return
    setSquares(makeMove(squares, i, xIsNext ? 'X' : 'O'))
    setXIsNext(!xIsNext)
  }

  function restart() {
    setSquares(createEmptyBoard())
    setXIsNext(true)
  }

  return (
    <>
      <div className="board">
        {squares.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleClick(i)} />
        ))}
        {result && <StrikeLine line={result.line} />}
      </div>
      <button className="restart" onClick={restart}>
        Restart
      </button>
    </>
  )
}