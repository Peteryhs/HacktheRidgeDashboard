'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const documents = [
  {
    title: "General Guidelines",
    url: "https://docs.google.com/document/d/1O1DS1ZuZawxk9_z8pi247L0Lm6oBig1yqqk5hewLTC0/edit?usp=sharing "
  },
  {
    title: "AI Policy",
    url: "https://docs.google.com/document/d/1V0OAI3ga81st85_GY_r1DU6TP4bCA0YDACCPcwv5VeQ/edit?usp=drive_link "
  },
  {
    title: "Adding Your Project to DevPost",
    url: "https://docs.google.com/document/d/1_QlhZNe2I3F7PbPY3xHt47puwjn6wdmsZkp9iRWlM64/edit?usp=sharing "
  },
  {
    title: "Prize Info",
    url: "https://docs.google.com/document/d/1saHbJjX1MR8qSNd-lCZSha20H0Km4NylZQnCfPtSkh4/edit?tab=t.0 "
  },
    {
    title: "Web Dev Workshops",
    url: "https://docs.google.com/presentation/d/1KwjdPH6E0EkuF41Wi05Vu2UmjerA97lz_UX491eEzLo/edit?usp=sharing"
  },
    {
    title: "AI Workshop",
    url: "https://docs.google.com/presentation/d/1uJuN2DMbt0xpQCwKmNw7FuP2sCizNDSg0GiJup2va2c/edit?usp=sharing"
  },
    {
    title: "Made with V0 by Peter",
    url: "https://www.youtube.com/shorts/tzD9OxAHtzU"
  }
];

export function InfoPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { x: 0 },
          closed: { x: "calc(100% - 85px)" } // Adjusted to show text when collapsed
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex"
      >
        <Button
          variant="default"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-auto py-8 rounded-l-lg rounded-r-none bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
          style={{ writingMode: 'vertical-rl', width: '85px' }} // Adjusted width
        >
          <div className="flex items-center justify-between w-full px-2">
            {/* Text always visible */}
            <motion.span
              className="origin-center"
              style={{ writingMode: 'horizontal-tb'}}
            >
              Info
            </motion.span>

            {/* Icons with spacing, conditionally rendered */}
            <motion.div
              initial={false}
              animate={{ 
                rotate: isOpen ? 0 : 180, // Rotate the icon container instead
                x: isOpen ? 0 : 0  // Adjust x position based on open state
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </motion.div>
          </div>
        </Button>
        <motion.div
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: 20 }
          }}
          className="w-80 bg-gray-800 text-white p-6 rounded-r-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Hackathon Resources</h2>
          <ul className="space-y-4">
            {documents.map((doc, index) => (
              <li key={index}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

