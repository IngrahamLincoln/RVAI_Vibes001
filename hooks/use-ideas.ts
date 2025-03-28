"use client"

import { useState, useEffect } from 'react'

export interface Idea {
  id: string
  title: string
  description: string
  author: string
  votes: number
  createdAt: string
}

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([])

  useEffect(() => {
    // Load ideas from localStorage on mount
    const savedIdeas = localStorage.getItem('ideas')
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas))
    }
  }, [])

  const addIdea = (idea: Omit<Idea, 'id' | 'votes' | 'createdAt'>) => {
    const newIdea: Idea = {
      ...idea,
      id: Math.random().toString(36).substr(2, 9),
      votes: 0,
      createdAt: new Date().toISOString()
    }
    
    const updatedIdeas = [newIdea, ...ideas]
    setIdeas(updatedIdeas)
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas))
  }

  const voteIdea = (id: string) => {
    const updatedIdeas = ideas.map(idea => 
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    )
    setIdeas(updatedIdeas)
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas))
  }

  return {
    ideas: ideas.sort((a, b) => b.votes - a.votes),
    addIdea,
    voteIdea
  }
} 