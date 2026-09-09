import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Board } from './Board'

const SQUARE_COUNT = 9

function squareButtons() {
  return screen
    .getAllByRole('button')
    .filter((button) => button.textContent !== 'Restart')
}

describe('Board', () => {
  it('renders an empty board, a bot toggle, and a restart button', () => {
    render(<Board />)
    expect(squareButtons()).toHaveLength(SQUARE_COUNT)
    squareButtons().forEach((square) => {
      expect(square).toBeEmptyDOMElement()
    })
    expect(
      screen.getByRole('checkbox', { name: 'Play vs bot' }),
    ).not.toBeChecked()
    expect(
      screen.getByRole('button', { name: 'Restart' }),
    ).toBeInTheDocument()
  })

  it('alternates X and O as players take turns', async () => {
    const user = userEvent.setup()
    render(<Board />)
    const squares = squareButtons()

    await user.click(squares[0])
    expect(squares[0]).toHaveTextContent('X')

    await user.click(squares[1])
    expect(squares[1]).toHaveTextContent('O')
  })

  it('ignores clicks on an occupied square', async () => {
    const user = userEvent.setup()
    render(<Board />)
    const squares = squareButtons()

    await user.click(squares[0])
    await user.click(squares[0])

    // Turn must not have advanced past the blocked move.
    await user.click(squares[1])
    expect(squares[0]).toHaveTextContent('X')
    expect(squares[1]).toHaveTextContent('O')
  })

  it('stops accepting moves once a player wins', async () => {
    const user = userEvent.setup()
    const { container } = render(<Board />)
    const squares = squareButtons()

    expect(container.querySelector('.win-line line')).toBeNull()

    await user.click(squares[0]) // X
    await user.click(squares[3]) // O
    await user.click(squares[1]) // X
    await user.click(squares[4]) // O
    await user.click(squares[2]) // X wins 0-1-2

    expect(container.querySelector('.win-line line')).not.toBeNull()

    await user.click(squares[5])
    expect(squares[5]).toBeEmptyDOMElement()
  })

  it('restarts a game with an empty board and X moving first', async () => {
    const user = userEvent.setup()
    render(<Board />)
    const squares = squareButtons()

    await user.click(squares[0]) // X
    await user.click(squares[1]) // O
    await user.click(screen.getByRole('button', { name: 'Restart' }))

    squares.forEach((square) => {
      expect(square).toBeEmptyDOMElement()
    })

    await user.click(squares[4])
    expect(squares[4]).toHaveTextContent('X')
  })

  it('lets the bot reply with O when playing against a bot', async () => {
    const user = userEvent.setup()
    render(<Board />)
    await user.click(screen.getByRole('checkbox', { name: 'Play vs bot' }))

    await user.click(squareButtons()[0]) // human X

    const squares = squareButtons()
    const filled = squares.filter((square) => square.textContent !== '')
    const marks = filled.map((square) => square.textContent)

    expect(filled).toHaveLength(2)
    expect(squares[0]).toHaveTextContent('X')
    expect(marks).toContain('O')
  })

  it('has the bot take over O when toggled mid-game', async () => {
    const user = userEvent.setup()
    render(<Board />)
    const squares = squareButtons()

    await user.click(squares[0]) // X
    await user.click(squares[1]) // O, still 2-player

    await user.click(screen.getByRole('checkbox', { name: 'Play vs bot' }))

    await user.click(squares[2]) // human X, bot should answer

    const filled = squareButtons()
      .filter((square) => square.textContent !== '')
      .map((square) => square.textContent)
      .join('')

    expect(filled).toHaveLength(4)
    expect(squares[0]).toHaveTextContent('X')
    expect(squares[1]).toHaveTextContent('O')
    expect(squares[2]).toHaveTextContent('X')
    expect(filled).toContain('O')
  })
})