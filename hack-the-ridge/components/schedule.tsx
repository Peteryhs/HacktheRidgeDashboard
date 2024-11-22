'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"

interface ScheduleEvent {
  time: string;
  event: string;
  type: 'major' | 'workshop' | 'game';
  location: string;
}

const scheduleData: ScheduleEvent[] = [
  { time: "09:00", event: "Registration & Check-in", type: "major", location: "Main Entrance" },
  { time: "10:00", event: "Opening Ceremony", type: "major", location: "Main Hall" },
  { time: "11:00", event: "Hacking Begins", type: "major", location: "All Rooms" },
  { time: "11:30", event: "Intro to React Workshop", type: "workshop", location: "Room A101" },
  { time: "13:00", event: "Lunch Break", type: "major", location: "Cafeteria" },
  { time: "14:00", event: "API Integration Workshop", type: "workshop", location: "Room B202" },
  { time: "15:00", event: "Coding Challenge", type: "game", location: "Main Hall" },
  { time: "16:00", event: "UI/UX Design Principles Workshop", type: "workshop", location: "Room C303" },
  { time: "17:00", event: "Tech Scavenger Hunt", type: "game", location: "Entire Venue" },
  { time: "18:00", event: "Dinner", type: "major", location: "Cafeteria" },
  { time: "19:00", event: "Submission Deadline", type: "major", location: "Online Platform" },
  { time: "20:00", event: "Project Presentations", type: "major", location: "Main Hall" },
  { time: "22:00", event: "Awards Ceremony", type: "major", location: "Main Hall" }
];

export function Schedule() {
  const [filter, setFilter] = useState<'all' | 'major' | 'major+workshops' | 'major+games'>('major');
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateCurrentEvent = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const index = scheduleData.findIndex((event, i) => {
        const nextEvent = scheduleData[i + 1];
        return event.time <= currentTime && (!nextEvent || nextEvent.time > currentTime);
      });

      setCurrentEventIndex(index);
    };

    updateCurrentEvent();
    const interval = setInterval(updateCurrentEvent, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const filteredSchedule = scheduleData.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'major') return event.type === 'major';
    if (filter === 'major+workshops') return event.type === 'major' || event.type === 'workshop';
    if (filter === 'major+games') return event.type === 'major' || event.type === 'game';
    return true;
  });

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Event Schedule</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button 
          size="sm" 
          variant={filter === 'all' ? 'default' : 'secondary'}
          onClick={() => setFilter('all')}
          className={`${filter === 'all' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200'} hover:bg-blue-700`}
        >
          All Events
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'major' ? 'default' : 'secondary'}
          onClick={() => setFilter('major')}
          className={`${filter === 'major' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200'} hover:bg-blue-700`}
        >
          Major Events
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'major+workshops' ? 'default' : 'secondary'}
          onClick={() => setFilter('major+workshops')}
          className={`${filter === 'major+workshops' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200'} hover:bg-blue-700`}
        >
          Major + Workshops
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'major+games' ? 'default' : 'secondary'}
          onClick={() => setFilter('major+games')}
          className={`${filter === 'major+games' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200'} hover:bg-blue-700`}
        >
          Major + Games
        </Button>
      </div>
      <div className="space-y-2 overflow-y-auto flex-grow">
        {filteredSchedule.map((item, index) => (
          <motion.div
            key={`schedule-${item.time}-${item.event}`}
            className={`flex justify-between items-center p-2 glass ${index === currentEventIndex ? 'border-2 border-yellow-400' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div>
              <span className="text-lg font-semibold">{item.time}</span>
              <p className="text-sm">{item.event}</p>
              <p className="text-xs text-gray-400">{item.location}</p>
            </div>
            <div className="flex items-center">
              <span className={`text-xs px-2 py-1 rounded ${
                item.type === 'major' ? 'bg-red-600' :
                item.type === 'workshop' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {item.type}
              </span>
              {index === currentEventIndex && (
                <span className="ml-2 text-yellow-400">●</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

