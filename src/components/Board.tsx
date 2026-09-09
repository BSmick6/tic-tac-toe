import { useState } from 'react'
import {
  calculateWinner,
  createEmptyBoard,
  isBoardFull,
  makeMove,
  randomBotMove,
  type Squares,
} from '../game'
import { Square } from './Square'
import { StrikeLine } from './StrikeLine'

export function Board() {
  const [squares, setSquares] = useState<Squares>(createEmptyBoard)
  const [xIsNext, setXIsNext] = useState(true)
  const [botMode, setBotMode] = useState(false)

  const result = calculateWinner(squares)

  function handleClick(i: number) {
    if (squares[i] || result || (botMode && !xIsNext)) return
    const afterHuman = makeMove(squares, i, xIsNext ? 'X' : 'O')

    let finalSquares = afterHuman
    let xIsNextAfter = !xIsNext

    // In bot mode the human only plays X, so a bot O reply follows immediately.
    if (
      botMode &&
      !xIsNextAfter &&
      !calculateWinner(afterHuman) &&
      !isBoardFull(afterHuman)
    ) {
      const move = randomBotMove(afterHuman)
      if (move !== null) {
        finalSquares = makeMove(afterHuman, move, 'O')
        xIsNextAfter = true
      }
    }

    setSquares(finalSquares)
    setXIsNext(xIsNextAfter)
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
      <label className="bot-toggle">
        <input
          type="checkbox"
          checked={botMode}
          onChange={(event) => setBotMode(event.target.checked)}
        />
        Play vs bot
      </label>
      <button className="restart" onClick={restart}>
        Restart
      </button>
    </>
  )
}