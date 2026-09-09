const CELL = 100
const GAP = 4
const BOARD_SIZE = CELL * 3 + GAP * 2

function cellCenter(i: number): { x: number; y: number } {
  const row = Math.floor(i / 3)
  const col = i % 3
  return {
    x: col * (CELL + GAP) + CELL / 2,
    y: row * (CELL + GAP) + CELL / 2,
  }
}

export function StrikeLine({ line }: { line: number[] }) {
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