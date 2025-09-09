"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
const ArrowLeft = () => <span>←</span>
import CandidateCard from "@/components/candidate-card"

type Position = "server" | "bartender" | "line-cook"

interface Candidate {
  id: string
  name: string
  photo: string
  distance: string
  shifts: {
    monday: { lunch: boolean; dinner: boolean }
    tuesday: { lunch: boolean; dinner: boolean }
    wednesday: { lunch: boolean; dinner: boolean }
    thursday: { lunch: boolean; dinner: boolean }
    friday: { lunch: boolean; dinner: boolean }
    saturday: { lunch: boolean; dinner: boolean }
    sunday: { lunch: boolean; dinner: boolean }
  }
  experience: Array<{
    timeframe: string
    title: string
    location: string
    url: string
  }>
  videoUrl: string
  phone: string
  bio: string
  skills: string[]
  skillsVideoUrl?: string
}

// Mock candidate data
const mockCandidates: Record<Position, Candidate[]> = {
  server: [
    {
      id: "1",
      name: "Sarah Chen",
      photo: "/sarah-chen-headshot.jpg",
      distance: "2.3 miles away",
      shifts: {
        monday: { lunch: true, dinner: true },
        tuesday: { lunch: true, dinner: true },
        wednesday: { lunch: false, dinner: true },
        thursday: { lunch: true, dinner: true },
        friday: { lunch: true, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: false, dinner: false },
      },
      experience: [
        {
          timeframe: "2022-present",
          title: "Server at The Garden Bistro",
          location: "Downtown",
          url: "https://www.yelp.com/biz/garden-bistro-downtown",
        },
        {
          timeframe: "2021-2022",
          title: "Waitress at Coastal Cafe",
          location: "Marina District",
          url: "https://www.yelp.com/biz/coastal-cafe-marina",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0123",
      bio: "Kind, gentle, honest + bubbly personality. Prev. server/captain at Kato (Michelin omakase). Experienced in fine dining service with extensive wine knowledge and tableside presentation skills.",
      skills: [
        "Customer Service",
        "Wine Knowledge",
        "Menu Knowledge",
        "Communication",
        "Teamwork",
        "Attention to Detail",
        "Time Management",
        "Positive Attitude",
      ],
      skillsVideoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      photo: "/marcus-johnson-headshot.jpg",
      distance: "1.8 miles away",
      shifts: {
        monday: { lunch: false, dinner: true },
        tuesday: { lunch: false, dinner: true },
        wednesday: { lunch: false, dinner: true },
        thursday: { lunch: false, dinner: true },
        friday: { lunch: false, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: true, dinner: false },
      },
      experience: [
        {
          timeframe: "2023-present",
          title: "Lead Server at Rooftop Grill",
          location: "Midtown",
          url: "https://www.yelp.com/biz/rooftop-grill-midtown",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0124",
      bio: "Natural leader with 5+ years FOH experience. Prev. captain at upscale steakhouse, trained 15+ new servers. Specializes in wine service and managing large parties with precision.",
      skills: [
        "Leadership",
        "Customer Service",
        "Wine Knowledge",
        "Communication",
        "Menu Knowledge",
        "Teamwork",
        "Time Management",
        "Beverage Knowledge",
      ],
    },
    {
      id: "5",
      name: "Emma Rodriguez",
      photo: "/emma-rodriguez-headshot.jpg",
      distance: "4.2 miles away",
      shifts: {
        monday: { lunch: false, dinner: true },
        tuesday: { lunch: false, dinner: true },
        wednesday: { lunch: false, dinner: true },
        thursday: { lunch: false, dinner: true },
        friday: { lunch: false, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: true, dinner: true },
      },
      experience: [
        {
          timeframe: "2023-present",
          title: "Server at Metropolitan Steakhouse",
          location: "Financial District",
          url: "https://www.yelp.com/biz/metropolitan-steakhouse-financial",
        },
        {
          timeframe: "2020-2023",
          title: "Hostess at Bella Vista",
          location: "Riverside",
          url: "https://www.yelp.com/biz/bella-vista-riverside",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0127",
      bio: "Bilingual server (English/Spanish) with 4 years upscale dining experience. Prev. server at James Beard nominated restaurant. Expert in wine pairings and special dietary accommodations.",
      skills: [
        "Customer Service",
        "Communication",
        "Menu Knowledge",
        "Wine Knowledge",
        "Teamwork",
        "Attention to Detail",
        "Leadership",
        "Positive Attitude",
      ],
    },
  ],
  bartender: [
    {
      id: "3",
      name: "Alex Rivera",
      photo: "/professional-bartender-headshot.jpg",
      distance: "3.1 miles away",
      shifts: {
        monday: { lunch: false, dinner: false },
        tuesday: { lunch: false, dinner: true },
        wednesday: { lunch: false, dinner: true },
        thursday: { lunch: false, dinner: true },
        friday: { lunch: false, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: false, dinner: true },
      },
      experience: [
        {
          timeframe: "2023-present",
          title: "Bartender at Craft Cocktail Co",
          location: "Arts District",
          url: "https://www.yelp.com/biz/craft-cocktail-co-arts",
        },
        {
          timeframe: "2021-2023",
          title: "Mixologist at The Speakeasy",
          location: "Historic Quarter",
          url: "https://www.yelp.com/biz/the-speakeasy-historic-quarter",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0125",
      bio: "Certified somm, also experienced bar lead in fine dining. Very comfortable building a bev program, familiar w/ Korean drink profiles. Understands the nuance of elevated, but accessible, neighborhood spot with a wow factor.",
      skills: [
        "Cocktail Development",
        "Bartending Skills",
        "Beverage Knowledge",
        "Customer Service",
        "Inventory Management",
        "Wine Knowledge",
        "Communication",
        "Attention to Detail",
      ],
      skillsVideoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
    },
    {
      id: "6",
      name: "Jordan Kim",
      photo: "/professional-male-server-headshot.jpg",
      distance: "2.7 miles away",
      shifts: {
        monday: { lunch: false, dinner: true },
        tuesday: { lunch: false, dinner: true },
        wednesday: { lunch: true, dinner: true },
        thursday: { lunch: true, dinner: true },
        friday: { lunch: true, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: false, dinner: false },
      },
      experience: [
        {
          timeframe: "2022-present",
          title: "Head Bartender at Skyline Lounge",
          location: "Hotel District",
          url: "https://www.yelp.com/biz/skyline-lounge-hotel-district",
        },
        {
          timeframe: "2020-2022",
          title: "Barback at Whiskey & Wine",
          location: "Old Town",
          url: "https://www.yelp.com/biz/whiskey-wine-old-town",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0128",
      bio: "High-volume bartender with flair techniques and strong whiskey knowledge. Prev. head bartender at 200+ seat rooftop venue. Managed inventory for $50K+ monthly bar sales.",
      skills: [
        "Bartending Skills",
        "Bar Management",
        "Leadership",
        "Beverage Knowledge",
        "Customer Service",
        "Bar Operations",
        "Inventory Management",
        "Teamwork",
      ],
      skillsVideoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
    },
    {
      id: "7",
      name: "Taylor Brooks",
      photo: "/taylor-brooks-headshot.jpg",
      distance: "1.9 miles away",
      shifts: {
        monday: { lunch: true, dinner: false },
        tuesday: { lunch: true, dinner: false },
        wednesday: { lunch: true, dinner: true },
        thursday: { lunch: true, dinner: true },
        friday: { lunch: true, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: true, dinner: false },
      },
      experience: [
        {
          timeframe: "2024-present",
          title: "Bartender at Garden Terrace",
          location: "Uptown",
          url: "https://www.yelp.com/biz/garden-terrace-uptown",
        },
        {
          timeframe: "2022-2024",
          title: "Server at Brew House",
          location: "Brewery District",
          url: "https://www.yelp.com/biz/brew-house-brewery-district",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0129",
      bio: "Versatile bartender specializing in craft beer and brunch cocktails. Cicerone Level 1 certified. Experienced in both high-volume service and craft cocktail preparation.",
      skills: [
        "Bartending Skills",
        "Customer Service",
        "Beverage Knowledge",
        "Communication",
        "Teamwork",
        "Time Management",
        "Positive Attitude",
        "Menu Knowledge",
      ],
    },
  ],
  "line-cook": [
    {
      id: "4",
      name: "Maria Santos",
      photo: "/professional-female-chef-headshot.jpg",
      distance: "1.5 miles away",
      shifts: {
        monday: { lunch: true, dinner: true },
        tuesday: { lunch: true, dinner: true },
        wednesday: { lunch: true, dinner: true },
        thursday: { lunch: true, dinner: true },
        friday: { lunch: true, dinner: true },
        saturday: { lunch: false, dinner: false },
        sunday: { lunch: false, dinner: false },
      },
      experience: [
        {
          timeframe: "2023-present",
          title: "Line Cook at Farm Table Restaurant",
          location: "Uptown",
          url: "https://www.yelp.com/biz/farm-table-restaurant-uptown",
        },
        {
          timeframe: "2021-2023",
          title: "Prep Cook at Italian Kitchen",
          location: "Little Italy",
          url: "https://www.yelp.com/biz/italian-kitchen-little-italy",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0126",
      bio: "Servant leader with 6 years BOH experience. Opened 2 farm-to-table restaurants, trained 10+ line cooks. Prev. sous chef at Italian fine dining, specializes in house-made pasta and seasonal menus.",
      skills: [
        "Knife Skills",
        "Food Prep",
        "Cooking",
        "Food Safety",
        "Teamwork",
        "Time Management",
        "Attention to Detail",
        "Menu Knowledge",
      ],
      skillsVideoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
    },
    {
      id: "8",
      name: "David Park",
      photo: "/david-park-headshot.jpg",
      distance: "3.4 miles away",
      shifts: {
        monday: { lunch: true, dinner: false },
        tuesday: { lunch: true, dinner: false },
        wednesday: { lunch: true, dinner: false },
        thursday: { lunch: true, dinner: false },
        friday: { lunch: true, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: false, dinner: false },
      },
      experience: [
        {
          timeframe: "2024-present",
          title: "Grill Cook at BBQ Junction",
          location: "South Side",
          url: "https://www.yelp.com/biz/bbq-junction-south-side",
        },
        {
          timeframe: "2022-2024",
          title: "Kitchen Assistant at Fusion Bistro",
          location: "Downtown",
          url: "https://www.yelp.com/biz/fusion-bistro-downtown",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0130",
      bio: "Dedicated grill specialist with Korean-BBQ and fusion experience. Prev. line cook at James Beard semifinalist restaurant. Expert in high-heat cooking and Asian flavor profiles.",
      skills: [
        "Cooking",
        "Food Prep",
        "Teamwork",
        "Time Management",
        "Food Safety",
        "Attention to Detail",
        "Communication",
        "Positive Attitude",
      ],
    },
    {
      id: "9",
      name: "Isabella Martinez",
      photo: "/isabella-martinez-headshot.jpg",
      distance: "2.1 miles away",
      shifts: {
        monday: { lunch: false, dinner: true },
        tuesday: { lunch: false, dinner: true },
        wednesday: { lunch: false, dinner: true },
        thursday: { lunch: false, dinner: true },
        friday: { lunch: false, dinner: true },
        saturday: { lunch: true, dinner: true },
        sunday: { lunch: false, dinner: true },
      },
      experience: [
        {
          timeframe: "2023-present",
          title: "Sauté Cook at Le Petit Café",
          location: "French Quarter",
          url: "https://www.yelp.com/biz/le-petit-cafe-french-quarter",
        },
        {
          timeframe: "2021-2023",
          title: "Prep Cook at Taco Libre",
          location: "Mission District",
          url: "https://www.yelp.com/biz/taco-libre-mission",
        },
      ],
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
      phone: "+1-555-0131",
      bio: "Passionate sauté cook with French technique training and Mexican heritage cooking. Culinary school graduate, specializes in mother sauces and authentic Mexican moles. Fast-paced kitchen veteran.",
      skills: [
        "Knife Skills",
        "Cooking",
        "Food Prep",
        "Food Safety",
        "Teamwork",
        "Time Management",
        "Attention to Detail",
        "Communication",
      ],
      skillsVideoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6412-EPUvF7FhLyi7g1blLr9NwSt4TryI0E.MOV",
    },
  ],
}

interface CandidateBrowserProps {
  position: Position
  onBack: () => void
}

export default function CandidateBrowser({ position, onBack }: CandidateBrowserProps) {
  const candidates = mockCandidates[position] || []
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % candidates.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + candidates.length) % candidates.length)
  }

  const positionTitles = {
    server: "Server",
    bartender: "Bartender",
    "line-cook": "Line Cook",
  }

  if (candidates.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground px-4 py-4">
          <div className="max-w-sm mx-auto flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft />
            </Button>
            <h1 className="text-lg font-semibold">{positionTitles[position]} Candidates</h1>
          </div>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">No candidates available for this position.</p>
        </div>
      </div>
    )
  }

  const currentCandidate = candidates[currentIndex]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4">
        <div className="max-w-sm mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-semibold">{positionTitles[position]} Candidates</h1>
          <div className="ml-auto text-sm text-primary-foreground/80">
            {currentIndex + 1} of {candidates.length}
          </div>
        </div>
      </div>

      {/* Candidate Card */}
      <div className="px-4 py-6 bg-muted">
        <CandidateCard
          candidate={currentCandidate}
          onNext={handleNext}
          onPrevious={handlePrevious}
          showNavigation={candidates.length > 1}
        />
      </div>
    </div>
  )
}
