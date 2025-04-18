export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
  score: number
  wickets: number
  overs: string
  batsmen: Batsman[]
  bowlers: Bowler[]
}

export interface Batsman {
  name: string
  runs: number
  balls: number
  fours: number
  sixes: number
  strikeRate: number
  dismissal: string
  onStrike?: boolean
}

export interface Bowler {
  name: string
  overs: string
  maidens: number
  runs: number
  wickets: number
  economy: number
}

export interface Over {
  number: number
  balls: string[]
}

export interface LiveMatch {
  id: string
  team1: Team
  team2: Team
  venue: string
  date: string
  status: "Live" | "Completed" | "Upcoming"
  result?: string
  currentStatus: string
  matchProgress: number
  currentBatsmen: {
    name: string
    runs: number
    balls: number
    strikeRate: number
    onStrike: boolean
  }[]
  currentBowlers: {
    name: string
    overs: string
    maidens: number
    runs: number
    wickets: number
  }[]
  recentOvers: Over[]
}

export interface Match {
  id: string
  team1: {
    name: string
    shortName: string
    logo: string
    score: number
    wickets: number
  }
  team2: {
    name: string
    shortName: string
    logo: string
    score: number
    wickets: number
  }
  venue: string
  date: string
  status: "Live" | "Completed" | "Upcoming"
  result?: string
}

export interface Commentary {
  over: string
  time: string
  text: string
  event?: "FOUR" | "SIX" | "WICKET" | "REVIEW"
}

export interface MatchDetails extends LiveMatch {
  commentary: Commentary[]
  stats: {
    topScorer: {
      name: string
      runs: number
    }
    bestBowler: {
      name: string
      wickets: number
      runs: number
    }
    mostSixes: {
      name: string
      count: number
    }
    mostFours: {
      name: string
      count: number
    }
    runRate: {
      team1: number
      team2: number
    }
    boundaries: {
      team1: number
      team2: number
    }
    dotBalls: {
      team1: number
      team2: number
    }
    partnerships: {
      team1: {
        players: string
        runs: number
        balls: number
      }[]
      team2: {
        players: string
        runs: number
        balls: number
      }[]
    }
  }
}
