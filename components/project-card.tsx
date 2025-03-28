"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Flame } from "lucide-react"

interface Roast {
  id: string
  content: string
  author: string
  createdAt: string
}

interface Project {
  id: string
  title: string
  description: string
  author: string
  createdAt: string
  roasts: Roast[]
}

interface ProjectCardProps {
  project: Project
  onRoastSubmit: (projectId: string, roast: { content: string; author: string }) => void
}

export function ProjectCard({ project, onRoastSubmit }: ProjectCardProps) {
  const [roastContent, setRoastContent] = useState("")
  const [roastAuthor, setRoastAuthor] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmitRoast = (e: React.FormEvent) => {
    e.preventDefault()
    if (roastContent.trim()) {
      onRoastSubmit(project.id, {
        content: roastContent,
        author: roastAuthor.trim() || "Anonymous Roaster",
      })
      setRoastContent("")
      setRoastAuthor("")
    }
  }

  const formattedDate = formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          Posted by {project.author} • {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="whitespace-pre-line">{project.description}</p>

        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold">Roasts ({project.roasts.length})</h3>
          </div>

          {project.roasts.length > 0 ? (
            <div className="space-y-3">
              {(isExpanded ? project.roasts : project.roasts.slice(0, 3)).map((roast) => (
                <div key={roast.id} className="bg-muted p-3 rounded-md">
                  <p className="mb-1">{roast.content}</p>
                  <p className="text-sm text-muted-foreground">
                    — {roast.author}, {formatDistanceToNow(new Date(roast.createdAt), { addSuffix: true })}
                  </p>
                </div>
              ))}

              {project.roasts.length > 3 && (
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? "Show less" : `Show ${project.roasts.length - 3} more roasts`}
                </Button>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No roasts yet. Be the first to roast this idea!</p>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="pt-4">
        <form onSubmit={handleSubmitRoast} className="w-full space-y-3">
          <Input
            placeholder="Add your roast..."
            value={roastContent}
            onChange={(e) => setRoastContent(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <Input
              placeholder="Your name (optional)"
              value={roastAuthor}
              onChange={(e) => setRoastAuthor(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Roast It</Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}

