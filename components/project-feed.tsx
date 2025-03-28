"use client"

import { useEffect, useState } from "react"
import { ProjectCard } from "@/components/project-card"

interface Project {
  id: string
  title: string
  description: string
  author: string
  createdAt: string
  roasts: Roast[]
}

interface Roast {
  id: string
  content: string
  author: string
  createdAt: string
}

export default function ProjectFeed() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const loadProjects = () => {
      try {
        const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]")
        setProjects(
          storedProjects.sort(
            (a: Project, b: Project) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        )
      } catch (error) {
        console.error("Failed to load projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()

    // Listen for storage events to update the feed when projects are added
    window.addEventListener("storage", loadProjects)
    return () => window.removeEventListener("storage", loadProjects)
  }, [])

  const addRoast = (projectId: string, roast: Omit<Roast, "id" | "createdAt">) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const newRoast = {
          ...roast,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        return {
          ...project,
          roasts: [...project.roasts, newRoast],
        }
      }
      return project
    })

    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading projects...</div>
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No projects yet!</h2>
        <p className="text-muted-foreground">Be the first to submit your idea for roasting.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onRoastSubmit={addRoast} />
      ))}
    </div>
  )
}

