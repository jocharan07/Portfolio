import { useEffect, useState } from 'react'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="cursor-glow"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
      }}
    />
  )
}
