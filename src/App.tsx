import './App.css'

function Square() {
  return <button className="square"></button>
}

function Board() {
  return (
    <div className="board">
      {Array.from({ length: 9 }, (_, i) => (
        <Square key={i} />
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
