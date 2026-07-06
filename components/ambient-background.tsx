// Create an array of random offsets to spread them out naturally
export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <div className="ambient-particle w-1 h-1 left-[15%] animation-delay-0 duration-[25s]" />
      <div className="ambient-particle w-2 h-2 left-[45%] animation-delay-3000 duration-[18s]" />
      <div className="ambient-particle w-1.5 h-1.5 left-[75%] animation-delay-7000 duration-[30s]" />
      <div className="ambient-particle w-1 h-1 left-[90%] animation-delay-2000 duration-[22s]" />
    </div>
  )
}