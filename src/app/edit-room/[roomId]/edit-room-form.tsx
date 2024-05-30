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
// Don't import useRouter from 'next/router'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '../../../components/ui/use-toast'
import { Room } from '../../../db/schema'
import { editRoomAction } from './action'

// Define a form schema
const formSchema = z.object({
  name: z.string().min(2).max(250),
  description: z.string().min(2).max(250),
  githubRepo: z.string().min(2).max(250),
  tags: z.string().min(1).max(250),
})

export default function EditRoomForm({ room }: { room: Room }) {
  const router = useRouter()
  const params = useParams()

  // 1. Define your form.
  // Now, when you edit your room, room info will come to the edit page with you
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description ?? '',
      githubRepo: room.githubRepo ?? '',
      tags: room.tags,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    // Invoke a server action to store the data in our database
    await editRoomAction({
      id: params.roomId as string,
      ...values,
    })
    toast({
      title: 'Room Updated',
      description: 'Your room was successfully updated.',
      // TODO: Create a join the room button, right now when created, automatically join in
      // action: <ToastAction altText='Goto schedule to undo'>Undo</ToastAction>,
    })
    // router.push('/browse')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please describe what you are coding on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='githubRepo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please put a link of the project you are working on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder='TypeScript, Nextjs, Tailwind' />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries so people
                can find your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
