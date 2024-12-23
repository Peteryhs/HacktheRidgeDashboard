'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Workshop {
  title: string
  time: string
  duration: number
  presenter?: string
  location: string
}

const workshopsData: Workshop[] = [
  { 
    title: "Team-building Activity",
    time: "9:45am - 10:00am", 
    duration: 15,
    location: "Theatre"
  },
  { 
    title: "Intro to Python workshop",
    time: "10:00am - 10:30am", 
    duration: 30,
    location: "Theatre"
  },
  { 
    title: "Web Development Workshop",
    time: "11:00am - 11:30am", 
    duration: 30,
    location: "Theatre"
  },
  { 
    title: "AI Club Workshop",
    time: "12:30pm - 1:00pm", 
    duration: 30,
    location: "Theatre"
  },
  { 
    title: "Siemens Workshop",
    time: "1:00pm - 1:30pm", 
    duration: 30,
    presenter: "Carrie Lamers",
    location: "Rm 101"
  },
  { 
    title: "University Panel",
    time: "3:00pm - 3:30pm", 
    duration: 30,
    presenter: "UW & UofT students",
    location: "Theatre"
  },
  { 
    title: "VR/AR Health Care Workshop",
    time: "4:00pm - 4:30pm", 
    duration: 30,
    presenter: "Dr. Quevedo",
    location: "Rm 101"
  }
];

// interface WorkshopsProps {
//   showEvents: boolean;
// }

export function Workshops() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Workshops</h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {workshopsData.map((workshop, index) => (
          <motion.div
            key={`workshop-${workshop.title}-${workshop.time}`}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center glass p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="mb-4 sm:mb-0 sm:mr-4 flex-grow">
              <h3 className="text-lg font-semibold mb-2">{workshop.title}</h3>
              <p className="text-sm mb-2">{workshop.time}</p>
              {workshop.presenter && (
                <p className="text-sm text-gray-300">Presenter: {workshop.presenter}</p>
              )}
              {workshop.location && (
                <p className="text-sm text-gray-300">Location: {workshop.location}</p>
              )}
            </div>
            <div className="flex flex-col items-start sm:items-end justify-end h-full">
              <p className="text-sm">Duration: {workshop.duration} min</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

