'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudCog, SearchIcon } from 'lucide-react'
// Don't import useRouter from 'next/router'
import { useRouter, useSearchParams } from 'next/navigation'
import react, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Define a form schema
const formSchema = z.object({
  search: z.string().min(0).max(50),
})

export default function SearchBar() {
  const router = useRouter()
  const query = useSearchParams()
  // 1. Define your form.
  // Make a form data structure allows us to call different methods on it
  // Control the form and keep track the value
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get('search') ?? '', // map the query string here to fix page refresh bug
    },
  })

  const searchKeyword = query.get('search')

  useEffect(() => {
    form.setValue('search', searchKeyword ?? '')
  }, [searchKeyword, form])

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    // Invoke a server action to store the data in our database
    // await createRoomAction(values)

    if (values.search) {
      // So user can see the search result url on the page, can share with other dev
      // let use this to redo the query
      console.log('going to searching url')
      router.push(`/?search=${values.search}`)
    } else {
      console.log('going to root page')
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-x-4'>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Filter rooms by keywords, such TypeScript, React, Python etc'
                  className='w-[22rem] md:w-[30rem] lg:w-[45rem]'
                  // value={query.get('search')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>
          <SearchIcon className='mr-2 w-4 h-4' />
          Search
        </Button>

        {query.size > 0 && (
          <Button
            variant={'link'}
            onClick={() => {
              form.setValue('search', '')
              router.push('/')
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  )
}
