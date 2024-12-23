'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CountdownTimer } from '../components/countdown-timer'
import { Schedule } from '../components/schedule'
import { Workshops } from '../components/workshops'
import { GamesContests } from '../components/games-contests'
import { Announcements } from '../components/announcements'
import { useToast } from "@/components/ui/toast"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { InfoPanel } from '../components/info-panel'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  //const [showEvents, setShowEvents] = useState(false) //Removed showEvents state
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const checkNotificationPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission()
        setNotificationsEnabled(permission === 'granted')
      }
    }

    const timer = setTimeout(() => {
      checkNotificationPermission()
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const refreshInterval = 30 * 60 * 1000; // 30 minutes in milliseconds
    let refreshTimer: NodeJS.Timeout;

    const scheduleRefresh = () => {
      refreshTimer = setTimeout(() => {
        router.refresh();
        scheduleRefresh(); // Schedule the next refresh
      }, refreshInterval);
    }

    scheduleRefresh(); // Start the refresh cycle

    return () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
    }
  }, [router]);

  const handleManualRefresh = () => {
    router.refresh();
    toast({
      title: "Page Refreshed",
      description: "The page has been manually refreshed.",
    });
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    },
    out: { 
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    }
  }

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    in: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900" />
        <div className="absolute inset-0 bg-grid-pattern animate-move-background opacity-20" />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="text-4xl font-bold text-white"
            >
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Loading
              </motion.span>{" "}
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Hack
              </motion.span>{" "}
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                the
              </motion.span>{" "}
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Ridge...
              </motion.span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="relative min-h-screen text-white p-4 sm:p-8 pt-16 sm:pt-24 z-10"
          >
            <div className="max-w-[1400px] mx-auto">
              {!notificationsEnabled && (
                <motion.div
                  variants={contentVariants}
                  className="mb-8"
                >
                  <Alert variant="destructive">
                    <Bell className="h-4 w-4" />
                    <AlertTitle>Notifications are disabled</AlertTitle>
                    <AlertDescription>
                      Enable notifications to stay updated with event start times.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
              <motion.h1
                variants={contentVariants}
                className="text-4xl md:text-6xl font-bold text-center mb-8"
              >
                Hack the Ridge
              </motion.h1>
              <motion.p
                variants={contentVariants}
                className="text-xl md:text-2xl text-center mb-8"
              >
                December 14, 2024
              </motion.p>
              <motion.div
                variants={contentVariants}
              >
                <Announcements />
              </motion.div>
              <motion.div
                variants={contentVariants}
                className="glass p-6 mb-8"
              >
                <CountdownTimer />
              </motion.div>
              <motion.div 
                variants={contentVariants}
                className="grid grid-cols-1 xl:grid-cols-3 gap-8"
              >
                <div className="glass p-6">
                  <Schedule 
                    notificationsEnabled={notificationsEnabled} 
                    setNotificationsEnabled={setNotificationsEnabled}
                  />
                </div>
                <div className="glass p-6">
                  <Workshops /> 
                </div>
                <div className="glass p-6">
                  <GamesContests /> 
                </div>
              </motion.div>
              <motion.div
                variants={contentVariants}
                className="mt-8 text-center"
              >
                <Button
                  onClick={handleManualRefresh}
                  variant="outline"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700 border-white"
                >
                  Refresh Page
                </Button>
              </motion.div>
              <InfoPanel />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

