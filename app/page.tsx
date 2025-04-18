import LiveScoreboard from "@/components/live-scoreboard"
import MatchList from "@/components/match-list"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>
      <div className="container mx-auto px-4 py-8 relative">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="h-10 w-10 rounded-full bg-ipl-orange animate-pulse-glow flex items-center justify-center">
              <span className="text-white font-bold">IPL</span>
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ipl-orange to-ipl-yellow">
              IPL Live Score
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LiveScoreboard />
          </div>
          <div>
            <MatchList />
          </div>
        </div>
      </div>
    </main>
  )
}
