'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { useToast } from "@/lib/use-toast"

interface ScheduleEvent {
  time: string;
  event: string;
  type: 'major' | 'workshop' | 'game';
  location?: string;
}

const scheduleData: ScheduleEvent[] = [
  { time: "8:30am - 9:00am", event: "Registration", type: "major" },
  { time: "9:00am - 9:40am", event: "Intro ceremony (with Rebecca John)", type: "major", location: "Theatre" },
  { time: "9:45am - 9:45pm", event: "Hacking", type: "major" },
  { time: "9:45am - 10:00am", event: "Team-building Activity", type: "workshop", location: "Theatre" },
  { time: "10:00am - 10:30am", event: "Intro to Python workshop", type: "workshop", location: "Theatre" },
  { time: "10:30am - 10:50am", event: "Fitness Event", type: "game", location: "Gym" },
  { time: "11:00am - 11:30am", event: "Web Development Workshop", type: "workshop", location: "Theatre" },
  { time: "11:30am - 12:00pm", event: "Lunch Distribution", type: "major", location: "Cafeteria" },
  { time: "12:15pm - 12:45pm", event: "Trivia Challenge", type: "game", location: "Rm 101" },
  { time: "12:30pm - 1:00pm", event: "AI Club Workshop", type: "workshop", location: "Theatre" },
  { time: "1:00pm - 1:30pm", event: "Siemens Workshop", type: "workshop", location: "Rm 101" },
  { time: "2:00pm - 2:30pm", event: "Karaoke", type: "game", location: "Theatre" },
  { time: "3:00pm - 3:30pm", event: "University Panel (UW & UofT students)", type: "workshop", location: "Theatre" },
  { time: "3:30pm - 4:00pm", event: "Brawl Stars Tournament", type: "game", location: "Theatre" },
  { time: "4:00pm - 4:30pm", event: "VR/AR Health Care Workshop", type: "workshop", location: "Rm 101" },
  { time: "4:30pm - 5:00pm", event: "Chess Tournament", type: "game", location: "Rm 101" },
  { time: "6:00pm - 6:00pm", event: "Submissions Due", type: "major" },
  { time: "5:30pm - 6:00pm", event: "Dinner Distribution", type: "major", location: "Cafeteria" },
  { time: "7:30pm - 8:00pm", event: "Closing Ceremony", type: "major", location: "Theatre" },
];

interface ScheduleProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

export function Schedule({ notificationsEnabled, setNotificationsEnabled }: ScheduleProps) {
  const [filter, setFilter] = useState<'all' | 'major' | 'workshops' | 'games'>('all');
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast()

  const sendNotification = useCallback((event: ScheduleEvent) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Event Starting', {
        body: `${event.event} is starting now!`,
        icon: '/favicon.ico'
      });
    } else {
      toast({
        title: "Event Starting",
        description: `${event.event} is starting now!`,
      })
    }
  }, [toast]);

  const parseTime = (timeString: string): number => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    let hoursNum = parseInt(hours, 10);
    if (modifier === 'PM' && hoursNum !== 12) hoursNum += 12;
    if (modifier === 'AM' && hoursNum === 12) hoursNum = 0;
    return hoursNum * 60 + parseInt(minutes, 10);
  };

  const updateCurrentEvent = useCallback(() => {
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    console.log(`Current time: ${currentTime.toLocaleTimeString()} (${currentTimeInMinutes} minutes)`);

    const index = scheduleData.findIndex((event) => {
      const [startTimeStr, endTimeStr] = event.time.split(' - ');
      const startTime = parseTime(startTimeStr);
      let endTime;
      if (endTimeStr) {
        endTime = parseTime(endTimeStr);
      } else {
        const nextEvent = scheduleData.find((e, i) => i > scheduleData.indexOf(event));
        endTime = nextEvent ? parseTime(nextEvent.time.split(' - ')[0]) : 1440; //Default to end of day if no next event
      }

      console.log(`Event: ${event.event}`);
      console.log(`Start time: ${startTimeStr} (${startTime} minutes)`);
      console.log(`End time: ${endTimeStr ? endTimeStr : 'N/A'} (${endTime} minutes)`);
      console.log(`Is current: ${currentTimeInMinutes >= startTime && currentTimeInMinutes < endTime}`);

      return currentTimeInMinutes >= startTime && currentTimeInMinutes < endTime;
    });

    console.log(`Current event index: ${index}`);

    if (index !== currentEventIndex) {
      setCurrentEventIndex(index);
      if (index !== -1 && notificationsEnabled) {
        sendNotification(scheduleData[index]);
      }
    }
  }, [currentTime, currentEventIndex, notificationsEnabled, sendNotification]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // For testing purposes, set the date to December 14, 2024
      now.setFullYear(2024);
      now.setMonth(11); // 11 is December (0-indexed)
      now.setDate(14);
      setCurrentTime(now);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    updateCurrentEvent();
  }, [updateCurrentEvent]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled",
          description: "You will now receive notifications for upcoming events.",
        })
      } else {
        toast({
          title: "Notifications Disabled",
          description: "Please enable notifications in your browser settings to receive event alerts.",
          variant: "destructive",
        })
      }
    }
  };

  const filteredSchedule = scheduleData.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'major') return event.type === 'major';
    if (filter === 'workshops') return event.type === 'workshop';
    if (filter === 'games') return event.type === 'game';
    return true;
  });

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Event Schedule</h2>
      <p className="text-lg mb-4">Current Time: {currentTime.toLocaleTimeString()}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button 
          size="sm" 
          variant={filter === 'all' ? 'default' : 'secondary'}
          onClick={() => setFilter('all')}
          className={`${filter === 'all' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200 hover:bg-blue-700'}`}
        >
          All Events
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'major' ? 'default' : 'secondary'}
          onClick={() => setFilter('major')}
          className={`${filter === 'major' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200 hover:bg-blue-700'}`}
        >
          Major Events
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'workshops' ? 'default' : 'secondary'}
          onClick={() => setFilter('workshops')}
          className={`${filter === 'workshops' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200 hover:bg-blue-700'}`}
        >
          Workshops
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'games' ? 'default' : 'secondary'}
          onClick={() => setFilter('games')}
          className={`${filter === 'games' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-blue-800 text-gray-200 hover:bg-blue-700'}`}
        >
          Games & Contests
        </Button>
        <Button
          size="sm"
          variant={notificationsEnabled ? 'default' : 'secondary'}
          onClick={requestNotificationPermission}
          className={`ml-auto ${notificationsEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {notificationsEnabled ? 'Notifications On' : 'Enable Notifications'}
        </Button>
      </div>
      <div className="space-y-2 overflow-y-auto flex-grow">
        {filteredSchedule.map((item, index) => (
          <motion.div
            key={`schedule-${item.time}-${item.event}`}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 glass ${index === currentEventIndex ? 'border-2 border-yellow-400' : 'border border-gray-600'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex-grow mb-2 sm:mb-0">
              <span className="text-lg font-semibold block sm:inline sm:mr-2">{item.time}</span>
              <span className="text-base">{item.event}</span>
              {item.location && (
                <span className="text-sm text-gray-400 block sm:inline sm:ml-2">
                  @ {item.location}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <span className={`text-xs px-2 py-1 rounded ${
                item.type === 'major' ? 'bg-red-600' :
                item.type === 'workshop' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {item.type === 'game' ? 'Game & Contest' : item.type}
              </span>
              {index === currentEventIndex && (
                <span className="ml-2 text-yellow-400" aria-hidden="true">●</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

