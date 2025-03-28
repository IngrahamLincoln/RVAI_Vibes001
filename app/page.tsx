"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import IdeaSparks from "@/components/idea-sparks"
import { ThemeToggle } from "@/components/theme-toggle"
import { IdeaForm } from "@/components/idea-form"
import { useIdeas } from "@/hooks/use-ideas"
import { Sparkles, Zap, Rocket, Brain, Lightbulb } from "lucide-react"

export default function Home() {
  const { ideas, voteIdea } = useIdeas()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      <ThemeToggle />
      <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none">
        <IdeaSparks />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-12">
          <div className="inline-block animate-float">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lightbulb className="h-8 w-8 text-yellow-300" />
              <h1 className="text-5xl font-bold tracking-tight dark:text-white text-white">Idea Reactor</h1>
              <Zap className="h-8 w-8 text-yellow-300" />
            </div>
          </div>

          <p className="text-xl max-w-2xl mx-auto mt-4 dark:text-purple-100 text-white">
            Where the wildest ideas collide, connect, and create the future of our tech & creator clubhouse
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-glow">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 dark:text-white text-white">
                <Brain className="h-6 w-6 text-green-300" />
                Submit Your Idea
              </h2>
              <IdeaForm />
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-glow">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 dark:text-white text-white">
                <Rocket className="h-6 w-6 text-blue-300" />
                Upcoming Idea Fusion Event
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-700/50 p-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-sm font-medium text-white">APR</div>
                    <div className="text-xl font-bold text-white">15</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reality Distortion Field</h3>
                    <p className="text-sm text-purple-200">7:00 PM - 10:00 PM • Main Space</p>
                  </div>
                </div>
                <p className="text-sm text-white">
                  A night where we bring the most upvoted crazy ideas to life through rapid prototyping, collaborative
                  hacking, and a healthy dose of "why not?"
                </p>
                <Button variant="outline" className="w-full border-purple-400/30 bg-white/10 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-glow h-full">
            <h2 className="text-2xl font-bold mb-6 text-white">Idea Vortex</h2>
            <div className="space-y-4 idea-scroll max-h-[500px] overflow-y-auto pr-2">
              {ideas.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No ideas yet. Be the first to submit one!</p>
              ) : (
                ideas.map((idea) => (
                  <div key={idea.id} className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg border border-white/10">
                    <h3 className="font-bold text-lg text-white">{idea.title}</h3>
                    <p className="text-sm my-2 text-white/90">{idea.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-white/70">by {idea.author}</span>
                      <button
                        onClick={() => voteIdea(idea.id)}
                        className="flex items-center gap-1 bg-purple-800/50 px-2 py-1 rounded-full text-xs hover:bg-purple-700/50 transition-colors text-white"
                      >
                        <Zap className="h-3 w-3 text-yellow-300" />
                        <span>{idea.votes} votes</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

