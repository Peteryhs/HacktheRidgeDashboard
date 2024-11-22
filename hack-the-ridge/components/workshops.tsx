'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface Workshop {
  title: string
  time: string
  duration: number
  tags: string[]
  joinUrl: string
  location: string
}

const workshopsData: Workshop[] = [
  { 
    title: "Intro to React", 
    time: "11:30", 
    duration: 60, 
    tags: ["Frontend", "JavaScript", "Beginner"],
    joinUrl: "https://example.com/join/react",
    location: "Room A101"
  },
  { 
    title: "API Integration", 
    time: "14:00", 
    duration: 45, 
    tags: ["Backend", "API", "Intermediate"],
    joinUrl: "https://example.com/join/api",
    location: "Room B202"
  },
  { 
    title: "UI/UX Design Principles", 
    time: "16:00", 
    duration: 90, 
    tags: ["Design", "UX", "All Levels"],
    joinUrl: "https://example.com/join/uxui",
    location: "Room C303"
  }
];

export function Workshops() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Today's Workshops</h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {workshopsData.map((workshop, index) => (
          <motion.div
            key={`workshop-${workshop.title}-${workshop.time}`}
            className="flex flex-col md:flex-row justify-between items-start md:items-center glass p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="mb-2 md:mb-0">
              <h3 className="text-lg font-semibold">{workshop.title}</h3>
              <p className="text-sm">{workshop.time} - {workshop.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {workshop.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm mb-1">Duration: {workshop.duration} min</p>
              <Button 
                size="sm"
                onClick={() => window.open(workshop.joinUrl, '_blank')}
              >
                Join
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

