"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useIdeas } from '@/hooks/use-ideas'

export function IdeaForm() {
  const { addIdea } = useIdeas()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addIdea(formData)
    setFormData({ title: '', description: '', author: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Idea Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="bg-white dark:bg-white/10 text-black dark:text-white placeholder:text-gray-500"
      />
      <Textarea
        placeholder="Describe your idea..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        className="bg-white dark:bg-white/10 text-black dark:text-white placeholder:text-gray-500"
      />
      <Input
        placeholder="Your Name"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
        className="bg-white dark:bg-white/10 text-black dark:text-white placeholder:text-gray-500"
      />
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Submit Idea</Button>
    </form>
  )
} 