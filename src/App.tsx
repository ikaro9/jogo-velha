import { useState } from 'react'

type Cell = 'X' | 'O' | null

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function getWinner(board: Cell[]): Cell {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  return null
}

export default function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [xTurn, setXTurn] = useState(true)

  const winner = getWinner(board)
  const draw = !winner && board.every(Boolean)

  const play = (i: number) => {
    if (board[i] || winner) return
    const next = [...board]
    next[i] = xTurn ? 'X' : 'O'
    setBoard(next)
    setXTurn(!xTurn)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setXTurn(true)
  }

  const status = winner
    ? `Vencedor: ${winner} 🎉`
    : draw
      ? 'Empate!'
      : `Vez de: ${xTurn ? 'X' : 'O'}`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold">Jogo da Velha</h1>
      <p className="text-xl">{status}</p>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className={`w-24 h-24 text-5xl font-bold rounded-lg bg-slate-700 hover:bg-slate-600 transition ${
              cell === 'X' ? 'text-sky-400' : 'text-pink-400'
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={reset}
        className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 font-semibold"
      >
        Reiniciar
      </button>
    </div>
  )
}