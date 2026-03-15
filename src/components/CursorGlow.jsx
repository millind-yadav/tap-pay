import { useMousePosition } from '../hooks/useMousePosition'

export function CursorGlow() {
  const { x, y } = useMousePosition()

  return (
    <div
      className="cursor-glow"
      style={{
        '--glow-x': `${x}px`,
        '--glow-y': `${y}px`,
      }}
      aria-hidden="true"
    />
  )
}
