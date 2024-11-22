'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

interface ScheduleEvent {
  time: string
  event: string
}

interface Workshop {
  title: string
  time: string
  duration: number
}

interface Events {
  schedule: ScheduleEvent[]
  workshops: Workshop[]
}

export function EventManager() {
  const [events, setEvents] = useState<Events>({ schedule: [], workshops: [] })
  const [newScheduleEvent, setNewScheduleEvent] = useState<ScheduleEvent>({ time: '', event: '' })
  const [newWorkshop, setNewWorkshop] = useState<Workshop>({ title: '', time: '', duration: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const data = await response.json()
      setEvents(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch events:', error)
      setError('Failed to fetch events. Please try again later.')
      setIsLoading(false)
    }
  }

  const saveEvents = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(events),
      })
      if (!response.ok) {
        throw new Error('Failed to save events')
      }
      setError(null)
    } catch (error) {
      console.error('Failed to save events:', error)
      setError('Failed to save changes. Please try again later.')
    }
  }

  const addScheduleEvent = () => {
    if (newScheduleEvent.time && newScheduleEvent.event) {
      setEvents(prev => ({
        ...prev,
        schedule: [...prev.schedule, newScheduleEvent]
      }))
      setNewScheduleEvent({ time: '', event: '' })
    }
  }

  const removeScheduleEvent = (index: number) => {
    setEvents(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }))
  }

  const addWorkshop = () => {
    if (newWorkshop.title && newWorkshop.time && newWorkshop.duration) {
      setEvents(prev => ({
        ...prev,
        workshops: [...prev.workshops, newWorkshop]
      }))
      setNewWorkshop({ title: '', time: '', duration: 0 })
    }
  }

  const removeWorkshop = (index: number) => {
    setEvents(prev => ({
      ...prev,
      workshops: prev.workshops.filter((_, i) => i !== index)
    }))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="glass p-6 mt-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Event Manager</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Tabs defaultValue="schedule">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="scheduleTime">Time</Label>
                <Input
                  id="scheduleTime"
                  value={newScheduleEvent.time}
                  onChange={(e) => setNewScheduleEvent({ ...newScheduleEvent, time: e.target.value })}
                  placeholder="e.g., 09:00 AM"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="scheduleEvent">Event</Label>
                <Input
                  id="scheduleEvent"
                  value={newScheduleEvent.event}
                  onChange={(e) => setNewScheduleEvent({ ...newScheduleEvent, event: e.target.value })}
                  placeholder="e.g., Registration & Check-in"
                />
              </div>
            </div>
            <Button onClick={addScheduleEvent}>Add Schedule Event</Button>
            <div className="space-y-2 mt-4">
              {events.schedule.map((item, index) => (
                <div key={`schedule-${index}`} className="flex justify-between items-center p-2 glass">
                  <span>{item.time} - {item.event}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeScheduleEvent(index)}>Remove</Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="workshops">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="workshopTitle">Title</Label>
                <Input
                  id="workshopTitle"
                  value={newWorkshop.title}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
                  placeholder="e.g., Intro to React"
                />
              </div>
              <div>
                <Label htmlFor="workshopTime">Time</Label>
                <Input
                  id="workshopTime"
                  value={newWorkshop.time}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, time: e.target.value })}
                  placeholder="e.g., 11:30 AM"
                />
              </div>
              <div>
                <Label htmlFor="workshopDuration">Duration (minutes)</Label>
                <Input
                  id="workshopDuration"
                  type="number"
                  value={newWorkshop.duration}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, duration: parseInt(e.target.value) })}
                  placeholder="e.g., 60"
                />
              </div>
            </div>
            <Button onClick={addWorkshop}>Add Workshop</Button>
            <div className="space-y-2 mt-4">
              {events.workshops.map((workshop, index) => (
                <div key={`workshop-${index}`} className="flex justify-between items-center p-2 glass">
                  <span>{workshop.title} - {workshop.time} ({workshop.duration} min)</span>
                  <Button variant="destructive" size="sm" onClick={() => removeWorkshop(index)}>Remove</Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-8 flex justify-between items-center">
        <Link href="/" className="text-blue-400 hover:underline">
          Back to Main Page
        </Link>
        <Button onClick={saveEvents}>Save Changes</Button>
      </div>
    </div>
  )
}

