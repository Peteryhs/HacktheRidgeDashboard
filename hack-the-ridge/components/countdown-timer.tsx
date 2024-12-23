'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  message?: string;
}

interface CountdownTimerProps {}

export function CountdownTimer() {
  const [eventCountdown, setEventCountdown] = useState<TimeLeft>({});
  const [submissionCountdown, setSubmissionCountdown] = useState<TimeLeft>({});

  function calculateTimeLeft(targetDate: Date): TimeLeft {
    const now = new Date();
    const difference = +targetDate - +now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return {};
  }

  useEffect(() => {
    function updateCountdowns() {
      const now = new Date();
      const eventStartDate = new Date(2024, 11, 14, 8, 30, 0); // December 14, 2024, 8:30 AM
      const submissionDeadline = new Date(2024, 11, 14, 18, 0); // December 14, 2024, 5:30 PM
      const isEventDay = now.getFullYear() === 2024 && now.getMonth() === 11 && now.getDate() === 14;

      if (isEventDay) {
        if (now >= submissionDeadline) {
          setEventCountdown({ message: "Hack the Ridge has ended!" });
          setSubmissionCountdown({ message: "Submissions are closed!" });
        } else if (now >= eventStartDate) {
          setEventCountdown({ message: "Hack the Ridge is happening now!" });
          setSubmissionCountdown(calculateTimeLeft(submissionDeadline));
        } else {
          setEventCountdown(calculateTimeLeft(eventStartDate));
          setSubmissionCountdown({});
        }
      } else {
        setEventCountdown(calculateTimeLeft(eventStartDate));
        setSubmissionCountdown({});
      }
    }

    updateCountdowns();
    const timer = setInterval(updateCountdowns, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const renderCountdown = (timeLeft: TimeLeft, title: string) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold mb-4 text-center"
      >
        {title}
      </motion.h2>
      <div className="flex justify-around">
        <AnimatePresence mode="wait">
          {timeLeft.message ? (
            <motion.span
              key={timeLeft.message}
              variants={itemVariants}
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {timeLeft.message}
            </motion.span>
          ) : Object.keys(timeLeft).length ? (
            Object.entries(timeLeft).map(([interval, value]) => (
              <motion.div
                key={`timer-${interval}`}
                variants={itemVariants}
                className="text-center"
              >
                <motion.span
                  className="text-4xl md:text-6xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {value}
                </motion.span>
                <motion.p
                  className="text-sm uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {interval}
                </motion.p>
              </motion.div>
            ))
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div>
      {renderCountdown(eventCountdown, "Countdown to Hack the Ridge")}
      {(eventCountdown.message === "Hack the Ridge is happening now!" || eventCountdown.message === "Hack the Ridge has ended!") &&
        renderCountdown(submissionCountdown, "Submission Deadline")}
    </div>
  );
}

