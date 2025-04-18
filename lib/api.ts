// Mock API functions to simulate fetching data from a cricket API
// In a real application, you would replace these with actual API calls

import type { LiveMatch, Match, MatchDetails } from "./types"

// Mock team logos
const teamLogos = {
  MI: "/placeholder.svg?height=100&width=100",
  CSK: "/placeholder.svg?height=100&width=100",
  RCB: "/placeholder.svg?height=100&width=100",
  KKR: "/placeholder.svg?height=100&width=100",
  DC: "/placeholder.svg?height=100&width=100",
  PBKS: "/placeholder.svg?height=100&width=100",
  RR: "/placeholder.svg?height=100&width=100",
  SRH: "/placeholder.svg?height=100&width=100",
  GT: "/placeholder.svg?height=100&width=100",
  LSG: "/placeholder.svg?height=100&width=100",
}

// Mock data for a live match
export async function fetchLiveMatch(): Promise<LiveMatch> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "match-001",
    team1: {
      id: "MI",
      name: "Mumbai Indians",
      shortName: "MI",
      logo: teamLogos.MI,
      score: 176,
      wickets: 6,
      overs: "20.0",
      batsmen: [],
      bowlers: [],
    },
    team2: {
      id: "CSK",
      name: "Chennai Super Kings",
      shortName: "CSK",
      logo: teamLogos.CSK,
      score: 142,
      wickets: 4,
      overs: "16.2",
      batsmen: [],
      bowlers: [],
    },
    venue: "Wankhede Stadium, Mumbai",
    date: "April 18, 2025",
    status: "Live",
    currentStatus: "CSK need 35 runs in 22 balls",
    matchProgress: 82,
    currentBatsmen: [
      {
        name: "MS Dhoni",
        runs: 28,
        balls: 14,
        strikeRate: 200.0,
        onStrike: true,
      },
      {
        name: "Ravindra Jadeja",
        runs: 32,
        balls: 24,
        strikeRate: 133.33,
        onStrike: false,
      },
    ],
    currentBowlers: [
      {
        name: "Jasprit Bumrah",
        overs: "3.2",
        maidens: 0,
        runs: 24,
        wickets: 2,
      },
    ],
    recentOvers: [
      {
        number: 15,
        balls: ["1", "4", "0", "1", "6", "1"],
      },
      {
        number: 16,
        balls: ["W", "0", "1", "4", "0", "1"],
      },
    ],
  }
}

