"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Sparkles, Zap, ArrowLeft, Lightbulb, Shuffle } from "lucide-react"
import IdeaSparks from "@/components/idea-sparks"
import Link from "next/link"

const IDEA_STARTERS = [
  "What if we combined virtual reality with...",
  "Imagine an event where participants have to...",
  "A hackathon, but with the constraint that...",
  "A workshop that teaches people to build...",
  "An installation that responds to people's...",
  "A collaborative project where each person...",
  "A game night featuring technologies that...",
  "A competition where teams have to solve...",
  "An immersive experience that simulates...",
  "A social experiment using AI to connect people who...",
]

const WILD_ADJECTIVES = [
  "mind-bending",
  "reality-warping",
  "consciousness-expanding",
  "paradigm-shifting",
  "future-defining",
  "boundary-dissolving",
  "expectation-shattering",
  "perception-altering",
  "convention-defying",
  "imagination-igniting",
]

export default function SubmitIdeaPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ideaStarter, setIdeaStarter] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    contact: "",
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isThinking, setIsThinking] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getRandomIdeaStarter = () => {
    const randomStarter = IDEA_STARTERS[Math.floor(Math.random() * IDEA_STARTERS.length)]
    const randomAdjective = WILD_ADJECTIVES[Math.floor(Math.random() * WILD_ADJECTIVES.length)]
    setIdeaStarter(`${randomStarter} ${randomAdjective}...`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsThinking(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Idea submitted to the reactor!",
        description: "Your creative spark has been added to our idea vortex.",
      })

      // Redirect after a brief delay to show the "thinking" animation
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "The idea reactor is experiencing turbulence. Please try again.",
        variant: "destructive",
      })
      setIsThinking(false)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none">
        <IdeaSparks />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <Button variant="ghost" className="mb-8 text-purple-200 hover:text-white hover:bg-white/10" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Idea Reactor
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-300" />
              Submit Your Crazy Idea
              <Zap className="h-6 w-6 text-yellow-300" />
            </h1>
            <p className="mt-2 text-purple-200">The wilder, the better. No idea is too outlandish for our community!</p>
          </header>

          {isThinking ? (
            <div className="text-center py-16 animate-pulse">
              <div className="inline-block relative">
                <div className="absolute -inset-8 rounded-full opacity-75 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl animate-spin-slow"></div>
                <Sparkles className="h-16 w-16 text-yellow-300 relative" />
              </div>
              <h2 className="text-2xl font-bold mt-6 mb-2">Processing Your Idea...</h2>
              <p className="text-purple-200">Fusing neurons, connecting synapses, generating possibilities...</p>
            </div>
          ) : (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-glow p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="title" className="text-lg">
                          Give your idea a catchy name
                        </Label>
                        <span className="text-xs text-purple-300">Step 1 of 2</span>
                      </div>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., 'Neural Network Nightclub'"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-purple-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-lg">
                        Describe your wild idea
                      </Label>
                      <div className="bg-purple-800/30 p-3 rounded-lg mb-3 flex items-start gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-8 text-purple-300 hover:text-white hover:bg-purple-700/50"
                          onClick={getRandomIdeaStarter}
                        >
                          <Shuffle className="h-4 w-4 mr-1" />
                          Inspire Me
                        </Button>
                        <div className="text-sm italic text-purple-200">
                          {ideaStarter || "Click 'Inspire Me' for a random idea starter..."}
                        </div>
                      </div>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Let your imagination run wild! The more detailed, the better."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="bg-white/5 border-white/10 text-white placeholder:text-purple-300"
                      />
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      onClick={() => setCurrentStep(2)}
                    >
                      Continue to Step 2
                    </Button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="author" className="text-lg">
                          Your creative alias
                        </Label>
                        <span className="text-xs text-purple-300">Step 2 of 2</span>
                      </div>
                      <Input
                        id="author"
                        name="author"
                        placeholder="e.g., 'Quantum Dreamer' or 'Future Architect'"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-purple-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-lg">
                        How can we reach you?
                      </Label>
                      <Input
                        id="contact"
                        name="contact"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-purple-300"
                      />
                      <p className="text-xs text-purple-300 mt-1">
                        We'll only contact you if we want to make your idea a reality!
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-purple-400/30 text-purple-100"
                        onClick={() => setCurrentStep(1)}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                        disabled={isSubmitting}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Submitting..." : "Launch Your Idea!"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

