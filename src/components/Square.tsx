import type { Player } from '../game'

export function Square({
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