// Mock data for match list
export async function fetchMatches(): Promise<{
  today: Match[]
  upcoming: Match[]
  completed: Match[]
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    today: [
      {
        id: "match-001",
        team1: {
          name: "Mumbai Indians",
          shortName: "MI",
          logo: teamLogos.MI,
          score: 176,
          wickets: 6,
        },
        team2: {
          name: "Chennai Super Kings",
          shortName: "CSK",
          logo: teamLogos.CSK,
          score: 142,
          wickets: 4,
        },
        venue: "Wankhede Stadium, Mumbai",
        date: "April 18, 2025",
        status: "Live",
        result: "",
      },
      {
        id: "match-002",
        team1: {
          name: "Royal Challengers Bangalore",
          shortName: "RCB",
          logo: teamLogos.RCB,
          score: 0,
          wickets: 0,
        },
        team2: {
          name: "Kolkata Knight Riders",
          shortName: "KKR",
          logo: teamLogos.KKR,
          score: 0,
          wickets: 0,
        },
        venue: "M. Chinnaswamy Stadium, Bangalore",
        date: "April 18, 2025",
        status: "Upcoming",
        result: "",
      },
    ],
    upcoming: [
      {
        id: "match-003",
        team1: {
          name: "Delhi Capitals",
          shortName: "DC",
          logo: teamLogos.DC,
          score: 0,
          wickets: 0,
        },
        team2: {
          name: "Punjab Kings",
          shortName: "PBKS",
          logo: teamLogos.PBKS,
          score: 0,
          wickets: 0,
        },
        venue: "Arun Jaitley Stadium, Delhi",
        date: "April 19, 2025",
        status: "Upcoming",
        result: "",
      },
      {
        id: "match-004",
        team1: {
          name: "Rajasthan Royals",
          shortName: "RR",
          logo: teamLogos.RR,
          score: 0,
          wickets: 0,
        },
        team2: {
          name: "Sunrisers Hyderabad",
          shortName: "SRH",
          logo: teamLogos.SRH,
          score: 0,
          wickets: 0,
        },
        venue: "Sawai Mansingh Stadium, Jaipur",
        date: "April 20, 2025",
        status: "Upcoming",
        result: "",
      },
      {
        id: "match-005",
        team1: {
          name: "Gujarat Titans",
          shortName: "GT",
          logo: teamLogos.GT,
          score: 0,
          wickets: 0,
        },
        team2: {
          name: "Lucknow Super Giants",
          shortName: "LSG",
          logo: teamLogos.LSG,
          score: 0,
          wickets: 0,
        },
        venue: "Narendra Modi Stadium, Ahmedabad",
        date: "April 21, 2025",
        status: "Upcoming",
        result: "",
      },
    ],
    completed: [
      {
        id: "match-006",
        team1: {
          name: "Chennai Super Kings",
          shortName: "CSK",
          logo: teamLogos.CSK,
          score: 204,
          wickets: 5,
        },
        team2: {
          name: "Royal Challengers Bangalore",
          shortName: "RCB",
          logo: teamLogos.RCB,
          score: 198,
          wickets: 8,
        },
        venue: "M.A. Chidambaram Stadium, Chennai",
        date: "April 17, 2025",
        status: "Completed",
        result: "CSK won by 6 runs",
      },
      {
        id: "match-007",
        team1: {
          name: "Kolkata Knight Riders",
          shortName: "KKR",
          logo: teamLogos.KKR,
          score: 187,
          wickets: 6,
        },
        team2: {
          name: "Delhi Capitals",
          shortName: "DC",
          logo: teamLogos.DC,
          score: 164,
          wickets: 9,
        },
        venue: "Eden Gardens, Kolkata",
        date: "April 16, 2025",
        status: "Completed",
        result: "KKR won by 23 runs",
      },
    ],
  }
}

