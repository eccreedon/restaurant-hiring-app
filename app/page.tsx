"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import CandidateBrowser from "@/components/candidate-browser"

type Position = "server" | "bartender" | "line-cook" | "general-manager" | "sous-chef"

const positions = [
  {
    id: "sous-chef" as Position,
    title: "Sous Chef",
    description: "Kitchen leadership and culinary expertise",
    image: "/sous-chef-headshot.jpg",
    questions: 7,
  },
  {
    id: "line-cook" as Position,
    title: "Line Cook",
    description: "Kitchen preparation and cooking staff",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line%20cook.jpg-Mn1fSjBoumnABo9UDTHldP2g7dMUYJ.jpeg",
    questions: 7,
  },
  {
    id: "server" as Position,
    title: "Server",
    description: "Front-of-house service professionals",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/server.jpg-qWRMKijIEeaHrSsHNAjbt667R4On9h.jpeg",
    questions: 7,
  },
  {
    id: "bartender" as Position,
    title: "Bartender",
    description: "Beverage specialists and mixologists",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bartender.jpg-KrfKsO0Tt94xcP3PQawyKc6CilnuW4.jpeg",
    questions: 7,
  },
  {
    id: "general-manager" as Position,
    title: "General Manager",
    description: "Restaurant operations and team leadership",
    image: "/general-manager-headshot.jpg",
    questions: 7,
  },
]

export default function HomePage() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)

  if (selectedPosition) {
    return <CandidateBrowser position={selectedPosition} onBack={() => setSelectedPosition(null)} />
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-balance">Clipboard Serves</h1>
          <p className="text-primary-foreground/70 mt-2 text-pretty">
            Select the position you're hiring for to browse qualified candidates
          </p>
        </div>
      </div>

      {/* Position Selection */}
      <div className="px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 md:gap-8 mb-8 md:mb-12 max-w-sm mx-auto">
            {positions.map((position) => (
              <Card
                key={position.id}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-400 bg-white overflow-hidden w-full border border-transparent group"
                onClick={() => setSelectedPosition(position.id)}
              >
                <div className="flex flex-row h-20 pl-4 group">
                  <div className="w-2/5">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={position.image || "/placeholder.svg"}
                        alt={position.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="w-3/5 p-3 ml-2 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{position.title}</h3>
                    <p className="text-gray-600 text-sm">{position.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
