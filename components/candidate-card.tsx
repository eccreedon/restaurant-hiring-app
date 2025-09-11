"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ChevronLeft = () => <span>‹</span>
const ChevronRight = () => <span>›</span>
const MapPin = () => <span>📍</span>
const Clock = () => <span>🕐</span>
const ExternalLink = () => <span>↗</span>
const Play = () => <span>▶️</span>
const MessageCircle = () => <span>💬</span>
const X = () => <span>✕</span>
const Pause = () => <span>⏸️</span>
const Volume2 = () => <span>🔊</span>
const VolumeX = () => <span>🔇</span>

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

interface CandidateCardProps {
  candidate: Candidate
  onNext: () => void
  onPrevious: () => void
  showNavigation: boolean
}

export default function CandidateCard({ candidate, onNext, onPrevious, showNavigation }: CandidateCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showSkillsVideoModal, setShowSkillsVideoModal] = useState(false)
  const [skillsVideoProgress, setSkillsVideoProgress] = useState(0)
  const [skillsVideoDuration, setSkillsVideoDuration] = useState(0)
  const [isSkillsVideoPlaying, setIsSkillsVideoPlaying] = useState(false)
  const [isSkillsVideoMuted, setIsSkillsVideoMuted] = useState(false)
  const [isSkillsVideoLoading, setIsSkillsVideoLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const skillsVideoRef = useRef<HTMLVideoElement>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  const getSkillCategory = (skill: string) => {
    const qualitativeSkills = [
      "teamwork",
      "communication",
      "attention to detail",
      "positive attitude",
      "leadership",
      "time management",
      "customer service",
    ]
    const foodSkills = ["knife skills", "food prep", "cooking", "food safety", "menu knowledge", "inventory management"]
    const beverageSkills = [
      "cocktail development",
      "bartending skills",
      "beverage knowledge",
      "wine knowledge",
      "bar management",
      "bar operations",
    ]

    const skillLower = skill.toLowerCase()

    if (qualitativeSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
      return "border border-yellow-200 text-card-foreground bg-transparent"
    }
    if (foodSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
      return "border border-green-500 text-card-foreground bg-transparent"
    }
    if (beverageSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
      return "border border-amber-400 text-card-foreground bg-transparent"
    }

    // Default fallback
    return "border border-muted-foreground text-card-foreground bg-transparent"
  }

  const getSkillEmoji = (skill: string) => {
    const qualitativeSkills = [
      "teamwork",
      "communication",
      "attention to detail",
      "positive attitude",
      "leadership",
      "time management",
      "customer service",
    ]
    const foodSkills = ["knife skills", "food prep", "cooking", "food safety", "menu knowledge", "inventory management"]
    const beverageSkills = [
      "cocktail development",
      "bartending skills",
      "beverage knowledge",
      "wine knowledge",
      "bar management",
      "bar operations",
    ]

    const skillLower = skill.toLowerCase()

    if (qualitativeSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
      return "💡"
    }
    if (foodSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
      return "🥦"
    }
    if (beverageSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
      return "🥃"
    }

    return ""
  }

  const categorizeSkills = (skills: string[]) => {
    const qualitativeSkills = [
      "teamwork",
      "communication",
      "attention to detail",
      "positive attitude",
      "leadership",
      "time management",
      "customer service",
    ]
    const foodSkills = ["knife skills", "food prep", "cooking", "food safety", "menu knowledge", "inventory management"]
    const beverageSkills = [
      "cocktail development",
      "bartending skills",
      "beverage knowledge",
      "wine knowledge",
      "bar management",
      "bar operations",
    ]

    const categorized = {
      qualitative: [] as string[],
      food: [] as string[],
      beverage: [] as string[],
      other: [] as string[],
    }

    skills.forEach((skill) => {
      const skillLower = skill.toLowerCase()
      if (qualitativeSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
        categorized.qualitative.push(skill)
      } else if (foodSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
        categorized.food.push(skill)
      } else if (beverageSkills.some((s) => skillLower.includes(s.toLowerCase()))) {
        categorized.beverage.push(skill)
      } else {
        categorized.other.push(skill)
      }
    })

    return categorized
  }

  const handleContact = () => {
    setShowContactModal(true)
  }

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(candidate.phone)
      // Could add a toast notification here
    } catch (err) {
      console.log("Failed to copy phone number")
    }
  }

  const handleSendSMS = () => {
    const message = `Hi ${candidate.name}, I saw your profile on our hiring app and would like to discuss a position at our restaurant.`
    const encodedMessage = encodeURIComponent(message)
    const smsUrl = `sms:${candidate.phone}?body=${encodedMessage}`

    // Try to open SMS, but don't navigate away from the app
    try {
      window.open(smsUrl, "_blank")
    } catch (err) {
      // Fallback: just copy the phone number
      handleCopyPhone()
    }
  }

  const handleCloseVideo = () => {
    setShowVideoModal(false)
    setIsVideoPlaying(false)
    setVideoProgress(0)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleCloseSkillsVideo = () => {
    setShowSkillsVideoModal(false)
    setIsSkillsVideoPlaying(false)
    setSkillsVideoProgress(0)
    if (skillsVideoRef.current) {
      skillsVideoRef.current.pause()
      skillsVideoRef.current.currentTime = 0
    }
  }

  const toggleSkillsVideoPlayback = () => {
    if (skillsVideoRef.current) {
      if (isSkillsVideoPlaying) {
        skillsVideoRef.current.pause()
      } else {
        skillsVideoRef.current.play()
      }
      setIsSkillsVideoPlaying(!isSkillsVideoPlaying)
    }
  }

  const toggleSkillsVideoMute = () => {
    if (skillsVideoRef.current) {
      skillsVideoRef.current.muted = !isSkillsVideoMuted
      setIsSkillsVideoMuted(!isSkillsVideoMuted)
    }
  }

  const handleSkillsVideoTimeUpdate = () => {
    if (skillsVideoRef.current) {
      const progress = (skillsVideoRef.current.currentTime / skillsVideoRef.current.duration) * 100
      setSkillsVideoProgress(progress)
    }
  }

  const handleSkillsVideoLoadedMetadata = () => {
    if (skillsVideoRef.current) {
      setSkillsVideoDuration(skillsVideoRef.current.duration)
      setIsSkillsVideoLoading(false)
    }
  }

  const handleSkillsProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (skillsVideoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * skillsVideoRef.current.duration
      skillsVideoRef.current.currentTime = newTime
    }
  }

  const handleVideoPlay = () => {
    setShowVideoModal(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleSkillsVideoPlay = () => {
    setShowSkillsVideoModal(true)
    if (skillsVideoRef.current) {
      skillsVideoRef.current.play()
    }
  }

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setVideoProgress(progress)
    }
  }

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration)
      setIsVideoLoading(false)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * videoRef.current.duration
      videoRef.current.currentTime = newTime
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const DayAvailability = ({
    day,
    availability,
  }: { day: string; availability: { lunch: boolean; dinner: boolean } }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex">
          <div
            className={`w-1/2 h-full ${availability.lunch ? "bg-yellow-200" : "bg-gray-300"}`}
            title={`${day} Lunch: ${availability.lunch ? "Available" : "Unavailable"}`}
          />
          <div
            className={`w-1/2 h-full ${availability.dinner ? "" : "bg-gray-300"}`}
            style={availability.dinner ? { backgroundColor: "oklch(0.804 0.098 247.4)" } : {}}
            title={`${day} Dinner: ${availability.dinner ? "Available" : "Unavailable"}`}
          />
        </div>
        <span className="text-xs text-muted-foreground mt-1">{day}</span>
      </div>
    )
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()

    // Generate next 14 days
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const dayName = date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
      const shifts = candidate.shifts[dayName as keyof typeof candidate.shifts]

      // Only include dates where candidate is available
      if (shifts && (shifts.lunch || shifts.dinner)) {
        dates.push({
          date: date,
          dayName: dayName,
          shifts: shifts,
          formatted: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        })
      }
    }

    return dates
  }

  const getAvailableTimeSlots = (dayName: string) => {
    const shifts = candidate.shifts[dayName as keyof typeof candidate.shifts]
    const timeSlots = []

    if (shifts?.lunch) {
      timeSlots.push("11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM")
    }

    if (shifts?.dinner) {
      timeSlots.push("5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM")
    }

    return timeSlots
  }

  const handleScheduleInterview = () => {
    if (selectedDate && selectedTime) {
      // In a real app, this would make an API call to schedule the interview
      alert(`Phone call scheduled with ${candidate.name} on ${selectedDate} at ${selectedTime}`)
      setShowContactModal(false)
      setSelectedDate("")
      setSelectedTime("")
    }
  }

  return (
    <>
      <div className="max-w-sm mx-auto">
        <Card className="overflow-hidden select-none" ref={cardRef}>
          <CardContent className="p-0">
            <div className="flex justify-center p-4 bg-muted/10">
              <div className="relative flex items-center justify-center w-full">
                {/* Left navigation arrow - outside image */}
                {showNavigation && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground h-8 w-8 p-0 shadow-md z-10"
                  >
                    <ChevronLeft />
                  </Button>
                )}

                {/* Image container */}
                <div className="relative aspect-square bg-muted w-1/2">
                  <img
                    src={candidate.photo || "/placeholder.svg"}
                    alt={candidate.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg" // Added shadow-lg for shading behind photo
                    draggable={false}
                  />
                </div>

                {/* Right navigation arrow - outside image */}
                {showNavigation && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground h-8 w-8 p-0 shadow-md z-10"
                  >
                    <ChevronRight />
                  </Button>
                )}
              </div>
            </div>

            <div className="px-6 pt-2 pb-6 space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-card-foreground">{candidate.name}</h2>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 mb-3">
                      <MapPin />
                      {candidate.distance}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleVideoPlay}
                    className="bg-gray-400/40 hover:bg-gray-500/90 text-card-foreground text-xs flex-shrink-0 shadow-md self-start"
                    style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.15)" }}
                  >
                    <Play /> Intro Video
                  </Button>
                </div>
                <div className="border-l-4 border-slate-200 pl-4 py-2">
                  {" "}
                  {/* Updated border color from slate-300 to slate-200 */}
                  <p className="text-xs text-card-foreground text-pretty">{candidate.bio}</p>
                </div>
              </div>

              {/* Experience header outside and above the bordered container */}
              <div className="flex items-center gap-1 text-sm font-medium text-card-foreground mb-3">Experience</div>

              {/* Experience section */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="space-y-1 pb-3 border-b border-border last:border-b-0 last:pb-0">
                      <p className="text-xs text-muted-foreground font-medium">{exp.timeframe}</p>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-card-foreground truncate">{exp.title}</p>
                          <p className="text-xs text-muted-foreground/70">{exp.location}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(exp.url, "_blank")}
                          className="flex-shrink-0 h-8 px-3 text-card-foreground text-xs font-medium hover:opacity-90"
                          style={{
                            backgroundColor: "oklch(0.804 0.098 247.4)",
                            boxShadow: "3px 3px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          View <ExternalLink />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Shifts header outside and above the bordered container */}
              <div className="flex items-center gap-1 text-sm font-medium text-card-foreground mb-3">
                Available Shifts
              </div>

              {/* Available Shifts section */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="grid grid-cols-7 gap-2">
                  <DayAvailability day="Mon" availability={candidate.shifts.monday} />
                  <DayAvailability day="Tue" availability={candidate.shifts.tuesday} />
                  <DayAvailability day="Wed" availability={candidate.shifts.wednesday} />
                  <DayAvailability day="Thu" availability={candidate.shifts.thursday} />
                  <DayAvailability day="Fri" availability={candidate.shifts.friday} />
                  <DayAvailability day="Sat" availability={candidate.shifts.saturday} />
                  <DayAvailability day="Sun" availability={candidate.shifts.sunday} />
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-200 rounded-full" />
                    <span>Lunch</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.804 0.098 247.4)" }} />
                    <span>Dinner</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded-full" />
                    <span>Unavailable</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleContact}
                  className="w-full bg-gray-600 hover:bg-gray-800 text-white shadow-lg"
                  size="lg"
                >
                  Schedule Phone Call
                </Button>
              </div>

              {/* Top Skills header outside and above the bordered container */}
              <div className="flex items-center gap-1 text-sm font-medium text-card-foreground mb-3">Top Skills</div>

              <div className="bg-background border border-border rounded-lg p-4">
                {(() => {
                  const categorizedSkills = categorizeSkills(candidate.skills)

                  return (
                    <div className="space-y-4">
                      {/* Food Skills */}
                      {categorizedSkills.food.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">🥦</span>
                            <h4 className="text-xs font-medium text-muted-foreground tracking-wide">Food & Kitchen</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {categorizedSkills.food.map((skill, index) => (
                              <div
                                key={index}
                                className="border border-green-500 text-card-foreground bg-transparent px-2 py-1 rounded-md text-[10px] font-medium"
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Beverage Skills */}
                      {categorizedSkills.beverage.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">🥃</span>
                            <h4 className="text-xs font-medium text-muted-foreground tracking-wide">Bar & Beverage</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {categorizedSkills.beverage.map((skill, index) => (
                              <div
                                key={index}
                                className="border border-amber-400 text-card-foreground bg-transparent px-2 py-1 rounded-md text-[10px] font-medium"
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Soft Skills */}
                      {categorizedSkills.qualitative.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">💡</span>
                            <h4 className="text-xs font-medium text-muted-foreground tracking-wide">Soft Skills</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {categorizedSkills.qualitative.map((skill, index) => (
                              <div
                                key={index}
                                className="border border-yellow-200 text-card-foreground bg-transparent px-2 py-1 rounded-md text-[10px] font-medium"
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Other Skills */}
                      {categorizedSkills.other.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xs font-medium text-muted-foreground tracking-wide">Other Skills</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {categorizedSkills.other.map((skill, index) => (
                              <div
                                key={index}
                                className="border border-muted-foreground text-card-foreground bg-transparent px-2 py-1 rounded-md text-[10px] font-medium"
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>

              {candidate.skillsVideoUrl && (
                <>
                  {/* Skills Demo header outside and above the bordered container */}
                  <div className="flex items-center gap-1 text-sm font-medium text-card-foreground mb-3">
                    Skills Demo
                  </div>

                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="relative aspect-[9/16] bg-muted rounded-lg overflow-hidden max-w-[200px] mx-auto">
                      <img
                        src={candidate.photo || "/placeholder.svg"}
                        alt={`${candidate.name} skills demo`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button
                          size="sm"
                          onClick={handleSkillsVideoPlay}
                          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        >
                          <Play /> Watch Skills
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={candidate.videoUrl || "/placeholder-video.mp4"}
              className="w-full h-full object-contain"
              onTimeUpdate={handleVideoTimeUpdate}
              onLoadedMetadata={handleVideoLoadedMetadata}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
              playsInline
              preload="metadata"
              poster={candidate.photo}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80">
              {/* Close button - always visible with better contrast */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20"
              >
                <X />
              </Button>

              {/* Bottom controls - always visible */}
              <div className="absolute bottom-4 left-4 right-4 space-y-3 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="w-full h-3 bg-white/30 rounded-full cursor-pointer" onClick={handleProgressClick}>
                  <div
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause button - always visible, larger tap target */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleVideoPlayback}
                      className="text-white bg-white/20 hover:bg-white/40 h-10 w-10 p-0 text-lg"
                      disabled={isVideoLoading}
                    >
                      {isVideoLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : isVideoPlaying ? (
                        <Pause />
                      ) : (
                        <Play />
                      )}
                    </Button>
                    <span>
                      {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"} /{" "}
                      {formatTime(videoDuration)}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white bg-white/20 hover:bg-white/40 h-10 w-10 p-0"
                  >
                    {isMuted ? <VolumeX /> : <Volume2 />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Header info - always visible */}
            <div className="absolute top-4 left-4 text-white bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <h3 className="font-semibold">{candidate.name}</h3>
              <p className="text-sm text-white/80">Intro Video</p>
            </div>
          </div>
        </div>
      )}

      {showSkillsVideoModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden">
            <video
              ref={skillsVideoRef}
              src={candidate.skillsVideoUrl || "/placeholder-video.mp4"}
              className="w-full h-full object-contain"
              onTimeUpdate={handleSkillsVideoTimeUpdate}
              onLoadedMetadata={handleSkillsVideoLoadedMetadata}
              onPlay={() => setIsSkillsVideoPlaying(true)}
              onPause={() => setIsSkillsVideoPlaying(false)}
              onEnded={() => setIsSkillsVideoPlaying(false)}
              playsInline
              preload="metadata"
              poster={candidate.photo}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80">
              {/* Close button - always visible with better contrast */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseSkillsVideo}
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20"
              >
                <X />
              </Button>

              {/* Bottom controls - always visible */}
              <div className="absolute bottom-4 left-4 right-4 space-y-3 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="w-full h-3 bg-white/30 rounded-full cursor-pointer" onClick={handleSkillsProgressClick}>
                  <div
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${skillsVideoProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause button - always visible, larger tap target */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSkillsVideoPlayback}
                      className="text-white bg-white/20 hover:bg-white/40 h-10 w-10 p-0 text-lg"
                      disabled={isSkillsVideoLoading}
                    >
                      {isSkillsVideoLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : isSkillsVideoPlaying ? (
                        <Pause />
                      ) : (
                        <Play />
                      )}
                    </Button>
                    <span>
                      {skillsVideoRef.current ? formatTime(skillsVideoRef.current.currentTime) : "0:00"} /{" "}
                      {formatTime(skillsVideoDuration)}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSkillsVideoMute}
                    className="text-white bg-white/20 hover:bg-white/40 h-10 w-10 p-0"
                  >
                    {isSkillsVideoMuted ? <VolumeX /> : <Volume2 />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Header info - always visible */}
            <div className="absolute top-4 left-4 text-white bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <h3 className="font-semibold">{candidate.name}</h3>
              <p className="text-sm text-white/80">Skills Demo</p>
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-md space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Schedule Phone Call</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowContactModal(false)} className="h-8 w-8 p-0">
                <X />
              </Button>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">Book a time to meet with {candidate.name}</p>
            </div>

            <div className="space-y-4">
              {/* Date Selection */}
              <div>
                <h4 className="text-sm font-medium mb-2">Available Dates</h4>
                <div className="grid grid-cols-2 gap-2">
                  {getAvailableDates()
                    .slice(0, 8)
                    .map((dateInfo, index) => (
                      <Button
                        key={index}
                        variant={selectedDate === dateInfo.formatted ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedDate(dateInfo.formatted)
                          setSelectedTime("") // Reset time when date changes
                        }}
                        className="text-xs h-auto py-2 px-3"
                      >
                        <div className="text-center">
                          <div className="font-medium">{dateInfo.formatted}</div>
                        </div>
                      </Button>
                    ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Available Times</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {getAvailableTimeSlots(
                      getAvailableDates().find((d) => d.formatted === selectedDate)?.dayName || "",
                    ).map((time, index) => (
                      <Button
                        key={index}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule Button */}
              <div className="pt-4 border-t">
                <Button onClick={handleScheduleInterview} disabled={!selectedDate || !selectedTime} className="w-full">
                  Send Invitation Text
                </Button>
                {selectedDate && selectedTime && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Phone call on {selectedDate} at {selectedTime}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