// Mock data for match details
export async function fetchMatchDetails(matchId: string): Promise<MatchDetails> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, you would fetch specific match details based on the ID
  // For this example, we'll return mock data

  return {
    id: matchId,
    team1: {
      id: "MI",
      name: "Mumbai Indians",
      shortName: "MI",
      logo: teamLogos.MI,
      score: 176,
      wickets: 6,
      overs: "20.0",
      batsmen: [
        {
          name: "Rohit Sharma",
          runs: 45,
          balls: 32,
          fours: 4,
          sixes: 2,
          strikeRate: 140.63,
          dismissal: "c Jadeja b Chahar",
        },
        {
          name: "Ishan Kishan",
          runs: 32,
          balls: 21,
          fours: 3,
          sixes: 1,
          strikeRate: 152.38,
          dismissal: "b Jadeja",
        },
        {
          name: "Suryakumar Yadav",
          runs: 56,
          balls: 36,
          fours: 5,
          sixes: 3,
          strikeRate: 155.56,
          dismissal: "c Dhoni b Thakur",
        },
        {
          name: "Hardik Pandya",
          runs: 28,
          balls: 18,
          fours: 2,
          sixes: 1,
          strikeRate: 155.56,
          dismissal: "run out (Jadeja)",
        },
        {
          name: "Kieron Pollard",
          runs: 12,
          balls: 8,
          fours: 1,
          sixes: 0,
          strikeRate: 150.0,
          dismissal: "c Gaikwad b Chahar",
        },
        {
          name: "Krunal Pandya",
          runs: 0,
          balls: 1,
          fours: 0,
          sixes: 0,
          strikeRate: 0.0,
          dismissal: "b Thakur",
        },
        {
          name: "Jasprit Bumrah",
          runs: 3,
          balls: 4,
          fours: 0,
          sixes: 0,
          strikeRate: 75.0,
          dismissal: "not out",
        },
      ],
      bowlers: [
        {
          name: "Jasprit Bumrah",
          overs: "4.0",
          maidens: 0,
          runs: 24,
          wickets: 2,
          economy: 6.0,
        },
        {
          name: "Trent Boult",
          overs: "4.0",
          maidens: 0,
          runs: 32,
          wickets: 1,
          economy: 8.0,
        },
        {
          name: "Rahul Chahar",
          overs: "4.0",
          maidens: 0,
          runs: 36,
          wickets: 0,
          economy: 9.0,
        },
        {
          name: "Krunal Pandya",
          overs: "3.0",
          maidens: 0,
          runs: 28,
          wickets: 1,
          economy: 9.33,
        },
        {
          name: "Hardik Pandya",
          overs: "1.2",
          maidens: 0,
          runs: 22,
          wickets: 0,
          economy: 16.5,
        },
      ],
    },
    team2: {
      id: "CSK",
      name: "Chennai Super Kings",
      shortName: "CSK",
      logo: teamLogos.CSK,
      score: 142,
      wickets: 4,
      overs: "16.2",
      batsmen: [
        {
          name: "Ruturaj Gaikwad",
          runs: 24,
          balls: 18,
          fours: 3,
          sixes: 0,
          strikeRate: 133.33,
          dismissal: "c Kishan b Bumrah",
        },
        {
          name: "Faf du Plessis",
          runs: 36,
          balls: 28,
          fours: 4,
          sixes: 1,
          strikeRate: 128.57,
          dismissal: "c Pollard b Boult",
        },
        {
          name: "Moeen Ali",
          runs: 18,
          balls: 12,
          fours: 2,
          sixes: 1,
          strikeRate: 150.0,
          dismissal: "b Bumrah",
        },
        {
          name: "Ambati Rayudu",
          runs: 4,
          balls: 6,
          fours: 0,
          sixes: 0,
          strikeRate: 66.67,
          dismissal: "c Rohit b Krunal",
        },
        {
          name: "MS Dhoni",
          runs: 28,
          balls: 14,
          fours: 2,
          sixes: 2,
          strikeRate: 200.0,
          dismissal: "not out",
        },
        {
          name: "Ravindra Jadeja",
          runs: 32,
          balls: 24,
          fours: 3,
          sixes: 1,
          strikeRate: 133.33,
          dismissal: "not out",
        },
      ],
      bowlers: [
        {
          name: "Deepak Chahar",
          overs: "4.0",
          maidens: 0,
          runs: 32,
          wickets: 2,
          economy: 8.0,
        },
        {
          name: "Shardul Thakur",
          overs: "4.0",
          maidens: 0,
          runs: 38,
          wickets: 2,
          economy: 9.5,
        },
        {
          name: "Ravindra Jadeja",
          overs: "4.0",
          maidens: 0,
          runs: 28,
          wickets: 1,
          economy: 7.0,
        },
        {
          name: "Dwayne Bravo",
          overs: "4.0",
          maidens: 0,
          runs: 36,
          wickets: 0,
          economy: 9.0,
        },
        {
          name: "Lungi Ngidi",
          overs: "4.0",
          maidens: 0,
          runs: 42,
          wickets: 0,
          economy: 10.5,
        },
      ],
    },
    venue: "Wankhede Stadium, Mumbai",
    date: "April 18, 2025",
    status: "Live",
    currentStatus: "CSK need 35 runs in 22 balls",
    matchProgress: 82,
    currentBatsmen: [
      {
        name: "MS Dhoni",
        runs: 28,
        balls: 14,
        strikeRate: 200.0,
        onStrike: true,
      },
      {
        name: "Ravindra Jadeja",
        runs: 32,
        balls: 24,
        strikeRate: 133.33,
        onStrike: false,
      },
    ],
    currentBowlers: [
      {
        name: "Jasprit Bumrah",
        overs: "3.2",
        maidens: 0,
        runs: 24,
        wickets: 2,
      },
    ],
    recentOvers: [
      {
        number: 15,
        balls: ["1", "4", "0", "1", "6", "1"],
      },
      {
        number: 16,
        balls: ["W", "0", "1", "4", "0", "1"],
      },
    ],
    commentary: [
      {
        over: "16.2",
        time: "8:42 PM",
        text: "Bumrah to Dhoni, FOUR! Short and wide, Dhoni cuts it past point for a boundary.",
        event: "FOUR",
      },
      {
        over: "16.1",
        time: "8:41 PM",
        text: "Bumrah to Jadeja, 1 run, pushed to mid-off for a quick single.",
        event: undefined,
      },
      {
        over: "15.6",
        time: "8:39 PM",
        text: "Hardik to Jadeja, 1 run, worked away to deep square leg.",
        event: undefined,
      },
      {
        over: "15.5",
        time: "8:38 PM",
        text: "Hardik to Dhoni, SIX! Massive hit over long-on! Dhoni at his best!",
        event: "SIX",
      },
      {
        over: "15.4",
        time: "8:37 PM",
        text: "Hardik to Dhoni, 1 run, pushed to cover for a quick single.",
        event: undefined,
      },
      {
        over: "15.3",
        time: "8:36 PM",
        text: "Hardik to Jadeja, dot ball, good length delivery, defended back to the bowler.",
        event: undefined,
      },
      {
        over: "15.2",
        time: "8:35 PM",
        text: "Hardik to Jadeja, FOUR! Beautiful cover drive, races away to the boundary!",
        event: "FOUR",
      },
      {
        over: "15.1",
        time: "8:34 PM",
        text: "Hardik to Dhoni, 1 run, pushed to mid-on for a single.",
        event: undefined,
      },
      {
        over: "14.6",
        time: "8:32 PM",
        text: "Chahar to Jadeja, dot ball, good yorker, dug out to mid-on.",
        event: undefined,
      },
      {
        over: "14.5",
        time: "8:31 PM",
        text: "Chahar to Rayudu, OUT! Caught behind! Rayudu edges it and Kishan takes a good catch.",
        event: "WICKET",
      },
    ],
    stats: {
      topScorer: {
        name: "Suryakumar Yadav (MI)",
        runs: 56,
      },
      bestBowler: {
        name: "Jasprit Bumrah (MI)",
        wickets: 2,
        runs: 24,
      },
      mostSixes: {
        name: "Suryakumar Yadav (MI)",
        count: 3,
      },
      mostFours: {
        name: "Suryakumar Yadav (MI)",
        count: 5,
      },
      runRate: {
        team1: 8.8,
        team2: 8.69,
      },
      boundaries: {
        team1: 22,
        team2: 16,
      },
      dotBalls: {
        team1: 42,
        team2: 38,
      },
      partnerships: {
        team1: [
          {
            players: "Rohit Sharma & Ishan Kishan",
            runs: 64,
            balls: 42,
          },
          {
            players: "Rohit Sharma & Suryakumar Yadav",
            runs: 28,
            balls: 18,
          },
          {
            players: "Suryakumar Yadav & Hardik Pandya",
            runs: 52,
            balls: 36,
          },
        ],
        team2: [
          {
            players: "Ruturaj Gaikwad & Faf du Plessis",
            runs: 48,
            balls: 36,
          },
          {
            players: "Faf du Plessis & Moeen Ali",
            runs: 32,
            balls: 24,
          },
          {
            players: "MS Dhoni & Ravindra Jadeja",
            runs: 60,
            balls: 38,
          },
        ],
      },
    },
  }
}
