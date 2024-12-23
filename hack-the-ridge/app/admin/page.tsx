'use client'

import { EventManager } from '../../components/event-manager'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Hack the Ridge Admin
        </h1>
        <EventManager />
      </div>
    </main>
  )
}

