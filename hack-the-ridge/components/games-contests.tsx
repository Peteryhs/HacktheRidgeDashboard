'use client'

import { motion } from 'framer-motion'

interface GameContest {
  title: string
  time: string
  duration: number
  tags: string[]
  location: string
}

const gamesContestsData: GameContest[] = [
  { 
    title: "Coding Challenge", 
    time: "15:00", 
    duration: 120, 
    tags: ["Programming", "Competition"],
    location: "Main Hall"
  },
  { 
    title: "Hackathon Trivia", 
    time: "15:30", 
    duration: 60, 
    tags: ["Trivia", "Fun"],
    location: "Lounge Area"
  },
  { 
    title: "Tech Scavenger Hunt", 
    time: "17:00", 
    duration: 90, 
    tags: ["Interactive", "Team Building"],
    location: "Entire Venue"
  }
];

export function GamesContests() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Today's Games & Contests</h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {gamesContestsData.map((item, index) => (
          <motion.div
            key={`game-contest-${item.title}-${item.time}`}
            className="flex flex-col md:flex-row justify-between items-start md:items-center glass p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="mb-2 md:mb-0">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm">{item.time} - {item.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm">Duration: {item.duration} min</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

