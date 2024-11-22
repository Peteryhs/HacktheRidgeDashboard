'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const now = new Date()
    const targetDate = new Date(2024, 10, 21, 19, 0, 0) // November 21, 2024, 7:00 PM
    const isEventDay = now.getFullYear() === 2024 && now.getMonth() === 10 && now.getDate() === 21 // Check if it's November 21st, 2024

    if (isEventDay) {
      targetDate.setHours(19, 0, 0, 0) // Set to 7 PM on November 21st, 2024
    }

    const difference = +targetDate - +now
    let timeLeft: { [key: string]: number } = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <motion.div
      key={`timer-${interval}`}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-4xl md:text-6xl font-bold">{value}</span>
      <p className="text-sm uppercase">{interval}</p>
    </motion.div>
  ))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Countdown to Hack the Ridge</h2>
      <div className="flex justify-around">
        {Object.keys(timeLeft).length ? timerComponents : <span className="text-2xl font-bold">Event has ended!</span>}
      </div>
    </motion.div>
  )
}

