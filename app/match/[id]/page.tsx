"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { fetchMatchDetails } from "@/lib/api"
import type { MatchDetails } from "@/lib/types"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MatchDetailPage() {
  const params = useParams()
  const matchId = params.id as string
  const [match, setMatch] = useState<MatchDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMatchDetails = async () => {
      setLoading(true)
      try {
        const data = await fetchMatchDetails(matchId)
        setMatch(data)
      } catch (error) {
        console.error("Failed to fetch match details:", error)
      } finally {
        setLoading(false)
      }
    }

    if (matchId) {
      getMatchDetails()
    }

    // Set up polling for live updates if match is live
    let intervalId: NodeJS.Timeout

    if (match?.status === "Live") {
      intervalId = setInterval(getMatchDetails, 10000) // Update every 10 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [matchId, match?.status])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-ipl-orange transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to matches
            </Link>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 border-4 border-t-ipl-orange border-r-ipl-blue border-b-ipl-green border-l-ipl-purple rounded-full animate-spin"></div>
              <p className="text-gray-400">Loading match details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-ipl-orange transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to matches
            </Link>
          </div>
          <Card className="w-full h-96 flex items-center justify-center bg-gray-900/50 border-gray-800">
            <p className="text-gray-400">Match not found</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-ipl-orange transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to matches
          </Link>
        </div>

        <Card className="mb-8 bg-gray-900/50 border-gray-800 overflow-hidden animate-slide-in">
          <CardHeader className="pb-2 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">
                {match.team1.name} vs {match.team2.name}
              </CardTitle>
              <Badge
                variant={
                  match.status === "Live" ? "destructive" : match.status === "Completed" ? "secondary" : "outline"
                }
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
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-400">
              <p>{match.venue}</p>
              <p>{match.date}</p>
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-b from-gray-900 to-gray-900/70">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-ipl-blue shadow-lg shadow-ipl-blue/20 transition-transform hover:scale-105 duration-300">
                  <Image
                    src={match.team1.logo || "/placeholder.svg?height=100&width=100"}
                    alt={match.team1.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl text-white">{match.team1.name}</h3>
                  <p className="text-3xl font-bold text-ipl-blue">
                    {match.team1.score}/{match.team1.wickets}
                  </p>
                  <p className="text-sm text-gray-400">{match.team1.overs} overs</p>
                </div>
              </div>

              <div className="text-center">
                <span className="text-lg font-medium px-4 py-2 bg-gray-800 rounded-full text-gray-300">VS</span>
                {match.result && <p className="mt-4 max-w-xs text-center text-ipl-orange">{match.result}</p>}
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-ipl-yellow shadow-lg shadow-ipl-yellow/20 transition-transform hover:scale-105 duration-300">
                  <Image
                    src={match.team2.logo || "/placeholder.svg?height=100&width=100"}
                    alt={match.team2.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl text-white">{match.team2.name}</h3>
                  <p className="text-3xl font-bold text-ipl-yellow">
                    {match.team2.score}/{match.team2.wickets}
                  </p>
                  <p className="text-sm text-gray-400">{match.team2.overs} overs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="scorecard">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="scorecard" className="data-[state=active]:bg-ipl-blue data-[state=active]:text-white">
              Scorecard
            </TabsTrigger>
            <TabsTrigger
              value="commentary"
              className="data-[state=active]:bg-ipl-orange data-[state=active]:text-white"
            >
              Commentary
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-ipl-green data-[state=active]:text-white">
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scorecard" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team 1 Innings */}
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden animate-slide-in">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
                  <CardTitle className="text-white">{match.team1.name} Innings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2 text-white">Batting</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-2 text-gray-400">Batsman</th>
                              <th className="text-center py-2 text-gray-400">R</th>
                              <th className="text-center py-2 text-gray-400">B</th>
                              <th className="text-center py-2 text-gray-400">4s</th>
                              <th className="text-center py-2 text-gray-400">6s</th>
                              <th className="text-center py-2 text-gray-400">SR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {match.team1.batsmen.map((batsman, index) => (
                              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                                <td className="py-2">
                                  <div>
                                    <p className="text-white">{batsman.name}</p>
                                    <p className="text-xs text-gray-500">{batsman.dismissal}</p>
                                  </div>
                                </td>
                                <td className="text-center py-2 text-ipl-blue font-medium">{batsman.runs}</td>
                                <td className="text-center py-2 text-gray-400">{batsman.balls}</td>
                                <td className="text-center py-2 text-gray-400">{batsman.fours}</td>
                                <td className="text-center py-2 text-gray-400">{batsman.sixes}</td>
                                <td className="text-center py-2 text-ipl-green">{batsman.strikeRate}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-800/50">
                              <td className="py-2 font-medium text-white">Total</td>
                              <td className="text-center py-2 font-medium text-white" colSpan={5}>
                                {match.team1.score}/{match.team1.wickets} ({match.team1.overs} Ov)
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-white">Bowling</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-2 text-gray-400">Bowler</th>
                              <th className="text-center py-2 text-gray-400">O</th>
                              <th className="text-center py-2 text-gray-400">M</th>
                              <th className="text-center py-2 text-gray-400">R</th>
                              <th className="text-center py-2 text-gray-400">W</th>
                              <th className="text-center py-2 text-gray-400">Econ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {match.team2.bowlers.map((bowler, index) => (
                              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                                <td className="py-2 text-white">{bowler.name}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.overs}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.maidens}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.runs}</td>
                                <td className="text-center py-2 text-ipl-red font-medium">{bowler.wickets}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.economy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team 2 Innings */}
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden animate-slide-in">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
                  <CardTitle className="text-white">{match.team2.name} Innings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2 text-white">Batting</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-2 text-gray-400">Batsman</th>
                              <th className="text-center py-2 text-gray-400">R</th>
                              <th className="text-center py-2 text-gray-400">B</th>
                              <th className="text-center py-2 text-gray-400">4s</th>
                              <th className="text-center py-2 text-gray-400">6s</th>
                              <th className="text-center py-2 text-gray-400">SR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {match.team2.batsmen.map((batsman, index) => (
                              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                                <td className="py-2">
                                  <div>
                                    <p className="text-white">{batsman.name}</p>
                                    <p className="text-xs text-gray-500">{batsman.dismissal}</p>
                                  </div>
                                </td>
                                <td className="text-center py-2 text-ipl-yellow font-medium">{batsman.runs}</td>
                                <td className="text-center py-2 text-gray-400">{batsman.balls}</td>
                                <td className="text-center py-2 text-gray-400">{batsman.fours}</td>
                                <td className="text-center py-2 text-gray-400">{batsman.sixes}</td>
                                <td className="text-center py-2 text-ipl-green">{batsman.strikeRate}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-800/50">
                              <td className="py-2 font-medium text-white">Total</td>
                              <td className="text-center py-2 font-medium text-white" colSpan={5}>
                                {match.team2.score}/{match.team2.wickets} ({match.team2.overs} Ov)
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-white">Bowling</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-2 text-gray-400">Bowler</th>
                              <th className="text-center py-2 text-gray-400">O</th>
                              <th className="text-center py-2 text-gray-400">M</th>
                              <th className="text-center py-2 text-gray-400">R</th>
                              <th className="text-center py-2 text-gray-400">W</th>
                              <th className="text-center py-2 text-gray-400">Econ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {match.team1.bowlers.map((bowler, index) => (
                              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                                <td className="py-2 text-white">{bowler.name}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.overs}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.maidens}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.runs}</td>
                                <td className="text-center py-2 text-ipl-red font-medium">{bowler.wickets}</td>
                                <td className="text-center py-2 text-gray-400">{bowler.economy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="commentary" className="pt-6">
            <Card className="bg-gray-900/50 border-gray-800 overflow-hidden animate-slide-in">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {match.commentary.map((comment, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-800 pb-4 hover:bg-gray-800/20 p-3 rounded transition-colors"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-white">{comment.over}</span>
                        <span className="text-sm text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-300">{comment.text}</p>
                      {comment.event && (
                        <Badge
                          variant={
                            comment.event === "FOUR"
                              ? "default"
                              : comment.event === "SIX"
                                ? "secondary"
                                : comment.event === "WICKET"
                                  ? "destructive"
                                  : "outline"
                          }
                          className={
                            comment.event === "FOUR"
                              ? "mt-2 bg-ipl-blue text-white"
                              : comment.event === "SIX"
                                ? "mt-2 bg-ipl-purple text-white"
                                : comment.event === "WICKET"
                                  ? "mt-2 bg-ipl-red text-white"
                                  : "mt-2 bg-gray-800 text-gray-300"
                          }
                        >
                          {comment.event}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden animate-slide-in">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
                  <CardTitle className="text-white">Key Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-white">Top Performers</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 rounded bg-gray-800/30">
                          <span className="text-gray-400">Top Scorer:</span>
                          <span className="font-medium text-ipl-orange">
                            {match.stats.topScorer.name} ({match.stats.topScorer.runs} runs)
                          </span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-gray-800/30">
                          <span className="text-gray-400">Best Bowler:</span>
                          <span className="font-medium text-ipl-green">
                            {match.stats.bestBowler.name} ({match.stats.bestBowler.wickets}/
                            {match.stats.bestBowler.runs})
                          </span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-gray-800/30">
                          <span className="text-gray-400">Most Sixes:</span>
                          <span className="font-medium text-ipl-purple">
                            {match.stats.mostSixes.name} ({match.stats.mostSixes.count})
                          </span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-gray-800/30">
                          <span className="text-gray-400">Most Fours:</span>
                          <span className="font-medium text-ipl-blue">
                            {match.stats.mostFours.name} ({match.stats.mostFours.count})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-white">Team Comparison</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 rounded bg-gray-800/30">
                          <span className="text-gray-400">Run Rate:</span>
                          <span className="text-white">
                            <span className="text-ipl-blue">
                              {match.team1.name}: {match.stats.runRate.team1}
                            </span>{" "}
                            |
                            <span className="text-ipl-yellow">
                              {" "}
                              {match.team2.name}: {match.stats.runRate.team2}
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-gray-800/30">
                          <span className="text-gray-400">Boundaries:</span>
                          <span className="text-white">
                            <span className="text-ipl-blue">
                              {match.team1.name}: {match.stats.boundaries.team1}
                            </span>{" "}
                            |
                            <span className="text-ipl-yellow">
                              {" "}
                              {match.team2.name}: {match.stats.boundaries.team2}
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-gray-800/30">
                          <span className="text-gray-400">Dot Balls:</span>
                          <span className="text-white">
                            <span className="text-ipl-blue">
                              {match.team1.name}: {match.stats.dotBalls.team1}
                            </span>{" "}
                            |
                            <span className="text-ipl-yellow">
                              {" "}
                              {match.team2.name}: {match.stats.dotBalls.team2}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden animate-slide-in">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
                  <CardTitle className="text-white">Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="team1">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                      <TabsTrigger
                        value="team1"
                        className="data-[state=active]:bg-ipl-blue data-[state=active]:text-white"
                      >
                        {match.team1.shortName}
                      </TabsTrigger>
                      <TabsTrigger
                        value="team2"
                        className="data-[state=active]:bg-ipl-yellow data-[state=active]:text-white"
                      >
                        {match.team2.shortName}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="team1" className="pt-4">
                      <div className="space-y-2">
                        {match.stats.partnerships.team1.map((p, index) => (
                          <div
                            key={index}
                            className="flex justify-between border-b border-gray-800 pb-2 p-2 hover:bg-gray-800/30 rounded transition-colors"
                          >
                            <span className="text-white">{p.players}</span>
                            <span className="font-medium text-ipl-blue">
                              {p.runs} runs <span className="text-gray-500">({p.balls} balls)</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="team2" className="pt-4">
                      <div className="space-y-2">
                        {match.stats.partnerships.team2.map((p, index) => (
                          <div
                            key={index}
                            className="flex justify-between border-b border-gray-800 pb-2 p-2 hover:bg-gray-800/30 rounded transition-colors"
                          >
                            <span className="text-white">{p.players}</span>
                            <span className="font-medium text-ipl-yellow">
                              {p.runs} runs <span className="text-gray-500">({p.balls} balls)</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
