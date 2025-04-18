"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { fetchMatches } from "@/lib/api"
import type { Match } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

export default function MatchList() {
  const [matches, setMatches] = useState<{
    today: Match[]
    upcoming: Match[]
    completed: Match[]
  }>({
    today: [],
    upcoming: [],
    completed: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true)
      try {
        const data = await fetchMatches()
        setMatches(data)
      } catch (error) {
        console.error("Failed to fetch matches:", error)
      } finally {
        setLoading(false)
      }
    }

    getMatches()
  }, [])

  const renderMatchCard = (match: Match) => (
    <Link href={`/match/${match.id}`} key={match.id}>
      <Card className="mb-4 hover:shadow-lg hover:shadow-ipl-blue/10 transition-all duration-300 cursor-pointer bg-gray-900/50 border-gray-800 transform hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-400">{match.date}</p>
            <Badge
              variant={match.status === "Live" ? "destructive" : match.status === "Completed" ? "secondary" : "outline"}
              className={
                match.status === "Live"
                  ? "bg-ipl-red text-white animate-pulse"
                  : match.status === "Completed"
                    ? "bg-ipl-green text-white"
                    : "bg-gray-800 text-gray-300 border-gray-700"
              }
            >
              {match.status}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-700 shadow-md">
                <Image
                  src={match.team1.logo || "/placeholder.svg?height=100&width=100"}
                  alt={match.team1.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-white">{match.team1.shortName}</p>
                {match.status !== "Upcoming" && (
                  <p className="text-sm text-ipl-blue">
                    {match.team1.score}/{match.team1.wickets}
                  </p>
                )}
              </div>
            </div>

            <span className="text-xs font-medium px-2 py-0.5 bg-gray-800 rounded-full text-gray-400">VS</span>

            <div className="flex items-center gap-2">
              <div>
                <p className="font-medium text-right text-white">{match.team2.shortName}</p>
                {match.status !== "Upcoming" && (
                  <p className="text-sm text-right text-ipl-yellow">
                    {match.team2.score}/{match.team2.wickets}
                  </p>
                )}
              </div>
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-700 shadow-md">
                <Image
                  src={match.team2.logo || "/placeholder.svg?height=100&width=100"}
                  alt={match.team2.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {match.result && (
            <p className="text-sm mt-2 text-ipl-orange font-medium border-t border-gray-800 pt-2 mt-3">
              {match.result}
            </p>
          )}

          <p className="text-xs mt-2 text-gray-500">{match.venue}</p>
        </CardContent>
      </Card>
    </Link>
  )

  if (loading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center bg-gray-900/50 border-gray-800">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-2 border-t-ipl-orange border-r-ipl-blue border-b-ipl-green border-l-ipl-purple rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading matches...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-gray-900/50 border-gray-800 animate-slide-in">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
        <CardTitle className="text-white">Matches</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="today" className="data-[state=active]:bg-ipl-orange data-[state=active]:text-white">
              Today
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-ipl-blue data-[state=active]:text-white">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-ipl-green data-[state=active]:text-white">
              Results
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="pt-4">
            {matches.today.length > 0 ? (
              matches.today.map(renderMatchCard)
            ) : (
              <div className="text-center text-muted-foreground py-8 bg-gray-900/30 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 mb-4 opacity-30">
                    {/* Cricket ball icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" fill="#FF7A59" />
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                        fill="#FF4D4D"
                      />
                      <path
                        d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                        fill="#FF7A59"
                      />
                    </svg>
                  </div>
                  <p>No matches scheduled for today</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="upcoming" className="pt-4">
            {matches.upcoming.length > 0 ? (
              matches.upcoming.map(renderMatchCard)
            ) : (
              <div className="text-center text-muted-foreground py-8 bg-gray-900/30 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 mb-4 opacity-30">
                    {/* Cricket bat icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2L8 14l2 8h4l2-8L20 2z" fill="#F7C928" />
                    </svg>
                  </div>
                  <p>No upcoming matches</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="pt-4">
            {matches.completed.length > 0 ? (
              matches.completed.map(renderMatchCard)
            ) : (
              <div className="text-center text-muted-foreground py-8 bg-gray-900/30 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 mb-4 opacity-30">
                    {/* Trophy icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"
                        fill="#F7C928"
                      />
                    </svg>
                  </div>
                  <p>No completed matches</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
