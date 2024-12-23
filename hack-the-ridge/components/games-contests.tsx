'use client'

import { motion } from 'framer-motion'

interface GameContest {
  title: string
  time: string
  duration: number
  type: 'game' | 'contest'
  location: string
}

const gamesContestsData: GameContest[] = [
  { 
    title: "Fitness Event",
    time: "10:30am - 10:50am", 
    duration: 20,
    type: 'contest',
    location: "Gym"
  },
  { 
    title: "Trivia Challenge",
    time: "12:15pm - 12:45pm", 
    duration: 30,
    type: 'contest',
    location: "Rm 101"
  },
  { 
    title: "Karaoke",
    time: "2:00pm - 2:30pm", 
    duration: 30,
    type: 'contest',
    location: "Theatre"
  },
  { 
    title: "Brawl Stars Tournament",
    time: "3:30pm - 4:00pm", 
    duration: 30,
    type: 'game',
    location: "Theatre"
  },
  { 
    title: "Chess Tournament",
    time: "4:30pm - 5:00pm", 
    duration: 30,
    type: 'game',
    location: "Rm 101"
  }
];


export function GamesContests() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Games & Contests</h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {gamesContestsData.map((item, index) => (
          <motion.div
            key={`game-contest-${item.title}-${item.time}`}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center glass p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="mb-4 sm:mb-0 sm:mr-4 flex-grow">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm mb-2">{item.time}</p>
              <p className="text-sm text-gray-300">Location: {item.location}</p>
              <span className={`text-xs px-2 py-1 rounded ${
                item.type === 'game' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {item.type === 'game' ? 'Game' : 'Contest'}
              </span>
            </div>
            <div className="flex flex-col items-start sm:items-end justify-end h-full">
              <p className="text-sm">Duration: {item.duration} min</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

