"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchLiveMatch } from "@/lib/api"
import type { LiveMatch } from "@/lib/types"
import Image from "next/image"

export default function LiveScoreboard() {
  const [match, setMatch] = useState<LiveMatch | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMatchData = async () => {
      setLoading(true)
      try {
        const data = await fetchLiveMatch()
        setMatch(data)
      } catch (error) {
        console.error("Failed to fetch match data:", error)
      } finally {
        setLoading(false)
      }
    }

    getMatchData()

    // Set up polling for live updates
    const intervalId = setInterval(getMatchData, 10000) // Update every 10 seconds

    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center bg-gray-900/50 border-gray-800">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 border-4 border-t-ipl-orange border-r-ipl-blue border-b-ipl-green border-l-ipl-purple rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading match data...</p>
        </div>
      </Card>
    )
  }

  if (!match) {
    return (
      <Card className="w-full h-96 flex items-center justify-center bg-gray-900/50 border-gray-800">
        <p className="text-muted-foreground">No live matches at the moment</p>
      </Card>
    )
  }

  return (
    <Card className="w-full overflow-hidden bg-gray-900/50 border-gray-800 animate-slide-in">
      <CardHeader className="pb-2 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
            Live Match
          </CardTitle>
          <Badge
            variant={match.status === "Live" ? "destructive" : "outline"}
            className={match.status === "Live" ? "bg-ipl-red text-white" : ""}
          >
            {match.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-400">{match.venue}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-900/70">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-ipl-blue shadow-lg shadow-ipl-blue/20 transition-transform hover:scale-105 duration-300">
                <Image
                  src={match.team1.logo || "/placeholder.svg?height=100&width=100"}
                  alt={match.team1.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{match.team1.shortName}</h3>
                <p className="text-2xl font-bold text-white">
                  {match.team1.score}/{match.team1.wickets}
                </p>
                <p className="text-sm text-gray-400">{match.team1.overs} overs</p>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm font-medium px-3 py-1 bg-gray-800 rounded-full text-gray-300">VS</span>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-bold text-lg text-right text-white">{match.team2.shortName}</h3>
                <p className="text-2xl font-bold text-right text-white">
                  {match.team2.score}/{match.team2.wickets}
                </p>
                <p className="text-sm text-gray-400 text-right">{match.team2.overs} overs</p>
              </div>
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-ipl-yellow shadow-lg shadow-ipl-yellow/20 transition-transform hover:scale-105 duration-300">
                <Image
                  src={match.team2.logo || "/placeholder.svg?height=100&width=100"}
                  alt={match.team2.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1 text-gray-300">Match Progress</p>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-ipl-blue to-ipl-orange rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${match.matchProgress}%` }}
                ></div>
              </div>
            </div>

            <p className="text-sm text-ipl-orange font-medium">{match.currentStatus}</p>

            <Tabs defaultValue="batting" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="batting" className="data-[state=active]:bg-ipl-blue data-[state=active]:text-white">
                  Current Batting
                </TabsTrigger>
                <TabsTrigger
                  value="bowling"
                  className="data-[state=active]:bg-ipl-orange data-[state=active]:text-white"
                >
                  Current Bowling
                </TabsTrigger>
              </TabsList>
              <TabsContent value="batting" className="space-y-4 pt-4 bg-gray-900/30 p-4 rounded-b-lg">
                <div className="grid grid-cols-5 text-sm font-medium text-gray-400 border-b border-gray-800 pb-2">
                  <div className="col-span-2">Batsman</div>
                  <div className="text-center">R</div>
                  <div className="text-center">B</div>
                  <div className="text-center">SR</div>
                </div>
                {match.currentBatsmen.map((batsman, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 text-sm hover:bg-gray-800/30 p-2 rounded transition-colors"
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      {batsman.onStrike && <span className="h-2 w-2 rounded-full bg-ipl-orange animate-pulse"></span>}
                      <span className="text-white">{batsman.name}</span>
                    </div>
                    <div className="text-center text-white">{batsman.runs}</div>
                    <div className="text-center text-gray-400">{batsman.balls}</div>
                    <div className="text-center text-ipl-green">{batsman.strikeRate}</div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="bowling" className="space-y-4 pt-4 bg-gray-900/30 p-4 rounded-b-lg">
                <div className="grid grid-cols-6 text-sm font-medium text-gray-400 border-b border-gray-800 pb-2">
                  <div className="col-span-2">Bowler</div>
                  <div className="text-center">O</div>
                  <div className="text-center">M</div>
                  <div className="text-center">R</div>
                  <div className="text-center">W</div>
                </div>
                {match.currentBowlers.map((bowler, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 text-sm hover:bg-gray-800/30 p-2 rounded transition-colors"
                  >
                    <div className="col-span-2 text-white">{bowler.name}</div>
                    <div className="text-center text-gray-400">{bowler.overs}</div>
                    <div className="text-center text-gray-400">{bowler.maidens}</div>
                    <div className="text-center text-gray-400">{bowler.runs}</div>
                    <div className="text-center text-ipl-red font-medium">{bowler.wickets}</div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div className="pt-4 bg-gray-900/30 p-4 rounded-lg mt-4">
              <h4 className="font-medium mb-3 text-white">Recent Overs</h4>
              <div className="flex flex-wrap gap-2">
                {match.recentOvers.map((over, index) => (
                  <div key={index} className="text-xs bg-gray-800 p-2 rounded-lg">
                    <span className="font-medium text-gray-300">Over {over.number}: </span>
                    <span>
                      {over.balls.map((ball, i) => (
                        <span
                          key={i}
                          className={`inline-block w-6 h-6 text-center leading-6 rounded-full mx-0.5 
                          ${
                            ball === "W"
                              ? "bg-ipl-red text-white"
                              : ball === "4"
                                ? "bg-ipl-blue text-white"
                                : ball === "6"
                                  ? "bg-ipl-purple text-white"
                                  : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {ball}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
