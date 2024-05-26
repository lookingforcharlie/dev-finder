'use client'

import { useRouter } from 'next/navigation'
import React, { useReducer } from 'react'
import { cn } from '../lib/utils'
import { Badge, badgeVariants } from './ui/badge'

export default function TagsList({ languages }: { languages: string[] }) {
  const router = useRouter()
  return (
    <div className='flex gap-2 flex-wrap'>
      {languages.map((tag) => (
        <button
          onClick={() => {
            // now when click the tags, it will automatically go to search bar and filer the keywords
            router.push(`/?search=${tag}`)
          }}
          className={cn(badgeVariants())}
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
