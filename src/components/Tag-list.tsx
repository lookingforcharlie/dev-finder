import React from 'react'
import { Badge } from './ui/badge'

export function splitTags(tags: string) {
  return tags.split(',').map((lang) => lang.trim())
}

export default function TagsList({ languages }: { languages: string[] }) {
  return (
    <div className='flex gap-2 flex-wrap'>
      {languages.map((lang) => (
        <Badge className='w-fit' key={lang}>
          {lang}
        </Badge>
      ))}
    </div>
  )
}
